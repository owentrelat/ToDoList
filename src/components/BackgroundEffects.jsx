const butterflies = [
  {
    className: "butterfly-flight butterfly-flight-one",
    id: "blue",
    label: "Papillon bleu",
    colors: { light: "#ecfbff", main: "#6fc9e8", dark: "#3283b4" },
  },
  {
    className: "butterfly-flight butterfly-flight-two",
    id: "gold",
    label: "Papillon doré",
    colors: { light: "#fff5ca", main: "#f1bd65", dark: "#d97654" },
  },
  {
    className: "butterfly-flight butterfly-flight-three",
    id: "turquoise",
    label: "Papillon turquoise",
    colors: { light: "#e6fff1", main: "#70d9bb", dark: "#329a9d" },
  },
];

function Butterfly({ className, id, label, colors }) {
  return (
    <div className={className}>
      <svg
        aria-label={label}
        className="butterfly"
        role="img"
        viewBox="0 0 100 80"
        fill="none"
      >
        <defs>
          <linearGradient id={`upper-${id}`} x1="8" y1="8" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor={colors.light} stopOpacity=".92" />
            <stop offset=".55" stopColor={colors.main} stopOpacity=".82" />
            <stop offset="1" stopColor={colors.dark} stopOpacity=".95" />
          </linearGradient>
          <linearGradient id={`lower-${id}`} x1="18" y1="40" x2="48" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor={colors.light} stopOpacity=".9" />
            <stop offset="1" stopColor={colors.dark} stopOpacity=".9" />
          </linearGradient>
        </defs>
        <g className="butterfly-wing butterfly-wing-left">
          <path d="M47 37C37 19 21 5 11 10 1 15 7 32 20 40c-10 1-15 9-10 18 6 11 24 7 38-8L47 37Z" fill={`url(#upper-${id})`} stroke="white" strokeOpacity=".72" strokeWidth="1.2" />
          <path d="M39 34C30 23 20 17 14 16m23 23c-8 0-15 3-20 8" stroke="white" strokeOpacity=".62" strokeWidth="1" strokeLinecap="round" />
          <circle cx="20" cy="27" r="3.1" fill="white" fillOpacity=".72" />
          <circle cx="29" cy="52" r="2.1" fill="white" fillOpacity=".68" />
        </g>
        <g className="butterfly-wing butterfly-wing-right">
          <path d="M53 37C63 19 79 5 89 10c10 5 4 22-9 30 10 1 15 9 10 18-6 11-24 7-38-8l1-13Z" fill={`url(#upper-${id})`} stroke="white" strokeOpacity=".72" strokeWidth="1.2" />
          <path d="M61 34c9-11 19-17 25-18M63 39c8 0 15 3 20 8" stroke="white" strokeOpacity=".62" strokeWidth="1" strokeLinecap="round" />
          <circle cx="80" cy="27" r="3.1" fill="white" fillOpacity=".72" />
          <circle cx="71" cy="52" r="2.1" fill="white" fillOpacity=".68" />
        </g>
        <path d="M47 39c-7 9-10 20-9 26 5-2 9-7 12-13 3 6 7 11 12 13 1-6-2-17-9-26" fill={`url(#lower-${id})`} stroke="white" strokeOpacity=".7" strokeWidth="1" />
        <path d="M48 42c-1 8 0 16 2 21 2-5 3-13 2-21" fill="#28556a" fillOpacity=".76" />
        <path d="M49 39c-3-8-7-11-11-12m13 12c3-8 7-11 11-12" stroke="#28556a" strokeOpacity=".75" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function BackgroundEffects() {
  return (
    <div className="aero-atmosphere" aria-hidden="true">
      <span className="aero-bubble aero-bubble-one"><i /></span>
      <span className="aero-bubble aero-bubble-two"><i /></span>
      <span className="aero-bubble aero-bubble-three"><i /></span>
      <span className="aero-bubble aero-bubble-four"><i /></span>
      <span className="aero-bubble aero-bubble-five"><i /></span>
      <span className="aero-bubble aero-bubble-six"><i /></span>
      {butterflies.map((butterfly) => (
        <Butterfly key={butterfly.id} {...butterfly} />
      ))}
    </div>
  );
}
