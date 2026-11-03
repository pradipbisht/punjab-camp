"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import FlipCopy from "@/shared/ui/flip-copy";
import SpotlightCard from "@/shared/ui/spotlight-card";

const ui: Record<string, string> = {
  section: "dgs-partners-section-section bg-[#042d24] text-[#fffdf3] [border-block:7px_solid_var(--color-ivory)] scroll-mt-6 max-[600px]:[border-block-width:5px]",
  visual: "dgs-partners-section-visual relative overflow-hidden",
  backdrop: "dgs-partners-section-backdrop object-cover [object-position:center] max-[600px]:h-[365px]! max-[600px]:[object-position:86%_center]",
  shade: "dgs-partners-section-shade absolute top-0 right-0 bottom-0 left-0 [background:linear-gradient(90deg,_#012a20cc_0%,_#012a2088_38%,_#012a2040_62%,_transparent_82%)] max-[900px]:[background:linear-gradient(90deg,_#012a20d4,_#012a2088_60%,_#012a201a)] max-[600px]:[background:linear-gradient(0deg,_#042d24_48%,_transparent_68%),_linear-gradient(90deg,_#012a20e8,_#012a2099_48%,_#012a2012)]",
  content: "dgs-partners-section-content relative grid grid-cols-[35%_34%_31%] items-center min-h-[490px] pt-9.5 pb-9.5 min-[1700px]:min-h-[540px] max-[1150px]:grid-cols-[35%_38%_27%] max-[1150px]:min-h-[435px] max-[900px]:grid-cols-[42%_42%_16%] max-[900px]:min-h-[410px] max-[900px]:pt-8.5 max-[900px]:pb-8.5 max-[600px]:block max-[600px]:min-h-0 max-[600px]:pt-[35px] max-[600px]:pb-[31px]",
  copy: "dgs-partners-section-copy relative z-1 [&_h2]:text-[clamp(48px,_5vw,_73px)] [&_h2]:leading-[.99] [&_h2]:tracking-[-2.2px] [&_h2_em]:text-[#edd6a4] max-[1150px]:[&_h2]:text-[58px] max-[900px]:[&_h2]:text-[53px] max-[600px]:min-h-[300px] max-[600px]:[&_h2]:text-[52px] max-[600px]:[&_h2]:leading-[1] max-[600px]:[&_h2]:tracking-[-1.5px] max-[370px]:[&_h2]:text-[47px]",
  eyebrow: "dgs-partners-section-eyebrow flex items-center gap-[9px] mb-4.5 text-[13px] leading-[1.6] font-semibold tracking-[1.55px] text-[#f4f1df] [&_>_span]:text-[23px] [&_>_span]:leading-[1] [&_>_span]:text-[#edbe66] max-[1150px]:text-[11px] max-[1150px]:tracking-[1.1px] max-[900px]:max-w-[250px] max-[900px]:text-[11px] max-[600px]:mb-[17px] max-[600px]:text-[11px] max-[600px]:max-w-none max-[370px]:text-[11px] max-[370px]:tracking-[.9px]",
  description: "dgs-partners-section-description mt-5 text-[17px] leading-[1.75] text-[#f0f1e6] max-[1150px]:text-[15px] max-[1150px]:max-w-[285px] max-[600px]:text-[15px] max-[600px]:max-w-[250px] max-[600px]:mt-[17px]",
  hint: "dgs-partners-section-hint mt-[25px] flex items-center gap-2.5 text-[13px] tracking-[.6px] text-[#e4c789] [&_svg]:opacity-85 max-[600px]:text-[12px] max-[600px]:mt-[17px]",
  network: "dgs-partners-section-network relative h-[452px] w-[370px] justify-self-center max-[1150px]:[zoom:.86] max-[900px]:[zoom:.76] max-[600px]:mx-auto max-[600px]:mt-[15px] max-[600px]:h-auto max-[600px]:[zoom:.85] max-[370px]:[zoom:.79]",
  stage: "group/orbit relative size-[370px]",
  glow: "pointer-events-none absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#d5b04f24,transparent_68%)]",
  ring: "pointer-events-none absolute left-[50px] top-[50px] size-[270px] rounded-full border border-[#d5b04f66]",
  schoolBadge: "dgs-partners-section-schoolBadge absolute left-1/2 top-1/2 z-2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#f0d9a0] bg-[radial-gradient(circle_at_32%_24%,#1c5a3d,#053c2c_58%,#03281e_100%)] shadow-[0_0_0_3px_#0a3328,0_0_0_5px_#d8bd7988,0_0_32px_#edbe6633,inset_0_0_22px_#021a1499] motion-safe:animate-badge-glow motion-reduce:animate-none [&_img]:h-[78px] [&_img]:w-[100px] [&_img]:object-contain",
  partners: "dgs-partners-section-partners pointer-events-none absolute inset-0 z-3",
  badge: "dgs-partners-section-badge pointer-events-auto flex size-full flex-col items-center justify-center gap-1 rounded-full border-2 border-[#fffefb] bg-[#fffefb] px-2 pt-3 pb-2 shadow-[0_4px_20px_#001b2230] transition-[box-shadow,border-color,transform] duration-300 hover:border-gold hover:shadow-[0_0_0_5px_#edbe6622,0_10px_30px_#001a2866] aria-selected:border-gold aria-selected:shadow-[0_0_0_6px_#edbe6633,0_10px_30px_#001a2866] aria-selected:scale-[1.05] focus-visible:outline-3 focus-visible:outline-[#f5d98d] focus-visible:outline-offset-[5px] [&_img]:h-12.5 [&_img]:w-18.5 [&_img]:object-contain [&_span]:text-[9.5px] [&_span]:font-[650] [&_span]:leading-[1.3] [&_span]:tracking-[0] [&_span]:whitespace-nowrap [&_span]:text-[#3a473b] motion-reduce:transition-none",
  float: "motion-safe:animate-badge-float group-data-[paused=true]/orbit:[animation-play-state:paused] motion-reduce:animate-none",
  goalkeepers: "[&_img]:h-10 [&_img]:w-[79px]",
  bengaluru: "[&_img]:h-[58px]! [&_img]:w-16! [&_span]:hidden",
  prayaas: "[&_img]:h-10 [&_img]:w-[79px] [&_span]:hidden",
  kidnasium: "[&_img]:h-[51px] [&_img]:w-14",
  note: "dgs-partners-section-note self-start justify-self-start mt-10 mr-0 mb-0 ml-2 max-w-[220px] rounded-[14px] border border-[#d6be7d33] bg-[#042d24b8] pt-5 pr-5 pb-5 pl-5 font-serif italic text-[26px] leading-[1.28] tracking-[-.3px] [text-shadow:0_2px_15px_#001b16cc] backdrop-blur-[6px] max-[1150px]:text-[22px] max-[1150px]:mt-5.5 max-[1150px]:ml-0 max-[900px]:hidden",
  details: "dgs-partners-section-details [border-top:1px_solid_#bba86a44] bg-[#052f27]",
  detailsHead: "flex items-end justify-between gap-4 pt-6 pb-4 max-[600px]:block max-[600px]:pt-5",
  detailsKicker: "text-[12px] font-semibold tracking-[1.7px] text-[#d6b877]",
  detailsHint: "text-[13px] text-[#c9d4c4] max-[600px]:mt-2",
  rail: "mb-5 flex gap-1.5",
  railStop: "h-1 flex-1 rounded-full bg-[#d6be7d33] transition-[background] duration-300 data-active:bg-[#edbe66]",
  cards: "grid grid-cols-4 items-stretch gap-3.5 pb-9 max-[1150px]:gap-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:pb-7",
  card: "group/card relative flex h-full min-h-[280px] flex-col p-6 text-left transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[600px]:min-h-0 max-[600px]:p-5",
  cardTop: "relative z-[2] flex items-center justify-between gap-3",
  cardIndex: "font-serif text-[22px] leading-none tracking-[-0.4px] text-[#edbe66]",
  cardLogoWrap: "grid h-11 min-w-[4.6rem] place-items-center rounded-full bg-[#fffdf6] px-2.5 shadow-[0_8px_18px_#00150f40]",
  cardLogo: "h-7 w-auto max-h-7 max-w-[52px] object-contain",
  cardName: "relative z-[2] mt-7 text-[11px] font-semibold tracking-[1.6px] uppercase text-[#e4c789]",
  cardTitle: "relative z-[2] mt-2 font-serif text-[24px] leading-[1.18] tracking-[-0.3px] text-[#fffdf3] max-[1150px]:text-[21px]",
  cardCopy: "relative z-[2] mt-3 text-[14.5px] leading-[1.7] text-[#c5d2c0]",
  cardLink: "relative z-[2] mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-[#edcf90] transition-colors duration-300 group-hover/card:text-[#fff1c8] after:absolute after:bottom-0 after:left-0 after:h-px after:w-[5.2em] after:origin-left after:scale-x-40 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(.22,1,.36,1)] group-hover/card:after:scale-x-100",
  desktopBreak: "dgs-partners-section-desktopBreak max-[1150px]:hidden",
};

