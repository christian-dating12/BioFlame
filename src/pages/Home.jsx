import React from "react";
import Header from "../components/header";
import Footer from "../components/footer"; // Imported the external Footer component
import backgroundImage from "../assets/home.png"

const COLORS = {
  // --- Colors based on the images ---
  darkGreen: "#2E3F24", // Mission/Vision dark block, Footer background
  mediumGreen: "#A2B29A", // Mission/Vision light block, Benefits cards
  tan: "#D9C08D", // Benefits 02/04
  
  // New specific colors based on image_9088f4.png blocks:
  blockGreen: '#709C66', // Green block color for row 1
  blockTan: '#F1E0C9', // Tan block color for row 2
  
  // New number color: A slightly darker gray
  numberGray: '#888888', 
  darkLine: '#333333', // Dark color for lines and text

  // General Text and UI colors
  lightGray: "#E5E5E5", 
  darkText: "#23320F",
  white: "#FFFFFF",
  placeholderText: "#333333", 
};

// --- Reusable Component for Benefit Cards (Matches image_8eab42.png) ---
const BenefitCard = ({ number, title, color }) => (
  <div
    style={{
      flex: 1,
      minWidth: "200px",
      margin: "0 10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      maxWidth: "250px", 
    }}
  >
    {/* Image/Color Block */}
    <div
      style={{
        width: "100%",
        height: "300px",
        backgroundColor: color,
        marginBottom: "10px",
        borderRadius: "12px", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      image
    </div>
    
    {/* Number and Title Container */}
    <div style={{ marginTop: '5px' }}>
        {number && (
        <p
            style={{
            fontFamily: "sans-serif",
            fontSize: 14,
            color: COLORS.darkText,
            margin: "0 0 2px 0",
            }}
        >
            {number}
        </p>
        )}
        <p
        style={{
            fontFamily: "sans-serif",
            fontSize: 16,
            color: COLORS.darkText,
            fontWeight: "bold",
            margin: "0",
        }}
        >
        {title}
        </p>
    </div>
  </div>
);

// Process Step 

const ProcessStep = ({ stepNumber, title, description, isLast }) => {
    
    const numberColor = COLORS.numberGray; 
    const contentColor = COLORS.darkText;
    const lineHeightColor = COLORS.darkLine;
    
    // Determine positioning based on whether the step is on the left (1, 3) or right (2, 4) side of the row
    const isLeftStep = stepNumber === 1 || stepNumber === 3;
    
    return (
        <div 
            style={{
                display: 'flex',
                // Ensures the content block is centered within its half of the row
                justifyContent: isLeftStep ? 'center' : 'center', 
                alignItems: 'center', 
                flex: 1,
                position: 'relative',
                minWidth: '200px',
                height: '100%', 
                boxSizing: 'border-box',
            }}
        >
            {/* Content Wrapper: Contains Title/Description/Number for relative positioning */}
            <div 
                style={{
                    position: 'relative',
                    width: '70%', 
                    maxWidth: '300px',
                    textAlign: 'left',
                    zIndex: 10, 
                    paddingLeft: isLeftStep ? '0' : '40px', 
                    paddingRight: isLeftStep ? '40px' : '0', 
                }}
            >
                {/* Step Number (Large, ABSOLUTELY positioned relative to the wrapper) */}
                <div
                    style={{
                        position: "absolute",
                        // Anchor to the right of the content area for both sides
                        right: isLeftStep ? '5px' : '-10px', 
                        top: isLeftStep ? '40px' : '30px', 
                        fontSize: 120,
                        fontWeight: 900,
                        color: numberColor, 
                        opacity: 0.8,
                        zIndex: 2, 
                        fontFamily: "'Sorts Mill Goudy', serif", 
                        lineHeight: 1,
                    }}
                >
                    {stepNumber}
                </div>
                
                {/* Step Title (Bold, large text) */}
                <h3
                    style={{
                        fontFamily: "sans-serif",
                        fontSize: 28,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: contentColor,
                        lineHeight: 1.2,
                        margin: "0",
                        position: 'relative',
                        zIndex: 3, 
                    }}
                >
                    {title}
                </h3>
                
                {/* Step Description */}
                <p
                    style={{
                        fontFamily: "sans-serif",
                        fontSize: 14,
                        color: contentColor,
                        margin: '5px 0 0 0',
                    }}
                >
                    {description}
                </p>
            </div>
            
            {/* Connector Line (Horizontal Line) - Note: Placed relative to the ProcessStep div, not the content wrapper */}
            {!isLast && (
                <div
                    style={{
                        position: "absolute",
                        right: isLeftStep ? '0' : 'auto', 
                        left: isLeftStep ? 'auto' : '0', 
                        top: '50%',
                        transform: `translate(${isLeftStep ? '0%' : '-100%'}, -50%)`, // Push line out of the block
                        width: '80px', 
                        height: "1px",
                        backgroundColor: lineHeightColor,
                        zIndex: 1,
                    }}
                >
                    {/* Arrowhead placed at the end of the line */}
                    <span 
                        style={{
                            position: 'absolute',
                            right: isLeftStep ? '-10px' : 'auto',
                            left: isLeftStep ? 'auto' : '10px',
                            top: '50%',
                            transform: `translateY(-50%)`,
                            fontSize: '20px',
                            lineHeight: 0,
                            color: lineHeightColor,
                            zIndex: 2,
                        }}
                    >
                        &#8594;
                    </span>
                </div>
            )}
        </div>
    );
};


// --- Main Home Component ---
export default function Home() {
  return (
    <div style={{ backgroundColor: COLORS.white }}>
      <Header />
      {/* 1. Hero Section (UPDATED TO MATCH IMAGE_90EDF4.JPG) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: 'column',
          alignItems: "center", 
          textAlign: "center",
          backgroundColor: COLORS.white, // Ensure white background for the text area
        }}
      >
        {/* A. Top Floating Text (Centrally Aligned) */}
        <div
          style={{
            padding: "40px 40px 20px 40px", // Reduced bottom padding
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              color: COLORS.darkGreen, 
              fontSize: 50, 
              fontFamily: "'Sorts Mill Goudy', serif",
              lineHeight: "1.2",
              margin: "0 0 10px 0",
              fontWeight: 800,
              fontStyle: 'italic', 
              whiteSpace: 'nowrap', 
            }}
          >
            Farming Meets Future Tech
          </h1>
          <p
            style={{
              color: COLORS.darkText, 
              fontSize: 16, // Adjusted size
              fontFamily: "sans-serif",
              lineHeight: "1.5",
              margin: "0",
            }}
          >
            BioFlame converts agricultural manure into a continuous source of sustainable biogas. <br /> Leveraging cutting-edge IoT intelligence, we offer farmers a reliable, efficient, and automated path to energy independence and waste reduction.
          </p>
        </div>
        
        {/* B. Full-Width Background Image Container (Made taller for visual impact) */}
        <div 
          style={{ 
            width: '100%', 
            minHeight: '80vh', 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'flex-start',
            padding: '0 0 40px 80px',
            boxSizing: 'border-box'
          }}
        >
            <h2 style={{ color: COLORS.white, fontSize: 32, fontFamily: "'Sorts Mill Goudy', serif" }}>
                Where Farms Create Energy
            </h2>
        </div>

      </div>

      {/* 2. Mission and Vision Sections (omitted for brevity) */}
      <div
        style={{
          padding: "80px 10px", 
          backgroundColor: "#fff",
        }}
      >
        {/* MISSION ROW */}
        <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "100px",
              gap: "80px",
              flexWrap: "wrap",
            }}
        >
            <div
              style={{
                position: "relative",
                width: "400px", 
                height: "400px",
              }}
            >
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundColor: COLORS.mediumGreen,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  borderRadius: '8px'
                }}
              >
                image
              </div>
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundColor: COLORS.darkGreen,
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  borderRadius: '8px'
                }}
              >
                image
              </div>
            </div>
    
            <div
                style={{
                    maxWidth: "500px",
                    textAlign: "left",
                }}
            >
                <h2
                    style={{
                        fontFamily: "sans-serif", 
                        fontSize: 40,
                        color: COLORS.darkText,
                        textTransform: "uppercase",
                        fontWeight: 900,
                        marginBottom: "15px",
                    }}
                >
                    OUR MISSION
                </h2>
                <p
                    style={{
                        fontFamily: "sans-serif",
                        fontSize: 20,
                        lineHeight: "1.6",
                        color: "#555",
                        fontStyle: "italic",
                    }}
                >
                    To design a small-scale, IoT-optimized system that converts manure
                    into biogas, proving its technical efficiency and economic
                    affordability for local farm energy independence.
                </p>
            </div>
        </div>

        {/* VISION ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "80px",
            flexWrap: "wrap-reverse",
          }}
        >
            <div
              style={{
                maxWidth: "500px",
                textAlign: "left",
              }}
            >
                <h2
                    style={{
                        fontFamily: "sans-serif", 
                        fontSize: 40,
                        color: COLORS.darkText,
                        textTransform: "uppercase",
                        fontWeight: 900,
                        marginBottom: "15px",
                    }}
                >
                    OUR VISION
                </h2>
                <p
                    style={{
                        fontFamily: "sans-serif",
                        fontSize: 20,
                        lineHeight: "1.6",
                        color: "#555",
                        fontStyle: "italic",
                    }}
                >
                    To pioneer a validated, low-cost model for smart biogas technology
                    that is easily replicable and accessible to small and underserved
                    farming operations.
                </p>
            </div>
    
            <div
              style={{
                position: "relative",
                width: "400px", 
                height: "400px",
              }}
            >
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundColor: COLORS.darkGreen,
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  borderRadius: '8px'
                }}
              >
                image
              </div>
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  backgroundColor: COLORS.mediumGreen,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  borderRadius: '8px'
                }}
              >
                image
              </div>
            </div>
        </div>
      </div>
      
      {/* 3. BENEFITS Section (omitted for brevity) */}
      <div
        style={{
          padding: "80px 10px",
          backgroundColor: "#fff",
          textAlign: 'right', 
        }}
      >
        <h2
          style={{
            fontFamily: "sans-serif", 
            fontSize: 60,
            fontWeight: 900,
            color: COLORS.darkText,
            textTransform: "uppercase",
            marginBottom: "40px",
            marginRight: "20px",
            lineHeight: 1,
            textAlign: 'right', 
          }}
        >
          BENEFITS
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            padding: "0 20px",
          }}
        >
          <BenefitCard title="Energy Independence" color={COLORS.mediumGreen} />
          <BenefitCard title="New Revenue Stream" color={COLORS.tan} number="02" />
          <BenefitCard title="Sustainability" color={COLORS.mediumGreen} number="03" />
          <BenefitCard title="Smart Automation" color={COLORS.tan} number="04" />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: COLORS.darkText,
            fontSize: "24px",
          }}
        >
          <span style={{ cursor: "pointer", margin: "0 10px" }}>&#9664;</span> 
          <span style={{ cursor: "pointer", margin: "0 10px" }}>&#9654;</span> 
        </div>
      </div>
      
      {/* 5. FOOTER (Using the imported component) */}
      <Footer />
    </div>
  );
}