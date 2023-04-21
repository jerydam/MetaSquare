'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';
import Link from "next/link";

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

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
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] mb-7 font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
         Welcome to <span className="font-extrabold text-white">MetaSquare</span> a decentralized event ticketing platform, where you can <span className="font-extrabold text-white">Buy</span> and <span className="font-extrabold text-white">
          Sell
        </span>{' '} tickets to your favorite events without intermediaries or third party interference, everything is handled by the smart contract. At MetaSquare, we believe that events go beyond the shows, it is a means for brands to connect 
        with their fans and followers. That's why we are making this connection even more memorable with our <span className="font-extrabold text-white">Met5G2</span> NFTs <span className="font-extrabold text-white">minted</span> to only fans that show up.{' '}
        
        <div className="w-full flex justify-center sm:-mt-[70px] mt-[50px] pr-[40px] relative z-10">
            <Link href="/docs">
              <button
                className="bg-[#6f71d4] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white font-semibold mt-4 mr-16 md:mt-8 ml-20 lg:mt-24 rounded-md py-5 px-8 text-lg lg:text-xl hover: hover:text-blue-200"
                type="submit"
              >
                Get started
              </button>
            </Link>
        </div>
               
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
