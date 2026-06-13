import { Heart, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import donateImg from "../../../assets/image/donate.png";

const trustSignals = [
  { icon: ShieldCheck, label: "100% Secure Payments" },
  { icon: BadgeCheck, label: "Registered NGO" },
  { icon: Lock, label: "Tax-Deductible (80G)" },
];

export default function Donate() {
  return (
    <section className="py-20 bg-linear-to-br from-purple-light/10 via-white to-purple/5">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 rounded-3xl border border-purple-light/30 bg-white px-6 sm:px-10 py-12 lg:py-14"
          style={{ boxShadow: "var(--shadow-donate)" }}
        >

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="shrink-0 w-full lg:w-95 flex justify-center"
          >
            <img
              src={donateImg}
              alt="Donate and make a difference"
              className="w-full max-w-85 lg:max-w-none object-contain"
            />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.1 }}
              className="text-sm font-semibold uppercase tracking-widest text-purple mb-3"
            >
              Make a Difference
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" as const, delay: 0.18 }}
              className="text-3xl lg:text-4xl font-bold text-heading leading-tight mb-4"
            >
              Your Support Can <br className="hidden sm:block" />
              Change Someone's Life
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.26 }}
              className="text-body text-base leading-relaxed mb-8 max-w-md"
            >
              Every contribution, no matter how small, brings hope and creates a
              lasting impact for children, families and communities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.34 }}
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-purple text-white font-semibold text-base hover:bg-purple-dark transition-colors duration-200 shadow-lg"
                >
                  Donate Now
                  <Heart size={18} className="fill-white" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.42 }}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-6"
            >
              {trustSignals.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted"
                >
                  <Icon size={15} className="text-purple" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
