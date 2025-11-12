import React from "react";
import Header from "../components/header";
import backgroundImage from "../assets/home.png";
import Footer from "../components/footer";
// The image import remains commented out to avoid build errors:
// import backgroundImage from "../assets/bioflame_background.jpg"; 

// Define reusable styles for colors used in the design
const COLORS = {
  darkGreen: "#2E3F24",
  mediumGreen: "#A2B29A",
  tan: "#D9C08D",
  brown: "#704214",
  lightGray: "#E5E5E5", // Used for the new Hero placeholder background
  darkText: "#23320F",
  white: "#FFFFFF",
  placeholderText: "#333333", // Dark color for placeholder text
};

// --- Reusable Component for Benefit Cards ---
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
    }}
  >
    {/* Image Placeholder */}
    <div
      style={{
        width: "100%",
        height: "300px",
        backgroundColor: color,
        marginBottom: "10px",
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
    {/* Title and Number */}
    <p
      style={{
        fontFamily: "sans-serif",
        fontSize: 16,
        color: COLORS.darkText,
        fontWeight: "bold",
        margin: "10px 0 0 0",
      }}
    >
      {title}
    </p>
    {number && (
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 14,
          color: COLORS.darkText,
          marginTop: "5px",
        }}
      >
        {number}
      </p>
    )}
  </div>
);

// --- Helper Functions for HOW IT WORKS Diagram ---

// Helper for generating circles
const Circle = (size, color) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: "50%",
  backgroundColor: color,
  position: "absolute",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

// Helper for generating rectangles (used for the images)
const Rectangle = (width, height, color) => ({
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    position: "absolute",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '18px',
});

