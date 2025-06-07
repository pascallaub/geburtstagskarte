import './Cake.css';

const CakeSVG = ({ candlesLit }) => {
  return (
    <div className="cake-container">
      <svg
        width="300"
        height="250"
        viewBox="0 0 300 250"
        className="birthday-cake"
      >
        {/* Untere Tortenebene */}
        <ellipse cx="150" cy="200" rx="120" ry="20" fill="#8B4513" />
        <rect x="30" y="180" width="240" height="40" fill="#DEB887" />
        <rect x="30" y="180" width="240" height="10" fill="#FFB6C1" />
        
        {/* Obere Tortenebene */}
        <ellipse cx="150" cy="160" rx="90" ry="15" fill="#8B4513" />
        <rect x="60" y="145" width="180" height="30" fill="#F0E68C" />
        <rect x="60" y="145" width="180" height="8" fill="#87CEEB" />
        
        {/* Dekoration */}
        <circle cx="80" cy="190" r="5" fill="#FF69B4" />
        <circle cx="120" cy="195" r="4" fill="#FF1493" />
        <circle cx="180" cy="195" r="4" fill="#FF1493" />
        <circle cx="220" cy="190" r="5" fill="#FF69B4" />
        
        <circle cx="90" cy="155" r="3" fill="#32CD32" />
        <circle cx="130" cy="158" r="3" fill="#FFD700" />
        <circle cx="170" cy="158" r="3" fill="#32CD32" />
        <circle cx="210" cy="155" r="3" fill="#FFD700" />

        {/* Kerzen */}
        {[0, 1, 2].map((index) => {
          const x = 100 + index * 50;
          return (
            <g key={index}>
              {/* Kerze */}
              <rect 
                x={x - 3} 
                y="125" 
                width="6" 
                height="25" 
                fill="#FFFF00"
              />
              
              {/* Docht */}
              <line 
                x1={x} 
                y1="125" 
                x2={x} 
                y2="120" 
                stroke="#8B4513" 
                strokeWidth="1"
              />
              
              {/* Flamme - nur wenn Kerze brennt */}
              {candlesLit[index] && (
                <g className="flame">
                  <ellipse 
                    cx={x} 
                    cy="115" 
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