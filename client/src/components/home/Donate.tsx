import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import donateImg from "../../assets/image/donate.png";

export default function Donate() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image */}
          <div className="flex-shrink-0 w-full lg:w-[380px] flex justify-center">
            <img
              src={donateImg}
              alt="Donate and make a difference"
              className="w-full max-w-[340px] lg:max-w-none object-contain"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--color-purple)] mb-3">
              Make a Difference
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[color:var(--color-heading)] leading-tight mb-4">
              Your Support Can <br className="hidden sm:block" />
              Change Someone's Life
            </h2>
            <p className="text-[color:var(--color-body)] text-base leading-relaxed mb-8 max-w-md">
              Every contribution, no matter how small, brings hope and creates a
              lasting impact for children, families and communities.
            </p>

            <Link
              to="/donate"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-base hover:bg-purple-700 transition-colors duration-200 shadow-lg"
            >
              Donate Now
              <Heart size={18} className="fill-white" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
