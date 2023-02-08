function Collapse({ className, color }: ISvg) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.46667 11.7333L0 10.2667L3.53333 6.73333L7.06667 10.2667L5.6 11.7333L3.53333 9.66667L1.46667 11.7333ZM3.53333 5L0 1.46667L1.46667 0L3.53333 2.06667L5.6 0L7.06667 1.46667L3.53333 5Z"
        fill={color}
      />
    </svg>
  );
}

export default Collapse;
