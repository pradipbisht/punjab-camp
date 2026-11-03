import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import FlipCopy from "@/shared/ui/flip-copy";

// Static Tailwind utility groups keep the markup and responsive states readable.
const ui: Record<string, string> = {
  hero: "dgs-campus-hero-hero relative bg-[#fbfaf4] text-[var(--color-green)]",
  scene: "dgs-campus-hero-scene relative overflow-hidden max-[700px]:pb-[280px]",
  image: "dgs-campus-hero-image object-cover [object-position:center_55%] max-[900px]:[object-position:62%_center] max-[700px]:[object-position:72%_center] motion-safe:[transform-origin:75%_center]",
  fade: "dgs-campus-hero-fade absolute top-0 right-0 bottom-0 left-0 [background:linear-gradient(180deg,_#fbfaf499,_#fbfaf400_145px),_linear-gradient(90deg,_#fbfaf4_0%,_#fbfaf4f7_26%,_#fbfaf4d8_40%,_#fbfaf466_54%,_transparent_68%),_linear-gradient(0deg,_#f8f6ed1f,_transparent_30%)] max-[900px]:[background:linear-gradient(180deg,_#fbfaf499,_#fbfaf400_135px),_linear-gradient(90deg,_#fbfaf4,_#fbfaf4eb_34%,_#fbfaf480_54%,_#fbfaf40a_85%)] max-[700px]:[background:linear-gradient(180deg,_#fbfaf4b8_0%,_#fbfaf4f5_18%,_#fbfaf4f5_53%,_#fbfaf4db_64%,_#fbfaf400_85%)]",
  inner: "dgs-campus-hero-inner relative min-h-[782px] flex items-center pt-[146px] pb-12 min-[1650px]:min-h-[852px] max-[1150px]:min-h-[742px] max-[900px]:min-h-[721px] max-[900px]:pt-32 max-[900px]:pb-10.5 max-[700px]:min-h-0 max-[700px]:pt-30 max-[700px]:pb-0 max-[700px]:block",
  copy: "dgs-campus-hero-copy relative w-[680px] max-w-[58%] z-1 [&_h1]:font-serif [&_h1]:font-semibold [&_h1]:[font-variation-settings:'wght'_600,'opsz'_96] [&_h1]:text-[clamp(52px,_5.8vw,_80px)] [&_h1]:tracking-[-0.04em] [&_h1]:leading-[0.94] [&_h1]:[text-shadow:0_1px_0_#fbfaf4,0_10px_32px_#fbfaf4cc] min-[1650px]:[&_h1]:text-[86px] max-[1150px]:max-w-[60%] max-[1150px]:[&_h1]:text-[56px] max-[900px]:max-w-[70%] max-[900px]:[&_h1]:text-[50px] max-[700px]:max-w-none max-[700px]:w-full max-[700px]:[&_h1]:text-[clamp(40px,_10vw,_56px)] max-[700px]:[&_h1]:leading-[1] max-[700px]:[&_h1]:tracking-[-0.03em] max-[370px]:[&_h1]:text-[36px]",
  eyebrow: "dgs-campus-hero-eyebrow flex items-center gap-2.5 text-[#586f4e] text-[13px] leading-[1.5] font-[650] tracking-[1.6px] mb-[23px] [&_>_span:first-child]:w-5.5 [&_>_span:first-child]:h-[1px] [&_>_span:first-child]:bg-[#ad8a4b] max-[700px]:text-[12px] max-[700px]:tracking-[1.2px] max-[700px]:mb-[19px] max-[370px]:text-[11px] motion-reduce:opacity-100 motion-reduce:[transform:none]",
  titleLine: "dgs-campus-hero-titleLine block overflow-clip pt-[.12em] pb-[.18em] mt-[-.12em] mb-[-.18em]",
  titleText: "dgs-campus-hero-titleText inline-block motion-reduce:opacity-100 motion-reduce:[transform:none] motion-reduce:[filter:none]",
  subLine: "dgs-campus-hero-subLine block overflow-clip pt-[.12em] pb-[.18em] mt-[-.12em] mb-[-.18em] font-serif font-semibold [font-variation-settings:'wght'_600,'opsz'_72] text-[clamp(36px,_4vw,_56px)] tracking-[-0.02em] leading-[1.22] [text-shadow:0_1px_0_#fbfaf4,0_8px_24px_#fbfaf4aa] min-[1650px]:text-[60px] max-[1150px]:text-[40px] max-[900px]:text-[36px] max-[700px]:text-[clamp(30px,_8vw,_42px)] max-[370px]:text-[30px]",
  description: "dgs-campus-hero-description mt-5.5 text-[#5c6d5b] text-[17px] leading-[1.85] max-[1150px]:text-[16px] max-[900px]:max-w-[330px] max-[700px]:text-[16px] max-[700px]:mt-4.5 max-[700px]:max-w-[355px] max-[370px]:text-[15px] motion-reduce:opacity-100 motion-reduce:[transform:none] motion-reduce:[filter:none]",
  recognition: "dgs-campus-hero-recognition mt-8 w-[378px] max-w-full max-[1150px]:w-[340px] max-[1150px]:mt-7 max-[700px]:w-[335px] max-[700px]:mt-6 max-[370px]:w-[315px] motion-reduce:opacity-100 motion-reduce:[transform:none] motion-reduce:[filter:none]",
  awardEyebrow: "dgs-campus-hero-awardEyebrow flex items-center gap-[9px] text-[12px] font-semibold tracking-[1.5px] text-[#647258] mb-[15px] [&_>_span]:text-[19px] [&_>_span]:leading-[1] [&_>_span]:text-[#7f6434] max-[700px]:text-[11px] max-[700px]:tracking-[1.2px] max-[700px]:mb-3",
  rankings: "dgs-campus-hero-rankings flex items-center justify-between gap-[9px]",
  laurel: "dgs-campus-hero-laurel flex-none w-7 h-25 text-[#d8ac53] max-[1150px]:w-[25px] max-[1150px]:h-[91px] max-[700px]:w-6 max-[700px]:h-[83px]",
  laurelRight: "dgs-campus-hero-laurelRight flex-none w-7 h-25 text-[#d8ac53] [transform:scaleX(-1)] max-[1150px]:w-[25px] max-[1150px]:h-[91px] max-[700px]:w-6 max-[700px]:h-[83px]",
  rank: "dgs-campus-hero-rank flex-1 text-center [&_>_span]:text-[14px] [&_>_span]:font-semibold [&_>_span]:tracking-[1.3px] [&_>_span]:text-[#344b39] [&_strong]:block [&_strong]:font-serif [&_strong]:font-normal [&_strong]:text-[72px] [&_strong]:leading-[1] [&_strong]:tracking-[-2px] [&_strong]:text-[#a34324] [&_strong_small]:text-[49px] [&_>_p]:text-[15px] [&_>_p]:leading-[1.5] [&_>_p]:text-[#40563f] [&_>_p]:mt-1 max-[1150px]:[&_strong]:text-[66px] max-[700px]:[&_strong]:text-[62px] max-[700px]:[&_strong_small]:text-[43px] max-[700px]:[&_>_span]:text-[13px] max-[700px]:[&_>_p]:text-[14px]",
  rankDivider: "dgs-campus-hero-rankDivider w-[1px] self-stretch mt-[7px] mr-[11px] mb-[7px] ml-[11px] bg-[#89917c66]",
  rankSource: "dgs-campus-hero-rankSource text-center text-[#626f58] text-[13px] tracking-[.1px] mt-[13px] [&_strong]:font-[550] max-[700px]:text-[12px] max-[700px]:mt-2.5",
  actions: "dgs-campus-hero-actions flex items-center gap-6.5 mt-7.5 max-[1150px]:gap-5 max-[1150px]:mt-6.5 max-[700px]:gap-[19px] max-[700px]:mt-[23px] max-[370px]:gap-[13px] motion-reduce:opacity-100 motion-reduce:[transform:none] motion-reduce:[filter:none]",
  enquireButton: "dgs-campus-hero-enquireButton dgs-btn-3d dgs-btn-3d-fill min-h-[49px] inline-flex justify-center items-center gap-[25px] bg-[var(--color-green)] text-[#fffcf0] rounded-[6px] pt-[13px] pr-[22px] pb-[13px] pl-[22px] text-[16px] font-semibold [&:hover]:bg-[#155441] [&_svg]:text-[#ebc77e] max-[1150px]:text-[15px] max-[1150px]:pl-[16px] max-[1150px]:pr-[16px] max-[1150px]:gap-[17px] max-[700px]:min-h-[47px] max-[700px]:pl-3.5 max-[700px]:pr-3.5 max-[700px]:text-[15px] max-[700px]:gap-3.5 max-[370px]:pl-3 max-[370px]:pr-3 max-[370px]:text-[14px] max-[370px]:gap-3",
  campusLink: "dgs-campus-hero-campusLink inline-flex gap-2.5 items-center text-[15px] font-semibold [border-bottom:1px_solid_#81927366] pt-2 pb-2 max-[700px]:text-[14px] max-[700px]:gap-[7px] max-[370px]:text-[13px]",
  familyNote: "dgs-campus-hero-familyNote mt-4 flex items-center gap-[7px] text-[13px] text-[#626c56] max-[700px]:text-[12px] max-[700px]:mt-3 motion-reduce:opacity-100 motion-reduce:[transform:none] motion-reduce:[filter:none]",
  facts: "dgs-campus-hero-facts bg-[#f5f3e9] [border-block:1px_solid_#dce1d0]",
  factsInner: "dgs-campus-hero-factsInner min-h-25.5 flex items-center justify-between gap-[25px] [&_>_p]:font-serif [&_>_p]:text-[19px] [&_>_p]:leading-[1.4] [&_>_p_em]:text-[#6b7456] [&_>_p_em]:text-[16px] max-[1150px]:gap-4.5 max-[1150px]:min-h-23.5 max-[1150px]:[&_>_p]:text-[16px] max-[1150px]:[&_>_p_em]:text-[17px] max-[900px]:[&_>_p]:hidden max-[900px]:justify-around max-[900px]:min-h-22.5 max-[700px]:min-h-24 max-[700px]:gap-2.5",
  fact: "dgs-campus-hero-fact flex items-center gap-[13px] pl-7.5 [border-left:1px_solid_#dadfcd] [&_>_svg]:w-[27px] [&_>_svg]:h-[27px] [&_>_svg]:stroke-[1.1] [&_>_svg]:text-[#7e8c68] [&_strong]:block [&_strong]:text-[17px] [&_strong]:font-[550] [&_span]:block [&_span]:mt-[5px] [&_span]:text-[13px] [&_span]:text-[#606b54] max-[1150px]:pl-5 max-[1150px]:gap-2.5 max-[1150px]:[&_strong]:text-[16px] max-[1150px]:[&_span]:text-[12px] max-[900px]:[&:first-of-type]:[border:0] max-[900px]:[&:first-of-type]:pl-0 max-[700px]:pl-3 max-[700px]:gap-[7px] max-[700px]:[&_>_svg]:w-5 max-[700px]:[&_>_svg]:h-5 max-[700px]:[&_>_svg]:hidden max-[700px]:[&_strong]:text-[14px] max-[700px]:[&_strong]:whitespace-nowrap max-[700px]:[&_span]:text-[11px] max-[700px]:[&_span]:leading-[1.5] max-[700px]:[&_span]:max-w-[100px] max-[700px]:[&_span]:mt-1 max-[370px]:pl-[9px] max-[370px]:gap-[5px] max-[370px]:[&_strong]:text-[13px] max-[370px]:[&_>_svg]:w-4.5",
  desktopBreak: "dgs-campus-hero-desktopBreak max-[900px]:hidden",
};

