import { ReactNode } from "react";

export function HeadingSecondary({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-cinzel font-semibold text-[1.5rem] text-parchment tracking-wide drop-shadow-lg">
      {children}
    </h2>
  );
}

export function BodyText({ children }: { children: ReactNode }) {
  return (
    <p className="font-inter font-normal text-parchment opacity-90 text-[0.95rem] leading-relaxed drop-shadow-md pt-[2px]">
      {children}
    </p>
  );
}

export function MagicalText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.85rem] font-medium tracking-widest text-parchment opacity-70 drop-shadow-md">
      {children}
    </p>
  );
}
