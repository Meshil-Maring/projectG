import handImg from "../../assets/image/hand.png";
import { Heart, BookOpen, Users, Handshake } from "lucide-react";

const pillars = [
  { icon: Heart, label: "Make\nImpact" },
  { icon: BookOpen, label: "Learn &\nGrow" },
  { icon: Users, label: "Inspire\nOthers" },
  { icon: Handshake, label: "Build Strong\nCommunities" },
];

export default function Volunteer() {
  return (
    <section className="py-14 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">

        {/* Left — text block */}
        <div className="flex-shrink-0 max-w-xs">
          <p className="text-xs font-bold uppercase tracking-widest text-[#e63975] mb-3">
            Join Our Mission
          </p>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-[#1a1a4b] leading-tight mb-4">
            Be A Volunteer,<br />Be The Change
          </h2>
          <p className="text-sm text-[#64748b] leading-relaxed mb-7">
            Join our team of passionate volunteers and help us create a better
            tomorrow for all.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#e63975] hover:bg-[#c72d60] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-200"
          >
            Join Us Today <span aria-hidden>→</span>
          </a>
        </div>

        {/* Center — pillar icons */}
        <div className="flex flex-wrap justify-center gap-6 flex-1">
          {pillars.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 w-24 text-center">
              <div className="w-16 h-16 rounded-full bg-[#fce7ef] flex items-center justify-center shadow-sm">
                <Icon size={26} className="text-[#e63975]" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-[#1a1a4b] leading-tight whitespace-pre-line">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Right — watercolor hand image */}
        <div className="flex-shrink-0 w-64 h-48 xl:w-80 xl:h-60 relative">
          <img
            src={handImg}
            alt="Volunteers raising hands together"
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </section>
  );
}
