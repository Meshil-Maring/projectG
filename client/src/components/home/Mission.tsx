import familyImg from "../../assets/image/family.jpeg";
import {
  Users,
  BookOpen,
  HeartPulse,
  Briefcase,
  Heart,
  HandHelping,
  Gift,
  Share2,
  ChevronRight,
} from "lucide-react";

const pillars = [
  { icon: Users, label: "Support\nFamilies" },
  { icon: BookOpen, label: "Educate\nChildren" },
  { icon: HeartPulse, label: "Provide\nHealthcare" },
  { icon: Briefcase, label: "Create\nOpportunities" },
];

const helpItems = [
  {
    icon: Heart,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    title: "Donate",
    desc: "Your contribution helps us change lives.",
  },
  {
    icon: HandHelping,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Volunteer",
    desc: "Give your time and inspire others.",
  },
  {
    icon: Gift,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Fundraise",
    desc: "Start a fundraiser and spread the word.",
  },
  {
    icon: Share2,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Share",
    desc: "Share our mission with your network.",
  },
];

export default function Mission() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* ── Our Mission ── */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden p-6">
          {/* Family image */}
          <div className="shrink-0 w-full lg:w-56 xl:w-64 rounded-xl overflow-hidden">
            <img
              src={familyImg}
              alt="Family silhouette"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text + pillars */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f97316] mb-2">
                Our Mission
              </p>
              <h2 className="text-2xl xl:text-3xl font-bold text-[#1e293b] leading-snug mb-3">
                Empowering Lives,
                <br />
                Building Better Future
              </h2>
              <p className="text-sm text-body leading-relaxed max-w-sm">
                We work for the upliftment of underprivileged communities by
                providing education, healthcare, food and a safe environment.
              </p>
            </div>

            {/* Pillars */}
            <div className="flex flex-wrap gap-4">
              {pillars.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 w-16 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#f97316] flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-xs text-[#475569] font-medium leading-tight whitespace-pre-line">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── How You Can Help ── */}
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1e293b]">
            How You Can Help
          </p>
          {helpItems.map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-4 bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center shrink-0`}
              >
                <Icon size={18} className={iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1e293b] text-sm">{title}</p>
                <p className="text-xs text-[#475569] leading-snug">{desc}</p>
              </div>
              <ChevronRight
                size={16}
                className="text-[#94a3b8] flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