const orbitPositions = [
  "left-[137px] top-[2px]",
  "left-[272px] top-[137px]",
  "left-[137px] top-[272px]",
  "left-[2px] top-[137px]",
];

const spokes = [
  { x2: 185, y2: 58 },
  { x2: 312, y2: 185 },
  { x2: 185, y2: 312 },
  { x2: 58, y2: 185 },
];

const programmes = [
  {
    name: "Goalkeepers", hindi: "पहला कदम", punjabiName: "ਗੋਲਕੀਪਰਜ਼ · ਪਹਿਲਾ ਕਦਮ", image: "goalkeepers.webp", position: "goalkeepers",
    label: "A thoughtful first step", punjabiLabel: "ਇੱਕ ਸੋਚਿਆ-ਸਮਝਿਆ ਪਹਿਲਾ ਕਦਮ",
    description: "DGS’s own pre-admission programme helps families understand a child’s strengths and next steps, beyond a score.",
    punjabiDescription: "ਡੀ.ਜੀ.ਐਸ. ਦਾ ਐਡਮਿਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ ਪ੍ਰੋਗਰਾਮ ਪਰਿਵਾਰਾਂ ਨੂੰ ਬੱਚੇ ਦੀਆਂ ਤਾਕਤਾਂ ਅਤੇ ਅਗਲਾ ਕਦਮ ਸਮਝਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    link: "https://doonglobalschool.edu.in/programmes/",
  },
  {
    name: "Bengaluru FC", hindi: "फ़ुटबॉल", punjabiName: "ਬੈਂਗਲੁਰੂ ਐਫ.ਸੀ. · ਫੁੱਟਬਾਲ", image: "bfc-soccer-schools-stacked.webp", position: "bengaluru",
    label: "Find your footballing feet", punjabiLabel: "ਆਪਣੀ ਫੁੱਟਬਾਲ ਪਛਾਣ ਲੱਭੋ",
    description: "A connection with Bengaluru FC Soccer Schools brings a dedicated football programme into the conversation.",
    punjabiDescription: "ਬੈਂਗਲੁਰੂ ਐਫ.ਸੀ. ਸਾਕਰ ਸਕੂਲਜ਼ ਨਾਲ ਜੁੜਿਆ ਇੱਕ ਫੁੱਟਬਾਲ ਪ੍ਰੋਗਰਾਮ ਗੱਲਬਾਤ ਵਿੱਚ ਆਉਂਦਾ ਹੈ।",
    link: "https://bfcsoccerschools.com/",
  },
  {
    name: "Prayaas", hindi: "बोर्ड से पहले", punjabiName: "ਪ੍ਰਯਾਸ · ਬੋਰਡ ਤੋਂ ਪਹਿਲਾਂ", image: "prayaas.webp", position: "prayaas",
    label: "Clarity before the boards", punjabiLabel: "ਬੋਰਡ ਤੋਂ ਪਹਿਲਾਂ ਸਾਫ਼ ਤਸਵੀਰ",
    description: "Independent CBSE mock-board assessments help senior students understand what to focus on next.",
    punjabiDescription: "ਸੁਤੰਤਰ ਸੀ.ਬੀ.ਐਸ.ਈ. ਮੌਕ ਬੋਰਡ ਅਸੈਸਮੈਂਟ ਸੀਨੀਅਰ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਦੱਸਦੇ ਹਨ ਕਿ ਅੱਗੇ ਕਿਸ ਉੱਤੇ ਧਿਆਨ ਦੇਣਾ ਹੈ।",
    link: "https://prayaassessments.com/",
  },
  {
    name: "Kidnasium", hindi: "हरकत की ख़ुशी", punjabiName: "ਕਿਡਨੇਜ਼ੀਅਮ · ਹਰਕਤ ਦੀ ਖੁਸ਼ੀ", image: "kidnasium.webp", position: "kidnasium",
    label: "The joy of moving", punjabiLabel: "ਹਰਕਤ ਦੀ ਖੁਸ਼ੀ",
    description: "Discover an approach to movement, fitness and physical confidence through the school’s Kidnasium association.",
    punjabiDescription: "ਸਕੂਲ ਦੀ ਕਿਡਨੇਜ਼ੀਅਮ ਸਾਂਝ ਰਾਹੀਂ ਹਰਕਤ, ਫਿਟਨੈਸ ਅਤੇ ਸਰੀਰਕ ਵਿਸ਼ਵਾਸ ਲੱਭੋ।",
    link: "https://kidnasium.in/",
  },
];

