import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase

// Helper function to calculate days remaining and determine status
const calculateStatus = (releaseDate) => {
    if (!releaseDate) return { daysRemaining: 'N/A', status: 'N/A', statusDetail: '' };
    
    const today = new Date();
    // Ensure releaseDate is treated as start of day to avoid timezone issues
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

const SlurryManagementTable = ({ externalData }) => {
    // Replace mock data with live state
    const [tableData, setTableData] = useState([]);
    const [filterPeriod, setFilterPeriod] = useState('Weekly');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // --- Data Fetching Effect ---
    useEffect(() => {
        async function fetchSlurryData() {
            setLoading(true);
            setError(null);
            
            // Fetch all IN transactions from the 'slurrylog' table using 'weight' column
            const { data: fetchedData, error } = await supabase
                .from('slurrylog') 
                .select('log_id, timestamp, weight, release_date') // <-- CHANGED TO 'weight'
                .eq('transact_type', 'IN') // Only fetching batch input records
                .not('release_date', 'is', null) // Only show records planned for release
                .order('timestamp', { ascending: false });

            if (error) {
                console.error("Error fetching slurry table data:", error);
                setError("Failed to load table data.");
            } else {
                // Map the Supabase data to the component's expected data structure
                const formattedData = fetchedData.map(item => {
                    const statusInfo = calculateStatus(item.release_date);
                    return {
                        batchID: item.log_id.toString(),
                        inputDate: new Date(item.timestamp).toLocaleString(), // Format timestamp for display
                        weightVolume: parseFloat(item.weight).toFixed(2), // <-- CHANGED TO 'weight'
                        targetReleaseDate: item.release_date,
                        ...statusInfo,
                    };
                });
                setTableData(formattedData);
            }
            setLoading(false);
        }

        fetchSlurryData();
    }, []); 
    
    // Handler to update the weight/volume when the input changes (kept for frontend interactivity)
    const handleWeightChange = (e, batchID) => {
        const newValue = e.target.value;
        setTableData(prevData =>
            prevData.map(item =>
                item.batchID === batchID
                    ? { ...item, weightVolume: newValue }
                    : item
            )
        );
    };


  // Helper function to render the Status pill based on the status text (no change)
  const renderStatus = (status, detail) => {
    let dotColor = '#ccc'; 
    let textColor = '#000';
    let fontWeight = 'normal';

    if (status === 'OVERDUE') {
      dotColor = '#FF4D4D'; 
      textColor = '#FF4D4D';
      fontWeight = 'bold';
    } else if (status === 'SAFE') {
      dotColor = '#52C41A'; 
      textColor = '#52C41A';
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            height: '8px',
            width: '8px',
            backgroundColor: dotColor,
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '8px',
          }}
        />
        <span style={{ color: textColor, fontWeight: fontWeight }}>
          {status}
        </span>
        {detail && <span style={{ marginLeft: '4px', fontSize: '0.85em', color: '#666' }}>{detail}</span>}
      </div>
    );
  };

  const filteredData = tableData; 

  return (
    <div
      style={{
        backgroundColor: "#23320F", 
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '100%',
        margin: '20px 0', 
      }}
    >
      
      {/* Header with Filter Dropdown */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '25px', 
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'white' }}>
          Slurry Management Table
        </h2>
        
        <select
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
          style={{
            padding: '8px 15px',
            borderRadius: '6px',
            backgroundColor: '#6C8E3E', 
            color: 'white',
            border: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            appearance: 'none', 
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='white' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '20px',
            paddingRight: '35px', 
          }}
        >
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      
      {loading && <div style={{ color: "#6C8E3E", textAlign: 'center', padding: '20px', backgroundColor: 'white' }}>Loading table data...</div>}
      {error && <div style={{ color: "red", textAlign: 'center', padding: '20px', backgroundColor: 'white' }}>{error}</div>}

      {!loading && !error && tableData.length === 0 && (
          <div style={{ color: "#666", textAlign: 'center', padding: '20px', backgroundColor: 'white' }}>No slurry batches currently in management.</div>
      )}

      {!loading && tableData.length > 0 && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '14px',
          }}
        >
          {/* Table Header */}
          <thead>
            <tr style={{ borderBottom: '1px solid #E0E0E0', color: 'white', fontWeight: '500' }}>
              <th style={{ padding: '12px 0', width: '10%' }}>Batch ID</th>
              <th style={{ padding: '12px 10px', width: '20%' }}>Input Date (Timestamp)</th>
              <th style={{ padding: '12px 10px', width: '15%' }}>Weight/Volume (kg)</th>
              <th style={{ padding: '12px 10px', width: '15%' }}>Target Release Date</th>
              <th style={{ padding: '12px 10px', width: '15%' }}>Days Remaining</th>
              <th style={{ padding: '12px 10px', width: '25%' }}>Status</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.batchID}
                style={{
                  borderBottom: '1px solid #F0F0F0',
                  backgroundColor: '#FFFFFF', 
                }}
              >
                <td style={{ padding: '15px 0', fontWeight: 'bold', color: '#333' }}>{item.batchID}</td>
                <td style={{ padding: '15px 10px', color: '#333' }}>{item.inputDate}</td>
                
                {/* Editable Input Field */}
                <td style={{ padding: '10px' }}>
                  <input
                      type="number"
                      value={item.weightVolume}
                      onChange={(e) => handleWeightChange(e, item.batchID)}
                      style={{
                          width: 'calc(100% - 10px)',
                          padding: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          fontSize: '14px',
                          textAlign: 'center',
                          color: '#333',
                      }}
                  />
                </td>
                
                <td style={{ padding: '15px 10px', color: '#333' }}>{item.targetReleaseDate}</td>
                <td style={{ padding: '15px 10px', fontWeight: item.daysRemaining < 0 ? 'bold' : 'normal', color: '#333' }}>
                  {item.daysRemaining}
                </td>
                <td style={{ padding: '15px 10px' }}>
                  {renderStatus(item.status, item.statusDetail)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SlurryManagementTable;