const stars = Array.from({ length: 60 }, () => ({
  cx: Math.random() * 1200,
  cy: Math.random() * 500,
  r: Math.random() * 1.5 + 0.3,
  opacity: Math.random() * 0.6 + 0.2,
  animValues: `${Math.random() * 0.3 + 0.2};${Math.random() * 0.6 + 0.4};${Math.random() * 0.3 + 0.2}`,
  dur: `${Math.random() * 3 + 2}s`,
}));

const particles = Array.from({ length: 8 }, (_, i) => ({
  cx: 580 + Math.random() * 64,
  cy: 205 + Math.random() * 20,
  r: Math.random() * 1.5 + 0.5,
  fill: i % 2 === 0 ? "#a78bfa" : "#fbbf24",
  cyAnim: `${205 + Math.random() * 20};${200 + Math.random() * 30};${205 + Math.random() * 20}`,
  cyDur: `${1.5 + Math.random() * 2}s`,
  opacityDur: `${1 + Math.random() * 2}s`,
}));

const neuralNodes = [
  [150, 50],
  [200, 30],
  [260, 40],
  [320, 60],
  [350, 110],
  [330, 170],
  [280, 200],
  [200, 210],
  [140, 180],
  [120, 120],
  [200, 100],
  [270, 110],
  [230, 150],
  [180, 130],
  [300, 140],
  [250, 70],
  [170, 80],
] as const;

const neuralLinks = [
  [150, 50, 200, 100],
  [200, 30, 200, 100],
  [260, 40, 270, 110],
  [320, 60, 300, 140],
  [350, 110, 300, 140],
  [330, 170, 280, 200],
  [280, 200, 230, 150],
  [200, 210, 180, 130],
  [140, 180, 120, 120],
  [120, 120, 180, 130],
  [200, 100, 270, 110],
  [270, 110, 230, 150],
  [230, 150, 180, 130],
  [200, 100, 230, 150],
  [300, 140, 270, 110],
  [250, 70, 200, 100],
  [170, 80, 200, 100],
] as const;

