import { Award, Users, Target, MapPin, Heart } from "lucide-react";
import { PRIMARY, LIGHT_BG } from "./hrds.constants";
import CauseStats from "../cause/CauseStats";

const bottomStats = [
  { icon: Award, value: "10+", label: "Years of Service" },
  { icon: Users, value: "50+", label: "Active Volunteers" },
  { icon: Target, value: "70+", label: "Projects Completed" },
  { icon: MapPin, value: "20+", label: "Locations Reached" },
  { icon: Heart, value: "Countless", label: "Lives Transformed" },
];

export default function HrdsStats() {
  return <CauseStats stats={bottomStats} primary={PRIMARY} lightBg={LIGHT_BG} />;
}
