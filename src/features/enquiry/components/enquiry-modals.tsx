"use client";

import { useEffect, useRef } from "react";
import { Check, ShieldCheck, X } from "lucide-react";
import AdmissionsForm from "./admissions-form";
import type { EnquiryPreset } from "@/shared/lib/enquiry";

export function EnquiryDialog({ open, preset, onClose, onPrivacy }: { open: boolean; preset: EnquiryPreset | null; onClose: () => void; onPrivacy: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (open) ref.current?.showModal(); else ref.current?.close(); }, [open]);
  return (
    <dialog ref={ref} data-lenis-prevent className={"admissions-dialog fixed [border:1px_solid_#d4d9c7] rounded-[12px] pt-0 pr-0 pb-0 pl-0 bg-[#fbfaf4] text-[var(--color-ink)] w-[880px] max-w-[calc(100vw_-_40px)] max-h-[calc(100dvh_-_40px)] overflow-auto overscroll-contain shadow-[0_30px_110px_#001b1755] [scrollbar-width:thin] [scrollbar-color:#a2b08c_#f3f2e9] [&::backdrop]:bg-[#05281e9c] [&::backdrop]:[backdrop-filter:blur(7px)] [&>.dialog-close]:sticky [&>.dialog-close]:grid [&>.dialog-close]:place-items-center [&>.dialog-close]:z-2 [&>.dialog-close]:top-3 [&>.dialog-close]:right-auto [&>.dialog-close]:w-8 [&>.dialog-close]:h-8 [&>.dialog-close]:mt-3 [&>.dialog-close]:mr-3 [&>.dialog-close]:-mb-11 [&>.dialog-close]:ml-auto [&>.dialog-close]:pt-0 [&>.dialog-close]:pr-0 [&>.dialog-close]:pb-0 [&>.dialog-close]:pl-0 [&>.dialog-close]:[border:1px_solid_#dce1d1] [&>.dialog-close]:rounded-full [&>.dialog-close]:bg-[#fbfaf4f2] [&>.dialog-close]:text-[#526b45] [&>.dialog-close]:[transition:background_.2s,border-color_.2s] [&>.dialog-close:hover]:bg-[#e9eddf] [&>.dialog-close:hover]:[border-color:#a8ba96] max-[700px]:max-w-[calc(100vw_-_24px)] max-[700px]:max-h-[calc(100dvh_-_24px)] max-[700px]:rounded-[10px] max-[700px]:[&>.dialog-close]:top-2.5 max-[700px]:[&>.dialog-close]:mt-2.5 max-[700px]:[&>.dialog-close]:mr-2.5 max-[700px]:[&>.dialog-close]:-mb-10.5 max-[700px]:[&>.dialog-close]:ml-auto m-auto"} aria-label="Enquire for admissions" onCancel={() => onClose()} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <button className={"dialog-close absolute right-[15px] top-[15px] [border:0] bg-transparent text-[#5f6d54] pt-1.5 pr-1.5 pb-1.5 pl-1.5"} aria-label="Close admissions enquiry" onClick={() => onClose()}><X size={20} /></button>
      <AdmissionsForm onPrivacy={onPrivacy} preset={preset} />
    </dialog>
  );
}

export function PrivacyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (open) ref.current?.showModal(); else ref.current?.close(); }, [open]);
  return (
    <dialog ref={ref} data-lenis-prevent className={"privacy-dialog [border:1px_solid_#d8ddca] rounded-[12px] pt-0 pr-0 pb-0 pl-0 bg-[var(--color-ivory)] text-[var(--color-ink)] max-w-[500px] w-[calc(100%_-_32px)] shadow-[0_25px_100px_#0003] [&::backdrop]:bg-[#02231b99] [&::backdrop]:[backdrop-filter:blur(5px)] m-auto"} onCancel={() => onClose()} onClick={event => { if (event.target === event.currentTarget) onClose(); }}><div className={"privacy-content relative pt-9.5 pr-9.5 pb-9.5 pl-9.5 [&>svg]:[stroke:#8c9f73] [&>svg]:stroke-[1.2] [&>svg]:mb-4.5 [&_h2]:text-[30px] [&_h2]:mb-5 [&_p]:text-[16px] [&_p]:text-[#606c5a] [&_p]:mb-4 [&_p_a]:underline [&_p_a]:[overflow-wrap:anywhere] [&_.button]:mt-[5px] max-[760px]:pt-8 max-[760px]:pr-[25px] max-[760px]:pb-8 max-[760px]:pl-[25px] max-[760px]:[&_h2]:text-[29px]"}><button className={"dialog-close absolute right-[15px] top-[15px] [border:0] bg-transparent text-[#5f6d54] pt-1.5 pr-1.5 pb-1.5 pl-1.5"} aria-label="Close privacy details" onClick={() => onClose()}><X /></button><ShieldCheck size={32} /><h2>Your enquiry, explained.</h2><p>The form asks for a parent or guardian’s name, mobile number, child’s class, city, and area of interest. Please do not enter a child’s name or other sensitive information.</p><p>Your details are used to respond to your admissions enquiry. The page will confirm when your request has been delivered, or ask you to review and send it through WhatsApp or your own email app. You can call admissions instead at any time.</p><p>This page does not save form details in browser storage or use advertising trackers. For questions about a submitted enquiry, contact <a href="mailto:admissions@doonglobalschool.edu.in">admissions@doonglobalschool.edu.in</a>.</p><button className={"button min-h-[47px] inline-flex items-center justify-center gap-6 pt-[13px] pr-[21px] pb-[13px] pl-[21px] rounded-[4px] text-[16px] font-bold [border:1px_solid_transparent] [transition:background_.2s,transform_.2s,box-shadow_.2s] [&:hover]:[transform:translateY(-2px)] [&:hover]:shadow-[0_7px_20px_#00000012] button-green bg-[var(--color-green)] text-[white]"} onClick={() => onClose()}>Got it <Check size={17} /></button></div></dialog>
  );
}
