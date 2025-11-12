import React from 'react';

const GasQualityComponent = ({ rawGas = { ch4: 50, co2: 50 }, storedGas = { ch4: 30, co2: 70 }, filterPeriod, selectedDate }) => {

  // Function to determine the width of the bars based on the value
  // Assuming total is 100 for simplicity (percentage)
  const getBarWidth = (value) => `${value}%`;

  return (
    <div
      style={{
        backgroundColor: 'white', // White background as in the original image block
        borderRadius: '8px',
        padding: '20px 0', // Vertical padding, horizontal padding handled by internal structure
        maxWidth: '100%',
        // Removed: margin: '20px 0', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        height: '160px', // Adjusted height to match the original image block size
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        CO2 and CH4 ({filterPeriod})
      </h3>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          flexGrow: 1, // Allows content to grow and use available space
        }}
      >
        {/* Raw Gas Quality Section */}
        <div style={{ flex: 1, textAlign: 'center', padding: '0 15px' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px', color: '#555' }}>
            Raw Gas Quality
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: getBarWidth(rawGas.ch4),
                backgroundColor: '#FFB3B3', // Light Red/Pink for ch4
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              ch4
            </div>
            <div
              style={{
                width: getBarWidth(rawGas.co2),
                backgroundColor: '#FF0000', // Bright Red for co2
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              co2
            </div>
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '80px', // Adjusted height to visually separate
            backgroundColor: '#E0E0E0',
            margin: '0 20px',
          }}
        />

        {/* Gas Storage Quality Section */}
        <div style={{ flex: 1, textAlign: 'center', padding: '0 15px' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px', color: '#555' }}>
            Gas Storage Quality
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: getBarWidth(storedGas.ch4),
                backgroundColor: '#FFB3B3', // Light Red/Pink for ch4
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              ch4
            </div>
            <div
              style={{
                width: getBarWidth(storedGas.co2),
                backgroundColor: '#FF0000', // Bright Red for co2
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}
            >
              co2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasQualityComponent;