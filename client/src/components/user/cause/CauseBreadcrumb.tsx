import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { fade } from "./cause.constants";

interface Props {
  currentLabel: string;
  primary: string;
}

export default function CauseBreadcrumb({ currentLabel, primary }: Props) {
  return (
    <motion.div
      {...fade(0)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        fontSize: "0.78rem",
        color: "#64748b",
        marginBottom: "1.5rem",
      }}
    >
      <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>
        Home
      </Link>
      <ChevronRight size={13} />
      <Link to="/#groups" style={{ color: "#64748b", textDecoration: "none" }}>
        Our Communities
      </Link>
      <ChevronRight size={13} />
      <span style={{ color: primary, fontWeight: 600 }}>{currentLabel}</span>
    </motion.div>
  );
}
