function Logo({ className, color }: ISvg) {
  return (
    <svg
      className={className}
      viewBox="0 0 75 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M65.5726 29.6227C60.5029 29.6227 56.3783 25.4888 56.3782 20.4072L45.6193 20.4068C45.6193 25.4886 41.4947 29.6227 36.4248 29.6227H19.9534C14.8835 29.6227 10.7589 25.4886 10.7589 20.4069C10.7589 15.3251 14.8835 11.1909 19.9534 11.1909H38.08V0.40683H19.9534C8.93343 0.40683 0 9.36113 0 20.4068C0 31.4525 8.93343 40.4068 19.9534 40.4068H36.4248C42.1757 40.4068 47.3574 37.9672 50.9987 34.0653C54.64 37.9672 59.8217 40.4068 65.5726 40.4068H74.4291V29.6227H65.5726Z"
        fill="white"
      />
      <path
        d="M50.9986 11.9799C54.187 11.9799 56.7717 9.38919 56.7717 6.19337C56.7717 2.99755 54.187 0.40683 50.9986 0.40683C47.8103 0.40683 45.2256 2.99755 45.2256 6.19337C45.2256 9.38919 47.8103 11.9799 50.9986 11.9799Z"
        fill={color}
      />
    </svg>
  );
}

export default Logo;