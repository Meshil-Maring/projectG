import { Award, Users, Trophy, MapPin, Medal } from "lucide-react";
import { PRIMARY, LIGHT_BG } from "./cwg.constants";
import CauseStats from "../cause/CauseStats";

const bottomStats = [
  { icon: Award, value: "8+", label: "Years of Excellence" },
  { icon: Users, value: "60+", label: "Active Members" },
  { icon: Trophy, value: "500+", label: "Competitions Joined" },
  { icon: MapPin, value: "15+", label: "Locations Reached" },
  { icon: Medal, value: "Countless", label: "Champions Shaped" },
];

export default function CwgStats() {
  return <CauseStats stats={bottomStats} primary={PRIMARY} lightBg={LIGHT_BG} />;
}
