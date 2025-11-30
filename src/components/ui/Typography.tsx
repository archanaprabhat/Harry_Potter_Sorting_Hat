import { ReactNode } from "react";

export function HeadingSecondary({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-cormorant text-[1.8rem] text-parchment tracking-wide drop-shadow-lg antialiased font-bold">
      {children}
    </h2>
  );
}

export function BodyText({ children }: { children: ReactNode }) {
  return (
    <p className="font-cormorant font-medium text-parchment opacity-90 text-[1.2rem] leading-relaxed drop-shadow-md pt-[2px]">
      {children}
    </p>
  );
}

export function MagicalText({ children }: { children: ReactNode }) {
  return (
    <p className="text-[1rem] font-cormorant font-semibold tracking-widest text-parchment opacity-70 drop-shadow-md uppercase">
      {children}
    </p>
  );
}