export default function PartnersSection() {
  const [active, setActive] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const networkRef = useRef<HTMLDivElement>(null);
  const paused = rotationPaused || !inView || hovered || focused;

  useEffect(() => {
    const network = networkRef.current;
    if (!network) return;
    setAnimationReady(true);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .1 });
    observer.observe(network);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % programmes.length), 4800);
    return () => window.clearInterval(timer);
  }, [paused, active]);

  function focusTab(index: number) {
    setActive(index);
    document.getElementById(`programme-tab-${index}`)?.focus();
  }

  return (
    <section id="programmes" className={ui.section} aria-labelledby="partners-heading">
      <div className={ui.visual}>
        <Image
          className={ui.backdrop}
          src="/images/partners-punjab-football.webp"
          alt="Illustrative school sports campaign: a Sikh Indian boy practising football on a sunlit playing field"
          fill
          sizes="(max-width: 600px) 1100px, 100vw"
          quality={85}
        />
        <div className={ui.shade} />

        <div className={`dgs-container w-[calc(100%_-_128px)] max-w-[1280px] ml-auto mr-auto max-[1150px]:w-[calc(100%_-_80px)] max-[900px]:w-[calc(100%_-_56px)] max-[760px]:w-[calc(100%_-_40px)] max-[370px]:w-[calc(100%_-_32px)] ${ui.content}`}>
          <div className={ui.copy} data-reveal data-no-split>
            <p className={ui.eyebrow}><span aria-hidden="true">⟶</span> OUR PARTNERS IN STUDENT GROWTH</p>
            <h2 id="partners-heading" data-no-split>
              <FlipCopy interval={6200} label="Learning beyond the classroom. ਕਲਾਸ ਤੋਂ ਅੱਗੇ। कक्षा से आगे।" frames={[
                <span>Learning<br />Beyond<br /><em className="not-italic">the classroom.</em></span>,
                <span><em lang="pa" className="font-punjabi not-italic">ਕਲਾਸ ਤੋਂ ਅੱਗੇ।</em><br /><em lang="hi" className="font-hindi not-italic">कक्षा से आगे।</em></span>,
              ]} />
            </h2>
            <p className={ui.description}>Organisations we work alongside to widen<br className={ui.desktopBreak} /> what students can do beyond the classroom.</p>
            <p className={ui.hint}>Each partner, a path beyond the classroom <ArrowRight size={14} aria-hidden="true" /></p>
          </div>

          <div ref={networkRef} className={ui.network} data-reveal data-reveal-delay="1">
            <div
              className={ui.stage}
              data-animated={animationReady}
              data-paused={paused}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocusCapture={() => setFocused(true)}
              onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}
            >
              <div className={ui.glow} aria-hidden="true" />
              <div className={ui.ring} aria-hidden="true" />
              <svg viewBox="0 0 370 370" className="pointer-events-none absolute inset-0 z-1 size-full" aria-hidden="true">
                {spokes.map((spoke, index) => (
                  <line key={index} x1="185" y1="185" x2={spoke.x2} y2={spoke.y2} stroke={active === index ? "#edbe66" : "#d5b04f55"} strokeWidth={active === index ? 2 : 1} strokeLinecap="round" />
                ))}
              </svg>
              <div className={ui.schoolBadge}>
                <Image src="/images/logo-white.webp" alt="Doon Global School" width={106} height={78} />
              </div>

              <div className={ui.partners} role="tablist" aria-label="School programmes">
                {programmes.map((programme, index) => (
                  <div key={programme.name} className={`absolute size-24 ${orbitPositions[index]} ${ui.float}`} style={{ animationDelay: `${index * 0.65}s` }} role="presentation">
                    <button
                      id={`programme-tab-${index}`}
                      className={`${ui.badge} ${ui[programme.position]}`}
                      role="tab"
                      aria-label={programme.name}
                      aria-selected={active === index}
                      aria-controls="programme-panel"
                      tabIndex={active === index ? 0 : -1}
                      onClick={() => setActive(index)}
                      onKeyDown={event => {
                        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
                        event.preventDefault();
                        const next = event.key === "Home" ? 0 : event.key === "End" ? programmes.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + programmes.length) % programmes.length;
                        focusTab(next);
                      }}
                    >
                      <Image src={`/images/${programme.image}`} alt="" width={90} height={65} />
                      <span>{programme.name.toUpperCase()}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {animationReady && <div className="mt-3 flex justify-center motion-reduce:hidden">
              <button
                type="button"
                onClick={() => setRotationPaused(value => !value)}
                aria-label={rotationPaused ? "Resume programme autoplay" : "Pause programme autoplay"}
                className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[#d6be7d40] bg-[#042d2480] px-3 py-1.5 text-[13px] text-[#e2d3aa] transition-colors hover:border-[#d6be7d99] hover:bg-[#164734]"
              >
                {rotationPaused ? <Play size={11} aria-hidden="true" /> : <Pause size={11} aria-hidden="true" />}
                {rotationPaused ? "Resume spotlight" : "Pause spotlight"}
              </button>
            </div>}
          </div>

          <p className={ui.note}>
            <span className="mb-2.5 block font-sans text-[11px] font-semibold not-italic tracking-[2px] text-[#d6b877]">PUNJAB · DGS</span>
            A stronger<br />tomorrow for<br />every young boy.
            <em lang="hi" className="font-hindi mt-2.5 block text-[18px] not-italic text-[#edd6a4]">एक मज़बूत कल।</em>
          </p>
        </div>
      </div>

      <div className={ui.details} id="programme-panel" role="tabpanel" aria-labelledby={`programme-tab-${active}`} tabIndex={0}>
        <div className="dgs-container w-[calc(100%_-_128px)] max-w-[1280px] ml-auto mr-auto max-[1150px]:w-[calc(100%_-_80px)] max-[900px]:w-[calc(100%_-_56px)] max-[760px]:w-[calc(100%_-_40px)] max-[370px]:w-[calc(100%_-_32px)]">
          <div className={ui.detailsHead}>
            <p className={ui.detailsKicker}>FOUR PATHS BEYOND THE CLASSROOM</p>
            <p className={ui.detailsHint}>Tap a partner to spotlight it on the constellation.</p>
          </div>
          <div className={ui.rail} aria-hidden="true">
            {programmes.map((programme, index) => (
              <span key={programme.name} className={ui.railStop} data-active={active === index || undefined} />
            ))}
          </div>
          <div className={ui.cards}>
            {programmes.map((programme, index) => {
              const selected = active === index;
              return (
                <SpotlightCard
                  key={programme.name}
                  className={ui.card}
                  spotlightColor="rgba(237, 190, 102, 0.95)"
                  intensity={selected ? 0.34 : 0.16}
                  spotlightSize={selected ? 320 : 250}
                  softness={0.74}
                  borderGlow={selected ? 0.95 : 0.48}
                  ambient={selected}
                  grain={0.16}
                  data-active={selected || undefined}
                  aria-current={selected || undefined}
                  style={{
                    "--spotlight-card-surface": selected ? "#0b4336" : "#06352c",
                    "--spotlight-card-border": selected ? "rgba(237, 190, 102, 0.58)" : "rgba(214, 190, 125, 0.16)",
                    "--spotlight-card-shadow": selected
                      ? "0 20px 42px -18px rgba(0, 18, 14, 0.88)"
                      : "0 16px 36px -22px rgba(0, 18, 14, 0.62)",
                  } as CSSProperties}
                >
                  <button type="button" className="relative z-[2] flex min-h-0 flex-1 flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5d98d]" onClick={() => setActive(index)}>
                    <span className={ui.cardTop}>
                      <span className={ui.cardIndex}>0{index + 1}</span>
                      <span className={ui.cardLogoWrap}><Image src={`/images/${programme.image}`} alt="" width={72} height={40} className={ui.cardLogo} /></span>
                    </span>
                    <FlipCopy interval={7600} className="w-full" label={`${programme.name}. ${programme.label}. ${programme.description}`} frames={[
                      <span className="block">
                        <span className={`block ${ui.cardName}`}>{programme.name} · <span lang="hi" className="font-hindi tracking-normal">{programme.hindi}</span></span>
                        <span className={`block ${ui.cardTitle}`}>{programme.label}</span>
                        <span className={`block ${ui.cardCopy}`}>{programme.description}</span>
                      </span>,
                      <span className="block">
                        <span className={`block ${ui.cardName}`} lang="pa">{programme.punjabiName}</span>
                        <span className={`block ${ui.cardTitle}`} lang="pa">{programme.punjabiLabel}</span>
                        <span className={`block ${ui.cardCopy}`} lang="pa">{programme.punjabiDescription}</span>
                      </span>,
                    ]} />
                    <h3 className="sr-only">{programme.label}</h3>
                  </button>
                  <a className={ui.cardLink} href={programme.link} target="_blank" rel="noopener noreferrer">Learn more <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> about {programme.name} (opens in a new tab)</span></a>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
