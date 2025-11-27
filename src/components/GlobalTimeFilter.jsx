import React, { useState } from 'react';

const GlobalTimeFilter = ({ filterPeriod, setFilterPeriod, selectedDate, setSelectedDate }) => {
    // NEW: Local state for selected date and hour value
    const [dateValue, setDateValue] = useState(selectedDate);
    const [hourValue, setHourValue] = useState(0); // 0-11 for 1st hr to 12th hr
    
    const filterOptions = ["Hourly", "Daily", "Weekly", "Monthly", "Yearly"]; 
    const accentColor = "#6C8E3E"; 

    // Function to trigger the actual filter change in the parent component
    const applyFilter = () => {
        if (filterPeriod === 'Hourly') {
            // Send the specific date and hour index (0-11) separated by a pipe character
            setSelectedDate(`${dateValue}|${hourValue}`);
        } else {
            // For other filters, just pass the raw date value (if available)
            setSelectedDate(dateValue);
        }
    };
    
    // Initialize dateValue on component mount if selectedDate is empty
    React.useEffect(() => {
        if (!selectedDate) {
            setDateValue(new Date().toISOString().slice(0, 10));
        }
    }, [selectedDate]);


    return (
        <div style={{ 
            backgroundColor: '#F8F4E3', 
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

            {/* 2. Specific Date Input */}
            <input
                type={'date'} 
                placeholder={`Select Date (${filterPeriod})`}
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                style={{
                    padding: '8px 15px',
                    borderRadius: '6px',
                    border: `1px solid ${accentColor}`,
                    fontSize: '14px',
                    flex: 1,
                    maxWidth: '150px',
                    color: '#23320F'
                }}
            />

            {/* 3. Hour Selector (Only visible for Hourly filter) */}
            {filterPeriod === 'Hourly' && (
                <select
                    value={hourValue}
                    onChange={(e) => setHourValue(parseInt(e.target.value, 10))}
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
                    }}
                >
                    {[...Array(12).keys()].map(i => {
                        const hrValue = i; // 0 to 11
                        const hrDisplay = hrValue + 1; // 1st hr to 12th hr
                        return <option key={hrValue} value={hrValue}>{hrDisplay} hr</option>;
                    })}
                </select>
            )}
            
            {/* 4. Apply Filter Button */}
            <button 
                onClick={applyFilter}
                style={{
                    padding: '8px 15px',
                    borderRadius: '6px',
                    backgroundColor: accentColor,
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                Apply Filter
            </button>
        </div>
    );
};

export default GlobalTimeFilter;