"use client";

import { motion } from "framer-motion";
import { TypingText } from "../components";
import Link from "next/link";

import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About MetaSquare" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Welcome to <span className="font-extrabold text-white">MetaSquare</span>
        a decentralized event ticketing platform, where you can{" "}
        <span className="font-extrabold text-white">Buy</span> and{" "}
        <span className="font-extrabold text-white">Sell</span> tickets to your
        favorite events without intermediaries or centralized authorities. At
        our platform, we believe that event ticketing should be transparent,
        secure, and accessible to everyone, regardless of their location or
        financial status.{" "}
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
