import { Award, Users, Briefcase, Handshake, Home } from "lucide-react";
import { PRIMARY, LIGHT_BG } from "./fseds.constants";
import CauseStats from "../cause/CauseStats";

const bottomStats = [
  { icon: Award, value: "8+", label: "Years of Impact" },
  { icon: Users, value: "50+", label: "Active Volunteers" },
  { icon: Briefcase, value: "80+", label: "Projects Implemented" },
  { icon: Handshake, value: "15+", label: "Partner Organizations" },
  { icon: Home, value: "Countless", label: "Communities Transformed" },
];

export default function FsedsStats() {
  return <CauseStats stats={bottomStats} primary={PRIMARY} lightBg={LIGHT_BG} />;
}
