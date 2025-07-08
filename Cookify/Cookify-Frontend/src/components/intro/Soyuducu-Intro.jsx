const Intro = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center p-4 mx-auto"
            style={{
                background: "linear-gradient(135deg, #00B686, #90E0B4)",
                color: "#063B14",
                borderRadius: "1.5rem",
                boxShadow: "0 0 20px rgba(0, 182, 134, 0.7)",
                maxWidth: "400px",
                animation: "pulseGlow 2s infinite",
                fontWeight: "700",
                fontSize: "1.3rem",
                userSelect: "none",
            }}
        >
            <span style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🍲</span>
            <p style={{ marginBottom: 0 }}>
                Zəhmət olmasa, <br /> bir ərzaq seçin və ya axtarın!
            </p>

            <style>
                {`
          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 15px 5px rgba(144, 224, 180, 0.6);
            }
            50% {
              box-shadow: 0 0 25px 10px rgba(144, 224, 180, 1);
            }
          }
        `}
            </style>
        </div>
    );
};

export default Intro;