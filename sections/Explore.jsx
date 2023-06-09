"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import styles from "../styles";
import { exploreEvents } from "../constants";
import { staggerContainer } from "../utils/motion";
import { ExploreCard, TitleText, TypingText } from "../components";

const Explore = () => {
  const [active, setActive] = useState("world-2");

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Upcoming Events" textStyles="text-center" />
        <TitleText
          title={
            <>
              <Link href="/events">
                Available Event <br className="md:block hidden" /> to explore
              </Link>
            </>
          }
          textStyles="text-center"
        />
        {/* <Link href="/events">VIEW EVENTS</Link> */}
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[60vh] gap-3">
          {exploreEvents.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
