import type { SVGProps } from "react";

export default function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 21C12 21 3 14.5 3 8.5C3 6 5 4 7.5 4C9.2 4 10.7 4.9 11.5 6.2C12.3 4.9 13.8 4 15.5 4C18 4 20 6 20 8.5C20 14.5 12 21 12 21Z" />
      <path
        d="M7 12 Q9 16 12 18 Q15 16 17 12"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
}
