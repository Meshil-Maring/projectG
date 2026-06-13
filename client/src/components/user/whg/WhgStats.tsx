import { Clock, Users, Building, Handshake, Heart } from "lucide-react";
import { PRIMARY, LIGHT_BG } from "./whg.constants";
import CauseStats from "../cause/CauseStats";

const bottomStats = [
  { icon: Clock, value: "8+", label: "Years of Service" },
  { icon: Users, value: "50+", label: "Active Volunteers" },
  { icon: Building, value: "80+", label: "Projects Completed" },
  { icon: Handshake, value: "15+", label: "Partner Organizations" },
  { icon: Heart, value: "Countless", label: "Smiles" },
];

export default function WhgStats() {
  return <CauseStats stats={bottomStats} primary={PRIMARY} lightBg={LIGHT_BG} />;
}
