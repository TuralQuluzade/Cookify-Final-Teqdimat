const Sect2 = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center px-4"
            style={{
                height: "100vh",
                background: "linear-gradient(135deg, #063B14 0%, #0B5A20 70%)",
                color: "#DFFFF0",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                textShadow: "0 0 8px rgba(0, 182, 134, 0.8)",
            }}
        >
            <h1
                style={{
                    fontWeight: "900",
                    fontSize: "3.0rem",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.1em",
                    userSelect: "none",
                    filter: "drop-shadow(0 0 6px #00B686)",
                    animation: "fadeInDown 1s ease forwards",
                }}
            >
                🥗 Soyuducum
            </h1>
            <h2
                style={{
                    fontWeight: "700",
                    fontSize: "2.2rem",
                    marginBottom: "1.5rem",
                    color: "#90E0B4",
                    animation: "fadeInUp 1.2s ease forwards",
                }}
            >
                Ərzaqlarını seç, <br /> ən uyğun reseptləri tap!
            </h2>
            <p
                style={{
                    fontSize: "1.4rem",
                    maxWidth: "600px",
                    lineHeight: "1.5",
                    color: "#BFF3D0",
                    marginBottom: "2rem",
                    animation: "fadeInUp 1.5s ease forwards",
                }}
            >
                Soyuducundakı məhsullarla nə bişirə biləcəyini dərhal öyrən. Sadə, sürətli
                və ləzzətli!
            </p>
            <button
                className="btn btn-lg"
                style={{
                    backgroundColor: "#00B686",
                    border: "none",
                    borderRadius: "2rem",
                    padding: "1rem 3rem",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "#063B14",
                    boxShadow: "0 8px 16px rgba(0, 182, 134, 0.7)",
                    cursor: "pointer",
                    animation: "fadeInUp 1.8s ease forwards",
                    transition: "background-color 0.3s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#008c5a")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#00B686")}
                onClick={() => document.querySelector("input").focus()}
            >
                İndi başla ➡️
            </button>

            <style>
                {`
          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
            </style>
        </div>
    );
};
export default Sect2;