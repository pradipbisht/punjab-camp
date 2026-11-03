import { ADMISSION_CITY_LABEL, DRIVE_CITIES } from "@/shared/lib/enquiry";
import MaskedHeading from "./masked-heading";
import map from "../data/punjab-map.json";

const ui: Record<string, string> = {
  section: "region-section overflow-hidden bg-[#eef1e6] pt-16 pb-16 [border-block:1px_solid_#d5dbc6] max-[760px]:pt-11 max-[760px]:pb-11",
  title: "mb-10 max-w-[920px] max-[900px]:mb-8 max-[760px]:mb-6",
  inner: "region-inner grid grid-cols-[1.18fr_.82fr] items-center gap-12 max-[1150px]:gap-8 max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[760px]:gap-8",
  art: "region-art relative h-[400px] overflow-hidden rounded-[12px] bg-[#f7f6ee] shadow-[inset_0_0_0_1px_#cfd6c2] max-[1150px]:h-[360px] max-[900px]:h-[320px] max-[760px]:h-[280px] max-[760px]:w-full",
  map: "absolute inset-0 h-full w-full",
  copy: "[&>p]:max-w-[520px] [&>p]:text-[16px] [&>p]:leading-[1.75] [&>p]:text-[#5c6754]",
  eyebrow: "eyebrow mb-[19px] flex items-center gap-2.5 text-[14px] font-[650] leading-[1.5] tracking-[1.9px] text-[#5a6750] [&_>span:first-child]:inline-block [&_>span:first-child]:h-px [&_>span:first-child]:w-5.5 [&_>span:first-child]:bg-[#ad864b] max-[760px]:mb-[17px] max-[760px]:text-[12px] max-[760px]:tracking-[1.6px]",
  steps: "mt-7 grid gap-0",
  step: "relative grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-3.5 pb-5 last:pb-0",
  index: "relative z-1 grid size-8 place-items-center rounded-full border border-[#c3ccb0] bg-[#f4f6ec] font-serif text-[14px] text-[#4f6640]",
  rail: "absolute left-[15px] top-8 bottom-0 w-px bg-[#c9d2b8]",
  stepTitle: "pt-1 font-serif text-[20px] leading-[1.2] tracking-[-.2px] text-[#24392c] max-[760px]:text-[19px]",
  stepCopy: "mt-1 text-[14px] leading-[1.65] text-[#616c56]",
  cities: "mt-6 flex flex-wrap gap-2",
  city: "rounded-full border border-[#c3ccb0] bg-[#f4f6ec] px-3 py-1.5 text-[12px] font-semibold tracking-[.4px] text-[#3f5338]",
};

const stages = [
  { title: "Punjab", copy: "A state, not a pin on a map — the journey begins in your city, in your language." },
  { title: "The road east", copy: "One clear corridor from the Punjab plains into Uttarakhand, a few hours to the Doon valley." },
  { title: "Dehradun", copy: "A city in Uttarakhand. Chakrata Road. A boarding campus among the trees." },
];

const trunk = `M${map.hub.x} ${map.hub.y} C ${map.hub.x + 52} ${map.hub.y + 8}, ${map.dehradun.x - 48} ${map.dehradun.y - 18}, ${map.dehradun.x} ${map.dehradun.y}`;

