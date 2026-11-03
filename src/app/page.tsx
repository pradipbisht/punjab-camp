"use client";

import { useState } from "react";
import { CampusHero } from "@/features/hero";
import { AdmissionDrive } from "@/features/admission-drive";
import { WhyDgsSection } from "@/features/why-dgs";
import { SchoolLifeSection } from "@/features/school-life";
import { BoardingSection } from "@/features/boarding";
import { ProgrammesSection } from "@/features/programmes";
import { JourneySection } from "@/features/journey";
import { FaqSection } from "@/features/faq";
import { EnquiryDialog, PrivacyDialog, type EnquiryPreset } from "@/features/enquiry";
import { MobileCta, SiteFooter, SiteHeader, SiteMotion } from "@/shared/layout";

export default function HomePage() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryPreset, setEnquiryPreset] = useState<EnquiryPreset | null>(null);
  const openEnquiry = () => setEnquiryOpen(true);

  return <>
    <SiteMotion />
    <a className={"skip-link fixed left-5 -top-15 z-100 pt-3 pr-5.5 pb-3 pl-5.5 bg-[var(--color-gold)] text-[var(--color-deep)] [&:focus]:top-3"} href="#main-content">Skip to content</a>
    <SiteHeader onEnquire={openEnquiry} />

    <main id="main-content">
      <CampusHero onEnquire={openEnquiry} />
      <AdmissionDrive onRegister={preset => { setEnquiryPreset(preset); setEnquiryOpen(true); }} onEnquire={openEnquiry} />
      <WhyDgsSection />
      <SchoolLifeSection />
      <BoardingSection onEnquire={openEnquiry} />
      <ProgrammesSection />
      <JourneySection />
      <FaqSection onEnquire={openEnquiry} />
    </main>

    <SiteFooter onEnquire={openEnquiry} onPrivacy={() => setPrivacyOpen(true)} />
    <MobileCta onEnquire={openEnquiry} />
    <EnquiryDialog open={enquiryOpen} preset={enquiryPreset} onClose={() => setEnquiryOpen(false)} onPrivacy={() => setPrivacyOpen(true)} />
    <PrivacyDialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
  </>;
}
