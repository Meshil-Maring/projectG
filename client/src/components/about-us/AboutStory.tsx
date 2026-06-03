import { motion } from "framer-motion";
import familyImg from "../../assets/image/family.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" },
  }),
};

export default function AboutStory() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="shrink-0 w-full lg:w-[420px] rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src={familyImg}
            alt="Project Generation community"
            className="w-full h-72 lg:h-96 object-cover"
          />
        </motion.div>

        <div className="flex-1">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-sm font-semibold uppercase tracking-widest text-[#f97316] mb-2"
          >
            Our Story
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-2xl xl:text-3xl font-bold text-[#1e293b] leading-snug mb-4"
          >
            Born from a Community's Need,
            <br />
            Driven by Compassion
          </motion.h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="space-y-4 text-sm text-[#475569] leading-relaxed"
          >
            <p>
              Project Generation began with a simple belief — that every child,
              regardless of where they are born, deserves access to education,
              healthcare, and a dignified life. Founded in Manipur, India, our
              organisation grew out of grassroots conversations with families
              who needed a helping hand, not just a handout.
            </p>
            <p>
              Over the years, we have expanded our reach across communities,
              running programmes in education support, health camps, skills
              development, and women empowerment. Today, we are proud to have
              touched over 25,000 lives — and we are just getting started.
            </p>
            <p>
              Our name,{" "}
              <strong className="text-[#1a3270]">Project Generation</strong>,
              reflects our long-term vision: to build a generation of empowered
              individuals who will in turn lift up their own communities for
              years to come.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
