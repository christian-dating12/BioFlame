import React from 'react';

const GasQualityComponent = ({ rawGas = { ch4: 50, co2: 50 }, storedGas = { ch4: 30, co2: 70 }, filterPeriod, selectedDate }) => {

  // Function to determine the width of the bars based on the value
  const getBarWidth = (value) => `${value}%`;
  
  // Style for the larger percentage text
  const percentageStyle = {
      fontSize: '14px', // Slightly larger font size
      fontWeight: 'bold',
      color: '#333', // Dark text color for visibility
      marginTop: '5px' 
  };

  return (
    <div
      style={{
        backgroundColor: 'white', // White background as in the original image block
        borderRadius: '8px',
        padding: '20px 0', 
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        height: '160px', 
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
          flexGrow: 1, 
        }}
      >
        {/* Raw Gas Quality Section */}
        <div style={{ flex: 1, textAlign: 'center', padding: '0 15px' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px', color: '#555' }}>
            <strong>Raw Gas Quality</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
            {/* CH4 Bar */}
            <div
              style={{
                width: getBarWidth(rawGas.ch4),
                backgroundColor: '#ddcac9ff ', // Light Red/Pink for ch4
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
            {/* CO2 Bar */}
            <div
              style={{
                width: getBarWidth(rawGas.co2),
                backgroundColor: '#A3362E ', // Bright Red for co2
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
          
          {/* NEW: Percentage row for Raw Gas */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <div style={{ width: getBarWidth(rawGas.ch4), ...percentageStyle }}>{rawGas.ch4}%</div>
            <div style={{ width: getBarWidth(rawGas.co2), ...percentageStyle, color: '#FF0000' }}>{rawGas.co2}%</div>
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '80px', 
            backgroundColor: '#F8F4E3',
            margin: '0 20px',
          }}
        />

        {/* Gas Storage Quality Section */}
        <div style={{ flex: 1, textAlign: 'center', padding: '0 15px' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px', color: '#555' }}>
            <strong>Gas Storage Quality</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
            {/* CH4 Bar */}
            <div
              style={{
                width: getBarWidth(storedGas.ch4),
                backgroundColor: '#ddcac9ff', // Light Red/Pink for ch4
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
            {/* CO2 Bar */}
            <div
              style={{
                width: getBarWidth(storedGas.co2),
                backgroundColor: '#A3362E ', // Bright Red for co2
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
          
          {/* NEW: Percentage row for Stored Gas */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <div style={{ width: getBarWidth(storedGas.ch4), ...percentageStyle }}>{storedGas.ch4}%</div>
            <div style={{ width: getBarWidth(storedGas.co2), ...percentageStyle, color: '#FF0000' }}>{storedGas.co2}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasQualityComponent;