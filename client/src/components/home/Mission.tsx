import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

async function handleShare(setCopied: (v: boolean) => void) {
  const shareData = {
    title: "Help Us Change Lives",
    text: "Join our mission to support families, educate children, and build better communities.",
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // user cancelled — no-op
    }
  } else {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
}

const helpItems = [
  {
    icon: Heart,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    title: "Donate",
    desc: "Your contribution helps us change lives.",
    route: "/donate",
    sectionId: null,
  },
  {
    icon: HandHelping,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Volunteer",
    desc: "Give your time and inspire others.",
    route: null,
    sectionId: "get-involved",
  },
  {
    icon: Gift,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Fundraise",
    desc: "Start a fundraiser and spread the word.",
    route: null,
    sectionId: "causes",
  },
  {
    icon: Share2,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Share",
    desc: "Share our mission with your network.",
    route: null,
    sectionId: null,
  },
];

export default function Mission() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

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
          {helpItems.map(({ icon: Icon, iconBg, iconColor, title, desc, route, sectionId }) => (
            <button
              key={title}
              type="button"
              onClick={() =>
                route
                  ? navigate(route)
                  : sectionId
                  ? scrollToSection(sectionId)
                  : handleShare(setCopied)
              }
              className="flex items-center gap-4 bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow text-left w-full"
            >
              <div
                className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center shrink-0`}
              >
                <Icon size={18} className={iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1e293b] text-sm">{title}</p>
                <p className="text-xs text-[#475569] leading-snug">
                  {title === "Share" && copied ? "Link copied!" : desc}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="text-[#94a3b8] flex-shrink-0"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
