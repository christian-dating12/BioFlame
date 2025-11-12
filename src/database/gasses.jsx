import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const GasQualityComponent = ({ filterPeriod, selectedDate }) => {
  const [rawGas, setRawGas] = useState({ ch4: 0, co2: 0 });
  const [storedGas, setStoredGas] = useState({ ch4: 0, co2: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sensor IDs
  const RAW_CH4_ID = 'CH4-DIG';
  const RAW_CO2_ID = 'CO2-DIG';
  const STORED_CH4_ID = 'CH4-STO';
  const STORED_CO2_ID = 'CO2-STO';

  // Helper: fetch latest sensor value
  const fetchSensorValue = async (sensorId) => {
    try {
      const { data, error } = await supabase
        .from('sensorreading')
        .select('value')
        .eq('sensor_id', sensorId)
        .order('timestamp', { ascending: false })
        .limit(5);

      if (error) throw error;
      if (!data || data.length === 0) return 0;

      const firstValid = data.find((d) => d.value !== null);
      const val = firstValid ? parseFloat(firstValid.value) : 0;
      return isNaN(val) ? 0 : val;
    } catch (err) {
      console.error(`Error fetching ${sensorId}:`, err.message);
      return 0;
    }
  };

  useEffect(() => {
    const fetchGasData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [rawCh4, rawCo2, storedCh4, storedCo2] = await Promise.all([
          fetchSensorValue(RAW_CH4_ID),
          fetchSensorValue(RAW_CO2_ID),
          fetchSensorValue(STORED_CH4_ID),
          fetchSensorValue(STORED_CO2_ID),
        ]);

        setRawGas({ ch4: rawCh4, co2: rawCo2 });
        setStoredGas({ ch4: storedCh4, co2: storedCo2 });
      } catch (err) {
        console.error('Error fetching gas data:', err);
        setError('Failed to load gas data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGasData();
  }, [filterPeriod, selectedDate]);

  const getBarWidth = (value) => `${Math.min(value, 100)}%`;

  if (loading)
    return (
      <div style={styles.container}>
        <p style={{ color: '#6C8E3E' }}>Loading Gas Data...</p>
      </div>
    );

  if (error)
    return (
      <div style={{ ...styles.container, color: 'red' }}>
        <p>{error}</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>CO₂ and CH₄ ({filterPeriod})</h3>

      <div style={styles.row}>
        {/* Raw Gas Quality */}
        <GasBarSection title="Raw Gas Quality (Digester)" gas={rawGas} getBarWidth={getBarWidth} />

        {/* Divider */}
        <div style={styles.divider} />

        {/* Stored Gas Quality */}
        <GasBarSection title="Gas Storage Quality" gas={storedGas} getBarWidth={getBarWidth} />
      </div>
    </div>
  );
};

// Subcomponent for each gas section
const GasBarSection = ({ title, gas, getBarWidth }) => (
  <div style={{ flex: 1, textAlign: 'center', padding: '0 15px' }}>
    <div style={styles.sectionTitle}>{title}</div>

    {/* Bars */}
    <div style={styles.barContainer}>
      <div style={{ ...styles.bar, width: getBarWidth(gas.ch4), backgroundColor: '#DDB7A0', color: '#000' }}>CH₄</div>
      <div style={{ ...styles.bar, width: getBarWidth(gas.co2), backgroundColor: '#A3362E', color: '#fff' }}>CO₂</div>
    </div>

    {/* Percentages */}
    <div style={styles.percentRow}>
      <div style={{ ...styles.percent, color: '#333' }}>{gas.ch4.toFixed(1)}%</div>
      <div style={{ ...styles.percent, color: '#FF0000' }}>{gas.co2.toFixed(1)}%</div>
    </div>
  </div>
);

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px 0',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '340px',
    boxSizing: 'border-box',
  },
  title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' },
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },
  divider: {
    width: '1px',
    height: '80px',
    backgroundColor: '#F8F4E3',
    margin: '0 20px',
  },
  sectionTitle: { fontSize: '14px', fontWeight: '500', marginBottom: '10px', color: '#555' },
  barContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '40px',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  percentRow: { display: 'flex', justifyContent: 'center', width: '100%', gap: '10px', marginTop: '5px' },
  percent: { fontSize: '14px', fontWeight: 'bold' },
};

export default GasQualityComponent;
