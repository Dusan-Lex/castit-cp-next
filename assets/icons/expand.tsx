function Expand({ className, color }: ISvg) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.283203 15.6833V13.5833H11.7165V15.6833H0.283203ZM5.99987 12.9166L2.89987 9.81665L4.1832 8.53332L5.0832 9.41665V6.58332L4.1832 7.46665L2.89987 6.18332L5.99987 3.08332L9.09987 6.18332L7.81654 7.46665L6.91654 6.58332V9.41665L7.81654 8.53332L9.09987 9.81665L5.99987 12.9166ZM0.283203 2.41665V0.31665H11.7165V2.41665H0.283203Z"
        fill={color}
      />
    </svg>
  );
}

export default Expand;
