function Sort({ className, color }: ISvg) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99984 11.5834L0.416504 6.00008L1.89984 4.50008L4.94984 7.55008V0.416748H7.04984V7.55008L10.0998 4.50008L11.5832 6.00008L5.99984 11.5834Z"
        fill={color}
      />
    </svg>
  );
}

export default Sort;