export function CreationOfAdamSVG() {
  return (
    <svg
      viewBox="0 0 1200 500"
      style={{
        width: "100%",
        height: "100%",
        filter: "drop-shadow(0 0 40px rgba(139,92,246,0.3))",
      }}
    >
      <defs>
        <radialGradient id="cosmicBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#030014" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="humanSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#c4956a" />
        </linearGradient>
        <linearGradient id="aiGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="strongGlow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="clothDrape" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <rect width="1200" height="500" fill="url(#cosmicBg)" />

      {/* Stars */}
      {stars.map((s, i) => (
        <circle
          key={`s${i}`}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="#e2e8f0"
          opacity={s.opacity}
        >
          <animate
            attributeName="opacity"
            values={s.animValues}
            dur={s.dur}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Human figure */}
      <g transform="translate(100, 120)">
        <path
          d="M200,220 C180,180 170,140 200,100 C220,70 260,60 290,80 C310,90 320,110 330,140 C340,170 350,200 340,240 C330,260 300,270 260,260 C230,250 210,240 200,220Z"
          fill="url(#humanSkin)"
          opacity="0.9"
        />
        <path
          d="M180,230 C160,260 130,290 100,310 C80,320 60,340 90,350 C130,360 200,330 240,300 C260,280 260,260 240,250Z"
          fill="url(#clothDrape)"
          stroke="#7c3aed"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        <ellipse
          cx="280"
          cy="55"
          rx="32"
          ry="38"
          fill="url(#humanSkin)"
          opacity="0.9"
        />
        <path
          d="M250,40 C255,15 275,5 295,10 C315,15 320,35 315,45 C310,30 290,20 270,25 C260,28 252,35 250,40Z"
          fill="#5b3e28"
          opacity="0.8"
        />
        <ellipse cx="290" cy="50" rx="4" ry="3" fill="#1e1b4b" />
        <circle cx="291" cy="49" r="1" fill="#e2e8f0" opacity="0.6" />
        <path
          d="M330,130 C360,115 400,105 440,100 C470,97 500,98 520,100"
          stroke="url(#humanSkin)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M518,100 C530,98 545,96 558,95"
          stroke="url(#humanSkin)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M520,93 C530,88 538,88 542,91"
          stroke="url(#humanSkin)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M520,108 C528,112 535,112 540,108"
          stroke="url(#humanSkin)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M220,150 C190,170 160,200 140,230 C130,250 125,265 130,275"
          stroke="url(#humanSkin)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M230,255 C200,290 180,320 170,350"
          stroke="url(#humanSkin)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M260,260 C250,300 250,340 260,370"
          stroke="url(#humanSkin)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* AI figure */}
      <g transform="translate(650, 60)">
        <path
          d="M100,100 C60,60 80,10 140,5 C180,0 220,10 260,5 C320,0 380,20 400,70 C420,110 410,160 380,200 C360,230 320,260 270,270 C220,280 160,270 120,240 C80,210 70,160 80,130 C85,115 90,108 100,100Z"
          fill="#1e1b4b"
          fillOpacity="0.5"
          stroke="url(#neuralGrad)"
          strokeWidth="1.5"
        >
          <animate
            attributeName="fillOpacity"
            values="0.4;0.6;0.4"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        {neuralNodes.map(([cx, cy], i) => (
          <circle
            key={`n${i}`}
            cx={cx}
            cy={cy}
            r="4"
            fill="#a78bfa"
            opacity="0.7"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.4;0.9;0.4"
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {neuralLinks.map(([x1, y1, x2, y2], i) => (
          <line
            key={`l${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#7c3aed"
            strokeWidth="0.8"
            opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.15;0.5;0.15"
              dur={`${3 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
        <path
          d="M180,280 C160,240 150,200 170,160 C180,140 200,130 220,135 C240,140 260,140 280,135 C300,130 320,140 330,160 C350,200 340,240 320,280 C300,310 260,320 250,320 C240,320 200,310 180,280Z"
          fill="url(#aiGlow)"
          opacity="0.25"
          stroke="#a78bfa"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <polygon
          points="250,95 220,130 230,175 270,175 280,130"
          fill="url(#aiGlow)"
          opacity="0.4"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <circle
          cx="250"
          cy="135"
          r="8"
          fill="#7c3aed"
          opacity="0.8"
          filter="url(#glow)"
        >
          <animate
            attributeName="r"
            values="7;9;7"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="250" cy="135" r="3" fill="#e0e7ff" />
        <path
          d="M170,200 C130,195 80,190 30,188 C0,187 -30,188 -50,190"
          stroke="url(#aiGlow)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M-48,190 C-60,188 -75,186 -88,185"
          stroke="url(#aiGlow)"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M-50,183 C-58,178 -65,178 -70,182"
          stroke="url(#aiGlow)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M-50,198 C-56,203 -63,203 -68,198"
          stroke="url(#aiGlow)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M320,190 C340,170 350,150 345,130"
          stroke="url(#aiGlow)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>

      {/* Energy between fingertips */}
      <g filter="url(#strongGlow)">
        <circle cx="612" cy="215" r="4" fill="#fbbf24" opacity="0.9">
          <animate
            attributeName="r"
            values="3;6;3"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M658,215 C645,210 625,208 612,215 C625,222 645,220 658,215"
          stroke="#a78bfa"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M566,215 C580,208 598,206 612,215 C598,224 580,222 566,215"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </path>
        {particles.map((p, i) => (
          <circle
            key={`p${i}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill={p.fill}
            opacity="0.6"
          >
            <animate
              attributeName="cy"
              values={p.cyAnim}
              dur={p.cyDur}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur={p.opacityDur}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* Philosophical symbols */}
      <text
        x="80"
        y="60"
        fill="#a78bfa"
        fontSize="18"
        opacity="0.3"
        fontFamily="serif"
      >
        Σ
      </text>
      <text
        x="1100"
        y="80"
        fill="#7c3aed"
        fontSize="22"
        opacity="0.25"
        fontFamily="serif"
      >
        ∞
      </text>
      <text
        x="950"
        y="450"
        fill="#a78bfa"
        fontSize="16"
        opacity="0.2"
        fontFamily="serif"
      >
        φ
      </text>
      <text
        x="150"
        y="430"
        fill="#7c3aed"
        fontSize="20"
        opacity="0.2"
        fontFamily="serif"
      >
        Ω
      </text>
      <text
        x="600"
        y="460"
        fill="#a78bfa"
        fontSize="14"
        opacity="0.2"
        fontFamily="serif"
      >
        λόγος
      </text>
      <text
        x="500"
        y="40"
        fill="#7c3aed"
        fontSize="12"
        opacity="0.2"
        fontFamily="serif"
      >
        cogito
      </text>
      <text
        x="700"
        y="30"
        fill="#a78bfa"
        fontSize="12"
        opacity="0.2"
        fontFamily="serif"
      >
        ergo sum
      </text>
    </svg>
  );
}
