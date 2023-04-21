"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import styles from "../styles";
import { navVariants } from "../utils/motion";
import Connect from "./Connect";

const Navbar = () => (
  <>
    <Link href="/events">
      <button type="submit">View Events</button>
    </Link>

    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
      >
        <a
          href="/"
          className="font-extrabold text-[24px] leading-[30.24px] text-white"
        >
          METASQUARE
        </a>

        <Connect />
      </div>
    </motion.nav>
  </>
);
export default Navbar;