// Component for a single Step in the process
const Step = ({ stepNumber, title, description, position, circleColor, numberColor, lineWidth, lineAngle, isLast }) => {
  const lineStyle = {
    position: "absolute",
    width: lineWidth,
    height: "20px",
    backgroundColor: COLORS.darkGreen,
    transform: `rotate(${lineAngle})`,
    transformOrigin: "left center",
    zIndex: 1,
    // Position the line start near the center of the step's circle
    left: `calc(${position.left} + 60px)`, // 60px is half the circle diameter
    bottom: `calc(${position.bottom} + 50px)`,
  };

  return (
    <React.Fragment>
      {/* Step Line (Invisible for step 4) */}
      {!isLast && <div style={lineStyle} />}

      {/* Circle Placeholder (Large) */}
      <div
        style={{
          ...Circle(120, circleColor),
          ...position,
          zIndex: 2,
        }}
      />

      {/* Step Content */}
      <div
        style={{
          position: "absolute",
          left: `calc(${position.left} + 140px)`, // Position text to the right of the circle
          bottom: `calc(${position.bottom} + 20px)`,
          textAlign: "left",
          maxWidth: "300px",
          zIndex: 3,
        }}
      >
        <h3
          style={{
            fontFamily: "sans-serif",
            fontSize: 28,
            fontWeight: 800,
            textTransform: "uppercase",
            color: COLORS.darkText,
            lineHeight: 1,
            margin: "0 0 5px 0",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 16,
            color: "#555",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      {/* Step Number (Large and Overlayed) */}
      <div
        style={{
          position: "absolute",
          left: `calc(${position.left} + 20px)`, // Position near the circle
          bottom: `calc(${position.bottom} - 20px)`,
          fontSize: 120,
          fontWeight: 900,
          color: numberColor,
          opacity: 0.5,
          zIndex: 4,
          fontFamily: "'Sorts Mill Goudy', serif", // Use a stylish font
        }}
      >
        {stepNumber}
      </div>
    </React.Fragment>
  );
};

// --- Main Home Component ---
export default function Home() {
  return (
    <div>
      <Header />
      {/* 1. Hero Section (Now a pure placeholder) */}
      <div
        style={{
          width: "100%",
          minHeight: "80vh",
          display: "flex",
          // ADDED: Center content vertically and horizontally
          justifyContent: "center",
          alignItems: "center", 
          textAlign: "center",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${backgroundImage})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            maxWidth: "800px", // Wider area for placeholder text
            padding: "40px",
            marginTop: "0", // Center vertically
            border: `3px dashed ${COLORS.darkGreen}`, // Visual indicator of the placeholder area
          }}
        >
          <h1
            style={{
              fontStyle: "italic",
              color: COLORS.placeholderText, 
              fontSize: 70,
              fontFamily: "'Sorts Mill Goudy', serif",
              lineHeight: "1.2",
              margin: "0 0 15px 0",
            }}
          >
            Farming Meets Future Tech
          </h1>
          <p
            style={{
              color: COLORS.placeholderText, 
              fontSize: 18,
              fontFamily: "sans-serif",
              lineHeight: "1.5",
              margin: "20px 0 0 0",
              padding: "0 10px",
            }}
          >
            [PLACEHOLDER: This section needs the background image and lower tagline.]
          </p>
        </div>
      </div>

      {/* 2. Mission and Vision Sections */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 20px",
          backgroundColor: "#fff",
          flexWrap: "wrap",
        }}
      >
        {/* Image Placeholder Group for Mission */}
        <div
          style={{
            position: "relative",
            width: "350px",
            height: "350px",
            marginRight: "80px",
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Lighter Green Box */}
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
            }}
          >
            image
          </div>
          {/* Darker Green Box */}
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
            }}
          >
            image
          </div>
        </div>

        {/* Mission Text */}
        <div
          style={{
            maxWidth: "500px",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontFamily: "'Sorts Mill Goudy', serif",
              fontSize: 40,
              color: COLORS.darkText,
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          >
            Our Mission
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 20px",
          backgroundColor: "#fff",
          flexWrap: "wrap-reverse",
        }}
      >
        {/* Vision Text */}
        <div
          style={{
            maxWidth: "500px",
            textAlign: "left",
            marginRight: "80px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Sorts Mill Goudy', serif",
              fontSize: 40,
              color: COLORS.darkText,
              textTransform: "uppercase",
              marginBottom: "15px",
            }}
          >
            Our Vision
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

        {/* Image Placeholder Group for Vision */}
        <div
          style={{
            position: "relative",
            width: "350px",
            height: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Lighter Green Box */}
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
            }}
          >
            image
          </div>
          {/* Darker Green Box */}
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
            }}
          >
            image
          </div>
        </div>
      </div>
      
      {/* 3. BENEFITS Section */}
      <div
        style={{
          padding: "80px 40px",
          backgroundColor: "#fff",
        }}
      >
        <h2
          style={{
            fontFamily: "'Sorts Mill Goudy', serif",
            fontSize: 60,
            color: COLORS.darkText,
            textAlign: "right",
            textTransform: "uppercase",
            marginBottom: "40px",
            marginRight: "20px",
            lineHeight: 1,
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
          }}
        >
          <BenefitCard title="Energy Independence" color={COLORS.mediumGreen} />
          <BenefitCard title="New Revenue Stream" color={COLORS.tan} number="02" />
          <BenefitCard title="Sustainability" color={COLORS.mediumGreen} number="03" />
          <BenefitCard title="Smart Automation" color={COLORS.tan} number="04" />
        </div>
        {/* Navigation Arrows Placeholder (Simplified) */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: COLORS.darkText,
            fontSize: "24px",
          }}
        >
          <span style={{ cursor: "pointer", margin: "0 10px" }}>&#9664;</span> {/* Left Arrow */}
          <span style={{ cursor: "pointer", margin: "0 10px" }}>&#9654;</span> {/* Right Arrow */}
        </div>
      </div>

      {/* 4. HOW IT WORKS Section */}
      <div
        style={{
          padding: "80px 40px",
          backgroundColor: "#fff",
          position: "relative",
          overflow: "hidden",
          minHeight: "800px",
        }}
      >
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: 40,
            color: COLORS.darkText,
            textAlign: "left",
            textTransform: "uppercase",
            marginBottom: "120px",
          }}
        >
          HOW IT WORKS
        </h2>

        {/* --- Diagram Container (Relative Positioning Context) --- */}
        <div
          style={{
            position: "absolute",
            top: "200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "1200px",
            height: "500px",
          }}
        >
          {/* Step 1: Input */}
          <Step
            stepNumber="1"
            title="INPUT"
            description="Manure is collected from livestock operations"
            position={{ left: "10%", bottom: "30%" }}
            circleColor={COLORS.lightGray}
            numberColor={COLORS.lightGray}
            lineWidth="120px"
            lineAngle="-15deg"
          />

          {/* Step 2: Conversion */}
          <Step
            stepNumber="2"
            title="CONVERSION"
            description="Our advanced anaerobic digesters convert the waste into biogas"
            position={{ left: "25%", bottom: "35%" }}
            circleColor={COLORS.lightGray}
            numberColor={COLORS.darkGreen}
            lineWidth="140px"
            lineAngle="-10deg"
          />

          {/* Step 3: Output */}
          <Step
            stepNumber="3"
            title="OUTPUT"
            description="Clean biogas is used to generate heat and electricity for the farm or grid"
            position={{ left: "40%", bottom: "45%" }}
            circleColor={COLORS.lightGray}
            numberColor={COLORS.darkGreen}
            lineWidth="160px"
            lineAngle="0deg"
          />

          {/* Step 4: Control */}
          <Step
            stepNumber="4"
            title="CONTROL"
            description="Our IoT Dashboard provides real-time performance data and remote control, ensuring peak efficiency 24/7."
            position={{ left: "60%", bottom: "60%" }}
            circleColor={COLORS.lightGray}
            numberColor={COLORS.darkGreen}
            lineWidth="180px"
            lineAngle="10deg"
            isLast={true}
          />
          
          {/* Decorative Circles (Simplified, positioned absolutely) */}
          <div style={{...Circle(60, COLORS.lightGray), left: '20%', bottom: '50%'}} />
          <div style={{...Circle(40, COLORS.lightGray), left: '25%', bottom: '60%'}} />
          <div style={{...Circle(50, COLORS.lightGray), left: '35%', bottom: '75%'}} />
          <div style={{...Circle(100, COLORS.lightGray), left: '48%', bottom: '80%'}} />
          
          {/* Image Placeholder 1 (Tan Rectangle) */}
          <div style={{...Rectangle(400, 150, COLORS.tan), right: '5%', bottom: '0%', borderRadius: '15px'}} >
            image
          </div>
          {/* Image Placeholder 2 (Brown Rectangle) */}
          <div style={{...Rectangle(250, 100, COLORS.brown), right: '10%', bottom: '5%', borderRadius: '10px'}} >
            image
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}