function Laurel({ right = false }: { right?: boolean }) {
  return <svg className={right ? ui.laurelRight : ui.laurel} viewBox="0 0 36 110" fill="none" aria-hidden="true">
    <path d="M31 104C9 85 4 58 13 31C16 21 22 12 28 5" stroke="currentColor" strokeWidth="1.4" />
    <g fill="currentColor">
      <ellipse cx="25" cy="15" rx="2.6" ry="7.2" transform="rotate(28 25 15)" />
      <ellipse cx="13" cy="27" rx="2.8" ry="7.8" transform="rotate(-21 13 27)" />
      <ellipse cx="21" cy="33" rx="2.8" ry="7.8" transform="rotate(50 21 33)" />
      <ellipse cx="7" cy="44" rx="2.8" ry="8" transform="rotate(-26 7 44)" />
      <ellipse cx="17" cy="49" rx="2.8" ry="8" transform="rotate(54 17 49)" />
      <ellipse cx="7" cy="63" rx="2.8" ry="8.2" transform="rotate(-35 7 63)" />
      <ellipse cx="18" cy="67" rx="2.8" ry="8.2" transform="rotate(45 18 67)" />
      <ellipse cx="12" cy="81" rx="2.8" ry="8.2" transform="rotate(-48 12 81)" />
      <ellipse cx="24" cy="83" rx="2.8" ry="8" transform="rotate(29 24 83)" />
      <ellipse cx="23" cy="97" rx="2.8" ry="7.7" transform="rotate(-54 23 97)" />
    </g>
  </svg>;
}

