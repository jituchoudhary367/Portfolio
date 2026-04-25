"use client";

const stroke = "#0D0D0D";
const accent = "#00FF88";

/** Isometric stacked planes + dotted leaders (reference system-design card). */
export function DiagramSystemDesign() {
  const layers = [
    { d: "M 24 8 L 210 8 L 226 32 L 40 32 Z", fill: "rgba(255,255,255,0.92)", label: "PRESENTATION LAYER", ly: 20 },
    { d: "M 32 36 L 218 36 L 234 60 L 48 60 Z", fill: "rgba(255,255,255,0.85)", label: "APPLICATION LAYER", ly: 48 },
    { d: "M 40 64 L 226 64 L 242 88 L 56 88 Z", fill: "rgba(255,255,255,0.78)", label: "DATA LAYER", ly: 76 },
    {
      d: "M 48 92 L 234 92 L 250 116 L 64 116 Z",
      fill: "rgba(0,255,136,0.28)",
      label: "INFRASTRUCTURE LAYER",
      ly: 104,
      accentStroke: true,
    },
  ];
  const anchor = [
    { x: 226, y: 20 },
    { x: 234, y: 48 },
    { x: 242, y: 76 },
    { x: 250, y: 104 },
  ];
  return (
    <svg viewBox="0 0 400 200" className="h-auto w-full" aria-hidden>
      <g stroke={stroke} strokeWidth="1.5">
        {layers.map((L, i) => (
          <path key={L.label} d={L.d} fill={L.fill} strokeWidth={L.accentStroke ? 2 : 1.5} />
        ))}
      </g>
      {layers.map((L, i) => {
        const a = anchor[i]!;
        return (
          <g key={`t-${L.label}`}>
            <line
              x1={a.x}
              y1={a.y}
              x2={312}
              y2={a.y}
              stroke={stroke}
              strokeWidth="1"
              strokeDasharray="3 4"
              opacity="0.55"
            />
            <text
              x={318}
              y={a.y + 3}
              fill="#0d0d0d"
              fontSize="8"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              {L.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DiagramFullStack() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <rect
        x="30"
        y="60"
        width="80"
        height="80"
        fill="#fff"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="70"
        y="108"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
      >
        UI
      </text>
      <path d="M120 100 H200" stroke={stroke} strokeWidth="2" />
      <polygon points="200,100 190,94 190,106" fill={stroke} />
      <rect
        x="210"
        y="50"
        width="90"
        height="100"
        fill={accent}
        fillOpacity="0.15"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="255"
        y="108"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
      >
        API
      </text>
      <rect
        x="210"
        y="160"
        width="90"
        height="30"
        fill="#0d0d0d"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="255"
        y="180"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        DB
      </text>
    </svg>
  );
}

export function DiagramDataAnalytics() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <rect
        x="30"
        y="120"
        width="60"
        height="60"
        fill="#fff"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="60"
        y="155"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        RAW
      </text>
      <path d="M100 150 H140" stroke={stroke} strokeWidth="2" />
      <rect
        x="150"
        y="110"
        width="80"
        height="80"
        fill={accent}
        fillOpacity="0.2"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="190"
        y="155"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        PIPELINE
      </text>
      <path d="M240 150 H280" stroke={stroke} strokeWidth="2" />
      <rect
        x="250"
        y="120"
        width="50"
        height="60"
        fill="#0d0d0d"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="275"
        y="155"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
      >
        BI
      </text>
    </svg>
  );
}

export function DiagramCloudDevOps() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <rect
        x="40"
        y="30"
        width="70"
        height="36"
        fill="#fff"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="75"
        y="52"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        GIT
      </text>
      <rect
        x="125"
        y="30"
        width="70"
        height="36"
        fill={accent}
        fillOpacity="0.2"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="160"
        y="52"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        CI
      </text>
      <rect
        x="210"
        y="30"
        width="70"
        height="36"
        fill="#fff"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="245"
        y="52"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        CD
      </text>
      <path
        d="M160 70 V110"
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <rect
        x="90"
        y="120"
        width="140"
        height="50"
        fill="#0d0d0d"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="160"
        y="150"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
      >
        CLOUD RUNTIME
      </text>
    </svg>
  );
}

export function DiagramProductThinking() {
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden>
      <circle
        cx="80"
        cy="100"
        r="36"
        fill="#fff"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="80"
        y="104"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        USER
      </text>
      <path d="M120 100 H200" stroke={stroke} strokeWidth="2" />
      <rect
        x="200"
        y="70"
        width="90"
        height="60"
        fill={accent}
        fillOpacity="0.2"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="245"
        y="104"
        textAnchor="middle"
        fill="#0d0d0d"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        FEEDBACK
      </text>
      <path
        d="M245 130 V160 H120 V130"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <rect
        x="40"
        y="150"
        width="100"
        height="36"
        fill="#0d0d0d"
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x="90"
        y="172"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        ITERATE
      </text>
    </svg>
  );
}
