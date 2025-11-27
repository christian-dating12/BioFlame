import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 

// Helper function to calculate days remaining
const calculateStatus = (releaseDate) => {
    if (!releaseDate) return { daysRemaining: 'N/A', status: 'N/A', statusDetail: '' };
    
    const today = new Date();
    const targetDate = new Date(releaseDate);
    targetDate.setHours(0, 0, 0, 0); 

    const diffTime = targetDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
        return { 
            daysRemaining: daysRemaining, 
            status: 'OVERDUE', 
            statusDetail: '(ACTION REQUIRED)' 
        };
    } else {
        return { 
            daysRemaining: daysRemaining, 
            status: 'SAFE', 
            statusDetail: '' 
        };
    }
};

const SlurryManagementTable = () => {
    const [tableData, setTableData] = useState([]);
    const [filterPeriod, setFilterPeriod] = useState('Weekly');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- State for Adding New Batch (newReleaseDate is for manual input) ---
    const [newWeight, setNewWeight] = useState('');
    const [newReleaseDate, setNewReleaseDate] = useState(''); 
    const [isAdding, setIsAdding] = useState(false); 

    // --- Fetch Data ---
    const fetchSlurryData = async () => {
        setLoading(true);
        setError(null);
        
        // Fetch data from the database
        const { data: fetchedData, error } = await supabase
            .from('slurrylog') 
            .select('log_id, timestamp, weight, release_date') 
            .eq('transact_type', 'IN') 
            .not('release_date', 'is', null) 
            .order('timestamp', { ascending: false });

        if (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load table data.");
        } else {
            const formattedData = fetchedData.map(item => {
                const statusInfo = calculateStatus(item.release_date);
                return {
                    batchID: item.log_id,
                    inputDate: new Date(item.timestamp).toLocaleString(),
                    weightVolume: item.weight,
                    targetReleaseDate: item.release_date,
                    ...statusInfo,
                };
            });
            setTableData(formattedData);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSlurryData();
    }, [filterPeriod]);

    // --- 1. Update Existing Row (Auto-Save on Blur/Enter) ---
    const handleWeightChange = (e, batchID) => {
        const newValue = e.target.value;
        setTableData(prevData =>
            prevData.map(item =>
                item.batchID === batchID ? { ...item, weightVolume: newValue } : item
            )
        );
    };

    const updateWeightInDb = async (batchID, newWeight) => {
        if (newWeight === '' || isNaN(newWeight)) return;
        
        const { error } = await supabase
            .from('slurrylog')
            .update({ weight: parseFloat(newWeight) })
            .eq('log_id', batchID);

        if (error) {
            console.error("Update failed:", error);
            alert("Failed to save update.");
        }
    };

    // --- 2. Add New Batch ---
    const handleAddBatch = async () => {
        // CHECK BOTH FIELDS (Weight and manual Release Date)
        if (!newWeight || !newReleaseDate) { 
            alert("Please enter both Weight and Release Date.");
            return;
        }

        setIsAdding(true);
        
        const inputTimestamp = new Date();
        
        // Required fields for a successful Supabase insert
        const { error } = await supabase
            .from('slurrylog')
            .insert([
                {
                    transact_type: 'IN',
                    weight: parseFloat(newWeight),
                    release_date: newReleaseDate, // <-- USES MANUAL INPUT
                    timestamp: inputTimestamp.toISOString(),
                    digester_id: 'D-01', 
                    current_storage: parseFloat(newWeight) 
                }
            ]);

        if (error) {
            console.error("Error adding batch:", error);
            alert("Failed to add new batch. Check console for details.");
        } else {
            // Reset form and reload table
            setNewWeight('');
            setNewReleaseDate(''); // Clear the date input
            fetchSlurryData();
        }
        setIsAdding(false);
    };

    // --- 3. Delete Batch ---
    const handleDeleteBatch = async (batchID) => {
        if (!window.confirm("Are you sure you want to delete this batch?")) return;

        const { error } = await supabase
            .from('slurrylog')
            .delete()
            .eq('log_id', batchID);

        if (error) {
            console.error("Error deleting batch:", error);
            alert("Failed to delete batch.");
        } else {
            fetchSlurryData(); // Reload table
        }
    };

    // Helper for status styling (Note: This styling is simplified back to just OVERDUE/SAFE)
    const renderStatus = (status, detail) => {
        let dotColor = status === 'OVERDUE' ? '#FF4D4D' : '#52C41A';
        let textColor = status === 'OVERDUE' ? '#FF4D4D' : '#52C41A';
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ height: '8px', width: '8px', backgroundColor: dotColor, borderRadius: '50%', marginRight: '8px' }} />
                <span style={{ color: textColor, fontWeight: status === 'OVERDUE' ? 'bold' : 'normal' }}>{status}</span>
                {detail && <span style={{ marginLeft: '4px', fontSize: '0.85em', color: '#666' }}>{detail}</span>}
            </div>
        );
    };

    return (
        <div style={{ backgroundColor: "#23320F", borderRadius: '8px', padding: '30px', maxWidth: '100%', margin: '20px 0' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'white' }}>Slurry Management Table</h2>
                <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    style={{
                        padding: '8px 15px', borderRadius: '6px', backgroundColor: '#6C8E3E', color: 'white',
                        border: 'none', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
            </div>

            {/* --- ADD NEW BATCH FORM --- */}
            <div style={{ backgroundColor: '#F0F0F0', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Weight (kg):</label>
                    <input 
                        type="number" 
                        value={newWeight} 
                        onChange={(e) => setNewWeight(e.target.value)} 
                        placeholder="e.g. 50"
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                
                {/* Manual Release Date Input (RESTORED) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Release Date:</label>
                    <input 
                        type="date" 
                        value={newReleaseDate} 
                        onChange={(e) => setNewReleaseDate(e.target.value)} 
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '35px' }}
                    />
                </div>
                
                <button 
                    onClick={handleAddBatch} 
                    disabled={isAdding}
                    style={{
                        padding: '8px 20px', backgroundColor: '#6C8E3E', color: 'white', border: 'none', 
                        borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', height: '35px'
                    }}
                >
                    {isAdding ? 'Adding...' : '+ Add Batch'}
                </button>
            </div>

            {/* --- TABLE --- */}
            {loading && <div style={{ color: "#6C8E3E", textAlign: 'center', padding: '20px', backgroundColor: 'white' }}>Loading table data...</div>}
            {error && <div style={{ color: "red", textAlign: 'center', padding: '20px', backgroundColor: 'white' }}>{error}</div>}

            {!loading && !error && (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #E0E0E0', color: 'white', fontWeight: '500' }}>
                            <th style={{ padding: '12px 0', width: '8%' }}>ID</th>
                            <th style={{ padding: '12px 10px', width: '20%' }}>Input Date</th>
                            <th style={{ padding: '12px 10px', width: '15%' }}>Weight (kg)</th>
                            <th style={{ padding: '12px 10px', width: '15%' }}>Target Release</th>
                            <th style={{ padding: '12px 10px', width: '12%' }}>Days Left</th>
                            <th style={{ padding: '12px 10px', width: '25%' }}>Status</th>
                            <th style={{ padding: '12px 10px', width: '5%', textAlign: 'center' }}>Del</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length === 0 ? (
                            <tr><td colSpan="7" style={{ padding: '20px', textAlign: 'center', backgroundColor: 'white', color: '#666' }}>No records found.</td></tr>
                        ) : (
                            tableData.map((item) => (
                                <tr key={item.batchID} style={{ borderBottom: '1px solid #F0F0F0', backgroundColor: '#FFFFFF' }}>
                                    <td style={{ padding: '15px 0', fontWeight: 'bold', color: '#333' }}>{item.batchID}</td>
                                    <td style={{ padding: '15px 10px', color: '#333' }}>{item.inputDate}</td>
                                    <td style={{ padding: '10px' }}>
                                        <input
                                            type="number"
                                            value={item.weightVolume}
                                            onChange={(e) => handleWeightChange(e, item.batchID)}
                                            onBlur={(e) => updateWeightInDb(item.batchID, e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                                            style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc', textAlign: 'center' }}
                                        />
                                    </td>
                                    <td style={{ padding: '15px 10px', color: '#333' }}>{item.targetReleaseDate}</td>
                                    <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#333' }}>{item.daysRemaining}</td>
                                    <td style={{ padding: '15px 10px' }}>{renderStatus(item.status, item.statusDetail)}</td>
                                    <td style={{ padding: '15px 10px', textAlign: 'center' }}>
                                        <button 
                                            onClick={() => handleDeleteBatch(item.batchID)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                                            title="Delete Batch"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SlurryManagementTable;