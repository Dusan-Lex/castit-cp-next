function Channel({ className, color }: ISvg) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.19994 11.2333L11.2333 7.99994L6.19994 4.7666V11.2333ZM7.99994 15.2333C6.98882 15.2333 6.04438 15.0444 5.1666 14.6666C4.28882 14.2888 3.52482 13.775 2.8746 13.1253C2.22482 12.475 1.71105 11.711 1.33327 10.8333C0.95549 9.95549 0.766602 9.01105 0.766602 7.99994C0.766602 6.98882 0.95549 6.04438 1.33327 5.1666C1.71105 4.28882 2.22482 3.52482 2.8746 2.8746C3.52482 2.22482 4.28882 1.71105 5.1666 1.33327C6.04438 0.95549 6.98882 0.766602 7.99994 0.766602C9.01105 0.766602 9.95549 0.95549 10.8333 1.33327C11.711 1.71105 12.475 2.22482 13.1253 2.8746C13.775 3.52482 14.2888 4.28882 14.6666 5.1666C15.0444 6.04438 15.2333 6.98882 15.2333 7.99994C15.2333 9.01105 15.0444 9.95549 14.6666 10.8333C14.2888 11.711 13.775 12.475 13.1253 13.1253C12.475 13.775 11.711 14.2888 10.8333 14.6666C9.95549 15.0444 9.01105 15.2333 7.99994 15.2333Z"
        fill={color}
      />
    </svg>
  );
}

export default Channel;
