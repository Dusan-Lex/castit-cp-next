function More({ className, color }: ISvg) {
  return (
    <svg
      className={className}
      width="4"
      height="13"
      viewBox="0 0 4 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6 12.2C1.15556 12.2 0.777778 12.0444 0.466667 11.7333C0.155555 11.4222 0 11.05 0 10.6167C0 10.1722 0.155555 9.79445 0.466667 9.48333C0.777778 9.17222 1.15 9.01667 1.58333 9.01667C2.02778 9.01667 2.40289 9.17222 2.70867 9.48333C3.014 9.79445 3.16667 10.1722 3.16667 10.6167C3.16667 11.05 3.014 11.4222 2.70867 11.7333C2.40289 12.0444 2.03333 12.2 1.6 12.2ZM1.6 7.68333C1.15556 7.68333 0.777778 7.52778 0.466667 7.21667C0.155555 6.90556 0 6.53333 0 6.1C0 5.65556 0.155555 5.28044 0.466667 4.97467C0.777778 4.66933 1.15 4.51667 1.58333 4.51667C2.02778 4.51667 2.40289 4.66933 2.70867 4.97467C3.014 5.28044 3.16667 5.65 3.16667 6.08333C3.16667 6.52778 3.014 6.90556 2.70867 7.21667C2.40289 7.52778 2.03333 7.68333 1.6 7.68333ZM1.6 3.18333C1.15556 3.18333 0.777778 3.02489 0.466667 2.708C0.155555 2.39156 0 2.01667 0 1.58333C0 1.13889 0.155555 0.763778 0.466667 0.458C0.777778 0.152667 1.15 0 1.58333 0C2.02778 0 2.40289 0.152667 2.70867 0.458C3.014 0.763778 3.16667 1.13889 3.16667 1.58333C3.16667 2.01667 3.014 2.39156 2.70867 2.708C2.40289 3.02489 2.03333 3.18333 1.6 3.18333Z"
        fill={color}
      />
    </svg>
  );
}

export default More;
