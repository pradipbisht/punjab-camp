"use client";

import { ArrowRight, Phone } from "lucide-react";

export default function MobileCta({ onEnquire }: { onEnquire: () => void }) {
  return (
  <div className={"mobile-cta hidden [&>button]:[border:0] [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:gap-[9px] [&>button]:text-[15px] [&>button]:font-semibold [&>button]:bg-[var(--color-gold)] [&>button]:text-[var(--color-deep)] max-[760px]:fixed max-[760px]:bottom-0 max-[760px]:left-0 max-[760px]:right-0 max-[760px]:h-[61px] max-[760px]:pb-[env(safe-area-inset-bottom)] max-[760px]:grid max-[760px]:grid-cols-[1fr_1fr] max-[760px]:bg-[var(--color-deep)] max-[760px]:z-40 max-[760px]:shadow-[0_-3px_20px_#0002] max-[760px]:[&_a]:flex max-[760px]:[&_a]:items-center max-[760px]:[&_a]:justify-center max-[760px]:[&_a]:gap-[9px] max-[760px]:[&_a]:text-[15px] max-[760px]:[&_a]:font-semibold max-[760px]:[&_a]:text-[#f3f3e8] max-[760px]:[&_a:last-child]:bg-[var(--color-gold)] max-[760px]:[&_a:last-child]:text-[var(--color-deep)]"}><a href="tel:+917455997333"><Phone size={17} /> Call admissions</a><button onClick={onEnquire} aria-haspopup="dialog">Enquire now <ArrowRight size={17} /></button></div>
  );
}
