import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import CakeSVG from "./CakeSVG";
import useMicBlow from "./MicBlow";
import "./birthdayCard.css";

const BirthdayCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 600,
    height: 450,
  });

  // Hook für Mikrofon-Pusten
  const { isBlowing } = useMicBlow(70);

  // Audio Referenz
  const audioRef = React.useRef(null);

  // ✅ Bild-Dimensionen laden
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      setImageLoaded(true);
    };
    img.src = "/karte.jpg";
  }, []);

  // Karte öffnen Handler
  const handleCardClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      playBirthdayMusic();
      triggerConfetti();
    }
  };

  // Geburtstagslied abspielen
  const playBirthdayMusic = () => {
    if (audioRef.current && !audioPlaying) {
      audioRef.current
        .play()
        .then(() => setAudioPlaying(true))
        .catch((err) => console.log("Audio play failed:", err));
    }
  };

  // Konfetti-Effekt
  const triggerConfetti = () => {
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
      "#54a0ff",
    ];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ["circle", "square"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ["circle", "square"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Kerzen auspusten wenn gepustet wird
  useEffect(() => {
    if (isBlowing && isOpen) {
      const litCandles = candlesLit.findIndex((lit) => lit);
      if (litCandles !== -1) {
        const newCandles = [...candlesLit];
        newCandles[litCandles] = false;
        setCandlesLit(newCandles);
      }
    }
  }, [isBlowing, candlesLit, isOpen]);

  // Ballon SVG Komponente
  const BalloonSVG = ({ color, size = 30 }) => (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 30 40"
      className="balloon"
    >
      <ellipse cx="15" cy="12" rx="10" ry="12" fill={color} />
      <line x1="15" y1="24" x2="15" y2="35" stroke="#333" strokeWidth="1" />
      <polygon points="13,35 17,35 15,40" fill="#333" />
    </svg>
  );

  return (
    <div className="birthday-card-container">
      {/* Audio Element */}
      <audio ref={audioRef} preload="auto">
        <source src="/happy-birthday.mp3" type="audio/mpeg" />
        Ihr Browser unterstützt das Audio-Element nicht.
      </audio>

      {/* ✅ Aufklappende Karte - Buch-Style */}
      <div
        className={`birthday-card-book ${isOpen ? "open" : "closed"}`}
        style={{
          width: imageLoaded ? `${imageDimensions.width}px` : "600px",
          height: imageLoaded ? `${imageDimensions.height}px` : "450px",
        }}
      >
        {/* ✅ Linke Seite (Vorderseite) */}
        <div
          className="card-page card-front"
          onClick={handleCardClick}
          style={{
            backgroundImage: "url(/karte.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* ✅ Rechte Seite (Innenseite) */}
        <div className="card-page card-inside">
          {/* Animiertes Konfetti im Hintergrund */}
          <div className="confetti-background">
            <div className="confetti-piece confetti-1"></div>
            <div className="confetti-piece confetti-2"></div>
            <div className="confetti-piece confetti-3"></div>
            <div className="confetti-piece confetti-4"></div>
            <div className="confetti-piece confetti-5"></div>
            <div className="confetti-piece confetti-6"></div>
            <div className="confetti-piece confetti-7"></div>
            <div className="confetti-piece confetti-8"></div>
            <div className="confetti-piece confetti-9"></div>
          </div>
          {/* ✅ Linke Innenseite - Grußtext */}
          <div className="card-left-inside">
            <h2 className="greeting-title">🎈 Für Elisabeth 🎈</h2>
            <div className="greeting-poem">
              <div className="poem-stanza">
                <p>
                  <em>Elisabeth, an diesem Tag so schön,</em>
                </p>
                <p>
                  <em>Soll alles um dich voller Freude steh'n.</em>
                </p>
                <p>
                  <em>Die Sterne tanzen nur für dich allein,</em>
                </p>
                <p>
                  <em>Dein Lächeln lässt die ganze Welt erstrahlen rein.</em>
                </p>
              </div>
              <div className="poem-stanza">
                <p>
                  <em>Mit jedem Jahr wirst du noch wunderbarer,</em>
                </p>
                <p>
                  <em>Dein Herz so warm, deine Seele so klarer.</em>
                </p>
                <p>
                  <em>Möge Glück dich stets begleiten,</em>
                </p>
                <p>
                  <em>Und Liebe alle deine Wege bereiten.</em>
                </p>
              </div>

              <div className="birthday-wishes">
                <p>
                  🎉 Alles Liebe zum Geburtstag! 🎉
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    marginTop: "1px",
                    color: "#e91e63",
                  }}
                >
                  <em>
                    Feiere diesen besonderen Tag
                    <br />
                    und lass dich verwöhnen, wie du es verdienst! 💝
                  </em>
                </p>
              </div>
            </div>
          </div>
          {/* ✅ Rechte Innenseite - Interaktiver Bereich */}
          <div className="card-right-inside">
            <h1 className="birthday-title">🎂 Happy Birthday! 🎂</h1>

            {/* Ballons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                margin: "10px 0",
              }}
            >
              <BalloonSVG color="#ff6b6b" size={20} />
              <BalloonSVG color="#4ecdc4" size={20} />
              <BalloonSVG color="#feca57" size={20} />
              <BalloonSVG color="#ff9ff3" size={20} />
              <BalloonSVG color="#54a0ff" size={20} />
            </div>

            {/* SVG Torte */}
            <CakeSVG candlesLit={candlesLit} />

            <p className="birthday-message">
              🌬️ Puste in dein Mikrofon, um die Kerzen auszublasen! 🌬️
            </p>

            {candlesLit.every((lit) => !lit) && (
              <div className="wish-granted">
                <h3>🌟 Dein Wunsch wird wahr! 🌟</h3>
                <p style={{ margin: "10px 0 0 0", fontSize: "1rem" }}>
                  🎈 Alles Gute zum Geburtstag! 🎈
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;
