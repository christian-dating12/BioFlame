import React from 'react';

// Sample data structure to match the image
const slurryData = [
  {
    batchID: '101',
    inputDate: '2025-10-12 08:00 AM',
    weightVolume: '250.00', // kg
    targetReleaseDate: '2025-11-11',
    daysRemaining: -1,
    status: 'OVERDUE',
    statusDetail: '(ACTION REQUIRED)',
  },
  {
    batchID: '103',
    inputDate: '2025-11-04 10:05 AM',
    weightVolume: '50.00', // kg
    targetReleaseDate: '2025-12-04',
    daysRemaining: 22,
    status: 'SAFE',
    statusDetail: '',
  },
];

const SlurryManagementTable = ({ data = slurryData }) => {

  // Helper function to render the Status pill based on the status text
  const renderStatus = (status, detail) => {
    let dotColor = '#ccc'; // Default grey
    let textColor = '#000';
    let fontWeight = 'normal';

    if (status === 'OVERDUE') {
      dotColor = '#FF4D4D'; // Red
      textColor = '#FF4D4D';
      fontWeight = 'bold';
    } else if (status === 'SAFE') {
      dotColor = '#52C41A'; // Green
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
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>
        Slurry Management Table
      </h2>

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
          <tr style={{ borderBottom: '1px solid #E0E0E0', color: '#666', fontWeight: '500' }}>
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
          {data.map((item, index) => (
            <tr
              key={item.batchID}
              style={{
                borderBottom: '1px solid #F0F0F0',
                // Updated alternating row color to compensate for the gray background
                backgroundColor: '#FFFFFF', 
              }}
            >
              <td style={{ padding: '15px 0', fontWeight: 'bold' }}>{item.batchID}</td>
              <td style={{ padding: '15px 10px' }}>{item.inputDate}</td>
              <td style={{ padding: '15px 10px' }}>{item.weightVolume}</td>
              <td style={{ padding: '15px 10px' }}>{item.targetReleaseDate}</td>
              <td style={{ padding: '15px 10px', fontWeight: item.daysRemaining < 0 ? 'bold' : 'normal' }}>
                {item.daysRemaining}
              </td>
              <td style={{ padding: '15px 10px' }}>
                {renderStatus(item.status, item.statusDetail)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SlurryManagementTable;