export default function JourneySection() {
  return (
    <section className={ui.section} aria-labelledby="journey-heading">
      <div className="dgs-container w-[calc(100%_-_128px)] max-w-[1280px] ml-auto mr-auto max-[1150px]:w-[calc(100%_-_80px)] max-[900px]:w-[calc(100%_-_56px)] max-[760px]:w-[calc(100%_-_40px)] max-[370px]:w-[calc(100%_-_32px)]">
        <div className={ui.title} data-reveal data-no-split>
          <p className={ui.eyebrow}><span />DIFFERENT PLACES. ONE SHARED DREAM.</p>
          <MaskedHeading
            id="journey-heading"
            text="Punjab to Dehradun"
            tag="h2"
            mediaType="video"
            src="/videos/punjab-football.mp4?v=10"
            poster="/images/punjab-football-poster.webp"
            fillScale={1.3}
            parallax={34}
            reveal="scale"
            trigger="view"
            spotlight
            spotlightRadius={180}
            outline
            outlineColor="#173f32"
            hoverZoom={0.1}
            align="left"
            weight={700}
            tracking={-0.03}
            lineHeight={1.06}
            textScale={0.115}
            className="font-serif text-[#163f33]"
          />
        </div>
        <div className={ui.inner}>
        <div className={ui.art} aria-hidden="true" data-reveal>
          <svg className={ui.map} viewBox="0 0 720 400" fill="none">
            <defs>
              <linearGradient id="journey-panel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f4f3ea" />
                <stop offset="1" stopColor="#e9eee0" />
              </linearGradient>
              <linearGradient id="journey-gold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#c4a45a" />
                <stop offset="1" stopColor="#8f6e32" />
              </linearGradient>
            </defs>
            <rect width="720" height="400" fill="url(#journey-panel)" />

            <g fill="#d5dec6" stroke="#d5dec6" strokeWidth="2.2" strokeLinejoin="round">
              {map.punjab.map((d, i) => <path key={`pb-${i}`} d={d} />)}
            </g>
            <g fill="#c9ddd2" stroke="#c9ddd2" strokeWidth="2.2" strokeLinejoin="round">
              {map.uk.map((d, i) => <path key={`uk-${i}`} d={d} />)}
            </g>

            <text x="148" y="208" fill="#5d6b52" fontSize="11" fontWeight="700" letterSpacing="2.4">PUNJAB</text>
            <text x="148" y="224" fill="#7a866c" fontSize="9" letterSpacing="1.2">STATE</text>
            <text x="508" y="168" fill="#4f6758" fontSize="11" fontWeight="700" letterSpacing="2.2">UTTARAKHAND</text>
            <text x="508" y="184" fill="#7a866c" fontSize="9" letterSpacing="1.2">STATE</text>

            {map.cities.map(city => (
              <line key={`spoke-${city.name}`} x1={city.x} y1={city.y} x2={map.hub.x} y2={map.hub.y} stroke="#b7c3a4" strokeWidth="1" strokeLinecap="round" />
            ))}

            <path className="route-shadow" d={trunk} stroke="#b7c39f" strokeWidth="16" opacity=".2" fill="none" strokeLinecap="round" />
            <path d={trunk} stroke="#d8c48a" strokeWidth="7" opacity=".38" fill="none" strokeLinecap="round" />
            <path d={trunk} stroke="url(#journey-gold)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="7 11" fill="none" className="motion-safe:animate-journey-dash motion-reduce:animate-none" />

            {map.cities.map(city => (
              <g key={city.name}>
                <circle cx={city.x} cy={city.y} r="3.2" fill="#073c32" stroke="#f7f6ee" strokeWidth="1.4" />
                {city.label ? (
                  <text x={city.x} y={city.y + (city.name === "Bathinda" || city.name === "Ludhiana" ? 16 : -10)} textAnchor="middle" fill="#24392c" fontSize="9" fontWeight="650" letterSpacing=".4">{city.name}</text>
                ) : null}
              </g>
            ))}

            <circle cx={map.hub.x} cy={map.hub.y} r="3.6" fill="#edbe66" stroke="#073c32" strokeWidth="1.4" />

            <g>
              <circle cx={map.dehradun.x} cy={map.dehradun.y} r="8" fill="#073c32" stroke="#f7f6ee" strokeWidth="2.4" />
              <circle cx={map.dehradun.x} cy={map.dehradun.y} r="2.6" fill="#edbe66" />
              <text x={map.dehradun.x} y={map.dehradun.y + 22} textAnchor="middle" fill="#24392c" fontSize="11" fontWeight="700" letterSpacing="1.4">DEHRADUN</text>
              <text x={map.dehradun.x} y={map.dehradun.y + 36} textAnchor="middle" fill="#6a755c" fontSize="9" letterSpacing=".5">city · campus</text>
            </g>
          </svg>
        </div>

        <div className={ui.copy} data-reveal data-reveal-delay="1">
          <p>Your roots stay with you. <em lang="hi" className="font-hindi not-italic text-[#697550]">दुनिया और बड़ी हो जाती है।</em> For families from {ADMISSION_CITY_LABEL} — a clear road from the state of Punjab to a boarding campus in Dehradun, Uttarakhand.</p>
          <ol className={ui.steps}>
            {stages.map((stage, index) => (
              <li key={stage.title} className={`group/step ${ui.step}`}>
                <span className={ui.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {index < stages.length - 1 && <i className={ui.rail} aria-hidden="true" />}
                <div>
                  <strong className={ui.stepTitle}>{stage.title}</strong>
                  <p className={ui.stepCopy}>{stage.copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={ui.cities} aria-label="Admission drive cities">
            {DRIVE_CITIES.map(city => <span key={city} className={ui.city}>{city}</span>)}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
