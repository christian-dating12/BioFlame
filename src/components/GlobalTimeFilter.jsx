import React from 'react';

const GlobalTimeFilter = ({ filterPeriod, setFilterPeriod, selectedDate, setSelectedDate }) => {
    const filterOptions = ["Daily", "Weekly", "Monthly", "Yearly"];
    const accentColor = "#6C8E3E"; // Green accent color

    return (
        <div style={{ 
            backgroundColor: '#F8F4E3', // Cream background from palette
            padding: '20px', 
            borderRadius: '8px', 
            margin: '20px 0',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h4 style={{ margin: 0, color: '#23320F' }}>View Data By:</h4>
            
            {/* 1. Period Dropdown */}
            <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                style={{
                    padding: '8px 15px',
                    borderRadius: '6px',
                    backgroundColor: accentColor,
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    appearance: 'none',
                }}
            >
                {filterOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>

            {/* 2. Specific Date/Week Search/Input */}
            <input
                // Set input type to 'date' only when 'Daily' is selected for native picker
                type={filterPeriod === 'Daily' ? 'date' : 'text'} 
                placeholder={`Select a specific ${filterPeriod.toLowerCase()} (${filterPeriod === 'Daily' ? 'YYYY-MM-DD' : 'e.g., Week 45 / 2025-11'})`}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                    padding: '8px 15px',
                    borderRadius: '6px',
                    border: `1px solid ${accentColor}`,
                    fontSize: '14px',
                    flex: 1,
                    maxWidth: '300px',
                    color: '#23320F'
                }}
            />
        </div>
    );
};

export default GlobalTimeFilter;