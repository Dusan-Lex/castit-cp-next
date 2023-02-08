function Chevron({ className, color }: ISvg) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.600002 1.71667L2.31667 -5.54406e-07L7.8 5.48333L13.2833 -7.50379e-08L15 1.71667L7.8 8.91667L0.600002 1.71667Z"
        fill={color}
      />
    </svg>
  );
}

export default Chevron;