/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import styles from "../styles";
import { navVariants } from "../utils/motion";
import Connect from "./Connect";

const Navbar = () => (
    
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
      <motion.nav
  variants={navVariants}
  initial="hidden"
  whileInView="show"
  className={`${styles.xPaddings} py-8 relative`}
>
  <div className="flex flex-wrap items-center justify-between">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/">
          <span className="font-bold text-xl text-[#fff] tracking-tight ml-2">
            <span className="text-5xl text-red">.</span>METASQUARE
          </span>
        </a>
    </div>

    <div className="w-full block flex-grow ml-[300px] lg:flex lg:items-center lg:w-auto">
      <div className="text-md lg:flex-grow">
        <a
          href="/events"
          className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 font-bold hover:text-white mr-10"
        >
          Events
        </a>
        <a
          href="#responsive-header"
          className="block mt-4 lg:inline-block mr-10 font-bold lg:mt-0 text-gray-500 hover:text-white"
        >
          Devs
        </a>
        <a
          href="https://dads-organization.gitbook.io/untitled/"
          className="block mt-4 lg:inline-block mr-10 font-bold lg:mt-0 text-gray-500 hover:text-white"
        >
          Docs
        </a>
       
      </div>

      <div className="ml-auto">
        <Connect />
      </div>
    </div>
  </div>
</motion.nav>

  </motion.nav>
);
export default Navbar;
