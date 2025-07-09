'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const VisionMissionSection = () => {
return (
    <section className="relative py-8 px-3 md:py-2 md:px-20 text-white font-sans overflow-hidden">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-bold">
                Vision <span className="text-sky-400">&</span> Mission
            </h2>
        </div>

        {/* Bubbles Layout */}
        <div className="relative flex flex-col md:flex-row items-center justify-center min-h-[500px] gap-8 md:gap-0">
            {/* Vision Bubble */}
            <div
                className="relative md:mr-[-27px] md:w-[48%] w-full rounded-[30px] p-5 md:p-8 text-base md:text-2xl leading-relaxed md:leading-loose shadow-lg md:mt-[-400px]"
                style={{ minHeight: '220px', borderRadius: '30px', background: 'linear-gradient(110.61deg, rgba(44, 127, 152, 0.87) 23.77%, rgba(30, 115, 142, 0.87) 83.65%)' }}
            >
                <span className="block text-left whitespace-pre-line">
                    To become the leading AI driven engagement platform that
                    redefines digital networking,
                    enabling every professional to build authentic relationships
                    and grow their business through intelligent conversation.
                </span>

                {/* Tail for Vision Bubble */}
                <div className="hidden md:block absolute bottom-[-40px] right-8 w-0 h-0"
                    style={{
                        borderTop: '40px solid',
                        borderTopColor: 'rgba(44, 127, 152, 0.87)',
                        borderLeft: '40px solid transparent',
                    }}
                ></div>

                {/* Bot Bottom Left (Vision) - Pentagon Path */}
                <motion.div
                    className="hidden md:block absolute left-[0px] bottom-[-270px] z-20"
                    animate={{
                        x: [0, 100, 180, 90, -20, 0],
                        y: [0, -100, -40, 70, 40, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <Image src="/images/chatBotIcon.svg" alt="Bot" width={140} height={140} />
                </motion.div>
            </div>

            {/* Mission Bubble */}
            <div
                className="relative md:ml-[-38px] md:w-[48%] w-full rounded-[30px] p-5 md:p-8 text-base md:text-2xl leading-relaxed md:leading-loose shadow-lg mt-6 md:mt-[500px]"
                style={{ minHeight: '220px', borderRadius: '30px', background: 'linear-gradient(110.61deg, rgba(44, 127, 152, 0.87) 23.77%, rgba(30, 115, 142, 0.87) 83.65%)' }}
            >
                <span className="block text-left whitespace-pre-line">
                    To empower business owners,
                    marketers, and professionals with innovative tools that turn online engagement into real world opportunities by simplifying, personalizing, and scaling meaningful interactions.
                </span>

                {/* Tail for Mission Bubble */}
                <div className="hidden md:block absolute -top-10 left-8 w-0 h-0"
                    style={{
                        borderBottom: '40px solid',
                        borderBottomColor: 'rgba(44, 127, 152, 0.87)',
                        borderRight: '40px solid transparent',
                    }}
                ></div>

                {/* Bot Top Right (Mission) - Pentagon Path */}
                <motion.div
                    className="hidden md:block absolute right-[0px] top-[-220px] z-20"
                    animate={{
                        x: [0, -100, -180, -90, 20, 0],
                        y: [0, 100, 40, -70, -40, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <Image src="/images/chatBotIcon.svg" alt="Bot" width={140} height={140} />
                </motion.div>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-1 mt-16 md:mt-32 items-start">
            {/* Left Column */}
            <div>
                <h3 className="text-2xl md:text-5xl font-bold leading-snug mb-4 md:mb-0">
                    Revolutionizing <br className="hidden md:block" /> Conversations One <br className="hidden md:block" /> Comment at a Time
                </h3>
            </div>

            {/* Right Column */}
            <div className="border-l-0 md:border-l border-white pl-0 md:pl-16 text-base md:text-2xl font-light leading-relaxed">
                At <span className="font-bold">Comments Fusion</span>, we believe real growth starts with real conversations.
                Built for professionals, marketers, and relationship driven teams, our Chrome and Edge extension empowers you
                to effortlessly comment, connect, and convert right inside LinkedIn.
            </div>
        </div>
    </section>
);
};

export default VisionMissionSection;
