import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  slant?: 'up' | 'down';
};

export default function MarkedUpText({
  children,
  className,
  slant = 'up',
}: Props) {
  return (
    <span
      className={`
        relative isolate inline-block w-fit px-4 py-2
        ${className ?? ''}
      `}
    >
      {slant === 'up' ?
        <UpwardsSlant />
      : <DownwardsSlant />}
      <span className="relative text-white text-lg">{children}</span>
    </span>
  );
}

function UpwardsSlant() {
  return (
    <svg
      className="absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 125 21"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M1.8501 13C32.4063 5.73699 96.023 7.95624 124.012 9.97375"
        stroke="currentColor"
        strokeWidth="16"
        className="text-primary-500"
      />
    </svg>
  );
}

function DownwardsSlant() {
  return (
    <svg
      className="absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 127 20"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M1.229 7.90479C32.588 12.7804 97.8761 11.2906 126.6 9.93628"
        strokeWidth="16"
        stroke="currentColor"
        className="text-primary-500"
      />
    </svg>
  );
}
