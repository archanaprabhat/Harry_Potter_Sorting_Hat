"use client";

import { motion } from "framer-motion";
import { getHouseInfo } from "@/lib/sorting-logic";
import { HOUSES } from "@/lib/quiz-data";

export default function HouseInfo({ house }: { house: keyof typeof HOUSES }) {
    const houseInfo = getHouseInfo(house);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mb-6"
        >
            {/* House name with magical styling */}
            <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-2 font-serif"
                style={{
                    background: `linear-gradient(135deg, ${houseInfo.colors[0]}, ${houseInfo.colors[1]})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: `0 0 20px ${houseInfo.colors[1]}40`
                }}
                animate={{
                    textShadow: [
                        `0 0 20px ${houseInfo.colors[1]}40`,
                        `0 0 30px ${houseInfo.colors[1]}60`,
                        `0 0 20px ${houseInfo.colors[1]}40`
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {houseInfo.name}
            </motion.h1>

            {/* House description */}
            <motion.p
                className="text-amber-100 text-sm sm:text-base mb-4 px-4 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
            >
                {houseInfo.description}
            </motion.p>

            {/* House traits */}
            <motion.div
                className="flex flex-wrap justify-center gap-2 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
            >
                {houseInfo.traits.map((trait, index) => (
                    <motion.span
                        key={trait}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                            background: `linear-gradient(135deg, ${houseInfo.colors[0]}80, ${houseInfo.colors[1]}80)`,
                            color: 'white',
                            border: `1px solid ${houseInfo.colors[1]}`
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                    >
                        {trait}
                    </motion.span>
                ))}
            </motion.div>

            {/* House details */}
            <motion.div
                className="flex justify-evenly gap-4 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
            >
                <div className="text-center">
                    <p className="text-amber-300 font-semibold">Founder</p>
                    <p className="text-amber-100">{houseInfo.founder}</p>
                </div>
                <div className="text-center">
                    <p className="text-amber-300 font-semibold">Element</p>
                    <p className="text-amber-100">{houseInfo.element}</p>
                </div>
                <div className="text-center">
                    <p className="text-amber-300 font-semibold">Animal</p>
                    <p className="text-amber-100">{houseInfo.animal}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}
