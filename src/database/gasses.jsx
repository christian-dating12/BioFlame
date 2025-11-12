import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; 

const GasQualityComponent = ({ filterPeriod, selectedDate }) => {
    // Separate states for Raw Gas (DIG) and Stored Gas (STO)
    const [rawGas, setRawGas] = useState({ ch4: 0, co2: 0 });
    const [storedGas, setStoredGas] = useState({ ch4: 0, co2: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Sensor IDs based on your schema ---
    const RAW_CH4_ID = 'CH4-DIG'; 
    const RAW_CO2_ID = 'CO2-DIG'; 
    const STORED_CH4_ID = 'CH4-STO';
    const STORED_CO2_ID = 'CO2-STO';
    
    // Helper function to fetch a single sensor value, checking top 5 records
    const fetchSensorValue = async (sensorId) => {
        const { data, error } = await supabase
            .from('sensorreading') 
            .select('value')
            .eq('sensor_id', sensorId)
            .order('timestamp', { ascending: false })
            .limit(5); // Check top 5 for non-NULL value

        if (error) {
            console.error(`Supabase ERROR fetching sensor ${sensorId}:`, error);
            return 0;
        }
        
        // Find the first non-null record and parse it
        const firstValidRecord = data.find(item => item.value !== null);
        const rawValue = firstValidRecord ? firstValidRecord.value : 0;
        
        return parseFloat(rawValue) || 0;
    };

    useEffect(() => {
        async function fetchGasData() {
            setLoading(true);
            setError(null);
            
            try {
                // 1. RAW GAS FETCH (DIGESTER)
                const rawCh4 = fetchSensorValue(RAW_CH4_ID);
                const rawCo2 = fetchSensorValue(RAW_CO2_ID);
                
                // Wait for Raw Gas promises to resolve
                const [rCh4, rCo2] = await Promise.all([rawCh4, rawCo2]);

                // 2. STORED GAS FETCH (STORAGE)
                const storedCh4 = fetchSensorValue(STORED_CH4_ID);
                const storedCo2 = fetchSensorValue(STORED_CO2_ID);
                
                // Wait for Stored Gas promises to resolve
                const [sCh4, sCo2] = await Promise.all([storedCh4, storedCo2]);

                // 3. Update all states reliably
                setRawGas({ ch4: rCh4, co2: rCo2 });
                setStoredGas({ ch4: sCh4, co2: sCo2 });

            } catch (err) {
                console.error("Overall error fetching gas data:", err);
                setError("Failed to load gas data.");
            } finally {
                setLoading(false);
            }
        }

        fetchGasData();
    }, [filterPeriod, selectedDate]);

    // Define colors
    const CH4_COLOR = '#ddcac9ff'; 
    const CO2_COLOR = '#A3362E'; 

    // Helper function for a fixed-width bar to show a single percentage
    const PercentageBar = ({ value, label, color, isCO2 }) => {
        const percent = Math.min(100, Math.max(0, value)); // Clamp value between 0 and 100

        return (
            <div style={{ flex: 1, minWidth: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#555' }}>
                    {label}
                </div>
                
                {/* Visual Bar (Fixed 100% width) */}
                <div 
                    style={{ 
                        width: '100%', 
                        height: '25px', 
                        backgroundColor: '#E0E0E0', 
                        borderRadius: '4px', 
                        overflow: 'hidden' 
                    }}
                >
                    <div 
                        style={{ 
                            width: `${percent}%`, 
                            height: '100%', 
                            backgroundColor: color, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '10px', color: isCO2 ? 'white' : '#333', fontWeight: 'bold' }}>
                            {percent.toFixed(1)}%
                        </span>
                    </div>
                </div>

                {/* Numeric Value Below Bar */}
                <div 
                    style={{ 
                        fontSize: '14px', 
                        fontWeight: 'bold', 
                        marginTop: '5px', 
                        color: isCO2 ? '#FF0000' : '#333' 
                    }}
                >
                    {percent.toFixed(1)}%
                </div>
            </div>
        );
    };

    if (loading) {
        // ... (Loading state JSX omitted for brevity)
        return (
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '40px', textAlign: 'center', height: '340px', boxSizing: 'border-box' }}>
                <div style={{ color: '#6C8E3E' }}>Loading Gas Data...</div>
            </div>
        );
    }

    if (error) {
        // ... (Error state JSX omitted for brevity)
        return (
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '40px', textAlign: 'center', height: '340px', boxSizing: 'border-box', color: 'red' }}>
                {error}
            </div>
        );
    }


    return (
        <div
            style={{
                backgroundColor: 'white', 
                borderRadius: '8px',
                padding: '20px', 
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                height: '340px', 
            }}
        >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                Gas Quality Comparison ({filterPeriod})
            </h3>

            {/* CH4 COMPARISON ROW */}
            <div style={{ width: '100%', marginBottom: '40px' }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#333', textAlign: 'center' }}>METHANE (CH₄)</h4>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <PercentageBar 
                        value={rawGas.ch4} 
                        label="Raw Gas Quality" 
                        color={CH4_COLOR} 
                        isCO2={false}
                    />
                    <PercentageBar 
                        value={storedGas.ch4} 
                        label="Stored Gas Quality" 
                        color={CH4_COLOR}
                        isCO2={false} 
                    />
                </div>
            </div>

            {/* CO2 COMPARISON ROW */}
            <div style={{ width: '100%', marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#333', textAlign: 'center' }}>CARBON DIOXIDE (CO₂)</h4>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <PercentageBar 
                        value={rawGas.co2} 
                        label="Raw Gas Quality" 
                        color={CO2_COLOR} 
                        isCO2={true}
                    />
                    <PercentageBar 
                        value={storedGas.co2} 
                        label="Stored Gas Quality" 
                        color={CO2_COLOR}
                        isCO2={true} 
                    />
                </div>
            </div>
        </div>
    );
};

export default GasQualityComponent;