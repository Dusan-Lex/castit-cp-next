function Close({ className, color }: ISvg) {
  return (
    <svg
      className={className}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.46667 10.4L0 8.93333L3.73333 5.2L0 1.46667L1.46667 0L5.2 3.73333L8.93333 0L10.4 1.46667L6.66667 5.2L10.4 8.93333L8.93333 10.4L5.2 6.66667L1.46667 10.4Z"
        fill={color}
      />
    </svg>
  );
}

export default Close;