export default function CampusHero({ onEnquire }: { onEnquire: () => void }) {
  return <section className={ui.hero} aria-labelledby="hero-heading">
    <div className={ui.scene}>
      <Image className={ui.image} src="/images/hero-campus-dgs.jpeg" alt="Doon Global School campus building, with students on the drive and the Dehradun foothills behind" fill sizes="(max-width: 700px) 1000px, 100vw" quality={85} preload />
      <div className={ui.fade} />

      <div className={`dgs-container w-[calc(100%_-_128px)] max-w-[1280px] ml-auto mr-auto max-[1150px]:w-[calc(100%_-_80px)] max-[900px]:w-[calc(100%_-_56px)] max-[760px]:w-[calc(100%_-_40px)] max-[370px]:w-[calc(100%_-_32px)] ${ui.inner}`}>
        <div className={ui.copy}>
          <p className={ui.eyebrow}><span /><span className="inline-flex items-baseline gap-2 tracking-normal"><span lang="pa" className="font-punjabi text-[15px] font-semibold leading-none max-[700px]:text-[13px]">ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ</span><span aria-hidden="true" className="text-[#ad8a4b]">·</span><span className="tracking-[1.6px]">PUNJAB</span></span></p>
          <h1 id="hero-heading" data-no-split>
            <span className={ui.titleLine}><span className={ui.titleText}>Excellence. Growth.</span></span>
            <span className="sr-only">A brighter future.</span>
          </h1>
          <FlipCopy
            interval={5600}
            className="w-full"
            label="A brighter future. From Punjab to Dehradun. A CBSE boarding school where your child learns, belongs and becomes."
            frames={[
              <span className="block">
                <span className={`${ui.subLine} text-[#64754f]`}><em className={ui.titleText}>A brighter future.</em></span>
                <span className={`${ui.description} block`}>From Punjab to Dehradun. A CBSE boarding school where your child learns, belongs and becomes.<br className={ui.desktopBreak} /> <span lang="hi" className="font-hindi">घर से दूर, परिवार जैसा घर।</span></span>
              </span>,
              <span className="block">
                <span className={`${ui.subLine} font-punjabi tracking-normal text-[var(--color-green)]`} lang="pa"><span className={ui.titleText}>ਇੱਕ ਉਜਲਾ ਭਵਿੱਖ।</span></span>
                <span lang="pa" className={`${ui.description} font-punjabi block`}>ਪੰਜਾਬ ਤੋਂ ਦੇਹਰਾਦੂਨ। ਇੱਕ ਸੀ.ਬੀ.ਐਸ.ਈ. ਬੋਰਡਿੰਗ ਸਕੂਲ ਜਿੱਥੇ ਤੁਹਾਡਾ ਬੱਚਾ ਸਿੱਖਦਾ ਹੈ, ਵਿਚਰਦਾ ਹੈ ਤੇ ਵਿਕਸਿਤ ਹੁੰਦਾ ਹੈ।</span>
              </span>,
            ]}
          />

          <div className={ui.recognition} aria-label="EducationWorld School Rankings 2026–27: number 3 in Dehradun and number 4 in Uttarakhand">
            <p className={ui.awardEyebrow}><span aria-hidden="true">⟶</span> A PROUD MOMENT FOR DGS</p>
            <div className={ui.rankings}>
              <Laurel />
              <div className={ui.rank}><span>RANKED</span><strong><small>#</small>3</strong><p>in Dehradun</p></div>
              <div className={ui.rankDivider} />
              <div className={ui.rank}><span>RANKED</span><strong><small>#</small>4</strong><p>in Uttarakhand</p></div>
              <Laurel right />
            </div>
            <p className={ui.rankSource}>EducationWorld School Rankings <strong>2026–27</strong></p>
          </div>

          <div className={ui.actions}>
            <button className={ui.enquireButton} onClick={onEnquire} aria-haspopup="dialog">Enquire for 2027–28 <ArrowRight size={17} /></button>
            <a href="#why-dgs" className={ui.campusLink}>Discover DGS <ArrowUpRight size={17} /></a>
          </div>
          <p className={ui.familyNote}><ShieldCheck size={14} /> Boys’ boarding · Classes 3–12</p>
          <p className="mt-3 hidden items-center gap-2 text-[13px] text-[#626c56] max-[700px]:flex"><MapPin size={14} aria-hidden="true" /> Dehradun, Uttarakhand · <span lang="hi" className="font-hindi">एक सुंदर शहर</span></p>
        </div>

      </div>

      <div className="dgs-hero-roundel" aria-hidden="true">
        <svg viewBox="0 0 118 118" className="dgs-hero-roundel-spin">
          <defs>
            <path id="dgs-hero-roundel-path" d="M59,59 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text fill="#5d6248" fontSize="8.5" fontWeight="650" letterSpacing="2.2">
            <textPath href="#dgs-hero-roundel-path" textLength="276.5" lengthAdjust="spacing">PUNJAB DRIVE · LEARN · BELONG · BECOME ·</textPath>
          </text>
        </svg>
        <span className="dgs-hero-roundel-core">PUNJAB<br />DRIVE</span>
      </div>
    </div>

    <div className={ui.facts}><div className={`dgs-container w-[calc(100%_-_128px)] max-w-[1280px] ml-auto mr-auto max-[1150px]:w-[calc(100%_-_80px)] max-[900px]:w-[calc(100%_-_56px)] max-[760px]:w-[calc(100%_-_40px)] max-[370px]:w-[calc(100%_-_32px)] ${ui.factsInner}`}>
      <p>Rooted in values.<br /><em lang="hi" className="font-hindi">कल की ओर बढ़ते हुए।</em></p>
      <div className={ui.fact}><BookOpen /><div><strong>Since 1998</strong><span>A legacy of learning</span></div></div>
      <div className={ui.fact}><ShieldCheck /><div><strong>CBSE</strong><span>Affiliated curriculum · 28 years</span></div></div>
      <div className={ui.fact}><GraduationCap /><div><strong>Classes 3–12</strong><span>Boys’ boarding in Dehradun</span></div></div>
    </div></div>
  </section>;
}
