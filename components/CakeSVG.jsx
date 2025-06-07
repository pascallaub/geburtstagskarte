import './Cake.css';

const CakeSVG = ({ candlesLit }) => {
  return (
    <div className="cake-container">
      <svg
        width="300"
        height="280"
        viewBox="0 0 300 280"
        className="birthday-cake"
      >
        {/* ✅ Unterste Tortenebene (größte) */}
        <ellipse cx="150" cy="230" rx="130" ry="22" fill="#8B4513" />
        <rect x="20" y="208" width="260" height="47" fill="#DEB887" />
        <rect x="20" y="208" width="260" height="17" fill="#FFB6C1" />
        
        {/* ✅ Mittlere Tortenebene - Spalt geschlossen */}
        <ellipse cx="150" cy="185" rx="105" ry="18" fill="#8B4513" />
        <rect x="45" y="162" width="210" height="45" fill="#F0E68C" /> 
        <rect x="45" y="162" width="210" height="10" fill="#87CEEB" /> 
        
        {/* ✅ Oberste Tortenebene (kleinste) */}
        <ellipse cx="150" cy="150" rx="75" ry="15" fill="#8B4513" />
        <rect x="75" y="135" width="150" height="28" fill="#FFE4E1" />
        <rect x="75" y="135" width="150" height="8" fill="#DDA0DD" />
        
        {/* ✅ Dekoration - Unterste Ebene */}
        <circle cx="70" cy="218" r="6" fill="#FF69B4" />
        <circle cx="110" cy="223" r="5" fill="#FF1493" />
        <circle cx="150" cy="225" r="6" fill="#FFD700" />
        <circle cx="190" cy="223" r="5" fill="#FF1493" />
        <circle cx="230" cy="218" r="6" fill="#FF69B4" />
        
        {/* ✅ Dekoration - Mittlere Ebene - Positionen angepasst */}
        <circle cx="80" cy="172" r="4" fill="#32CD32" /> {/* ✅ y von 177 auf 172 */}
        <circle cx="120" cy="175" r="4" fill="#FFD700" /> {/* ✅ y von 180 auf 175 */}
        <circle cx="150" cy="177" r="5" fill="#FF69B4" /> {/* ✅ y von 182 auf 177 */}
        <circle cx="180" cy="175" r="4" fill="#FFD700" /> {/* ✅ y von 180 auf 175 */}
        <circle cx="220" cy="172" r="4" fill="#32CD32" /> {/* ✅ y von 177 auf 172 */}

        {/* ✅ Dekoration - Oberste Ebene */}
        <circle cx="100" cy="145" r="3" fill="#87CEEB" />
        <circle cx="130" cy="147" r="3" fill="#FFB6C1" />
        <circle cx="170" cy="147" r="3" fill="#FFB6C1" />
        <circle cx="200" cy="145" r="3" fill="#87CEEB" />

        {/* ✅ Kerzen - jetzt auf der obersten Ebene */}
        {[0, 1, 2].map((index) => {
          const x = 110 + index * 40;
          return (
            <g key={index}>
              {/* Kerze */}
              <rect 
                x={x - 3} 
                y="115"
                width="6" 
                height="22"
                fill="#FFFF00"
              />
              
              {/* Docht */}
              <line 
                x1={x} 
                y1="115" 
                x2={x} 
                y2="110" 
                stroke="#8B4513" 
                strokeWidth="1"
              />
              
              {/* Flamme - nur wenn Kerze brennt */}
              {candlesLit[index] && (
                <g className="flame">
                  <ellipse 
                    cx={x} 
                    cy="105"
                    rx="4" 
                    ry="8" 
                    fill="url(#flameGradient)"
                    className="flame-animation"
                  />
                </g>
              )}
            </g>
          );
        })}
        <path 
          d="M 45 203 Q 75 190 105 203 Q 135 190 165 203 Q 195 190 225 203 Q 255 190 255 203" 
          stroke="#FFD700" 
          strokeWidth="3" 
          fill="none"
        />
        
        {/* Girlande zwischen mittlerer und oberster Ebene */}
        <path 
          d="M 75 162 Q 95 150 115 162 Q 135 150 155 162 Q 175 150 195 162 Q 215 150 225 162" 
          stroke="#FF69B4" 
          strokeWidth="2" 
          fill="none"
        />

        {/* ✅ Sterne als zusätzliche Dekoration */}
        <g transform="translate(60, 235)">
          <polygon points="0,-8 2,-2 8,-2 3,1 5,7 0,4 -5,7 -3,1 -8,-2 -2,-2" fill="#FFD700" />
        </g>
        <g transform="translate(240, 235)">
          <polygon points="0,-8 2,-2 8,-2 3,1 5,7 0,4 -5,7 -3,1 -8,-2 -2,-2" fill="#FFD700" />
        </g>

        {/* Flammen-Gradient Definition */}
        <defs>
          <radialGradient id="flameGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#DC143C" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CakeSVG;