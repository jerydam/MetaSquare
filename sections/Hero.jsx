"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className="flex justify-center items-center flex-col relative z-10">
        <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
          Re-Imagine The Future of Events
        </motion.h1>
        <motion.div
          variants={textVariant(1.2)}
          className="flex flex-row justify-center items-center"
        >
          <h4 className={styles.herobasing}>
            {/* Revolutionize Your Event Experience with Meta Square. */}
          </h4>
        </motion.div>
      </div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="relative w-full md:-mt-[20px] -mt-[12px]"
      >
        {/* <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" /> */}

        <img
          src="/big.jpg"
          alt="hero_cover"
          className="w-3/4 sm:h-[500px] h-[350px] m-auto object-cover rounded-[20px] z-10 relative"
        />

        <a href="#">
          <div className="w-full flex justify-center sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10">
            <Link href="/createvent">
              <button
                className="bg-[#6f71d4] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white font-semibold mt-4 md:mt-8 lg:mt-10 rounded-md py-5 px-8 text-lg lg:text-xl hover: hover:text-blue-200"
                type="submit"
              >
                Create Event
              </button>
            </Link>
          </div>
        </a>
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
