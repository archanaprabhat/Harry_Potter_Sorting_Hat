"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getHouseInfo } from "@/lib/sorting-logic";
import { HOUSES } from "@/lib/quiz-data";

export default function HouseCrest({ house }: { house: keyof typeof HOUSES }) {
    const houseInfo = getHouseInfo(house);
    const logoPath = `/images/${house}_logo.png`;

    return (
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.5
            }}
            className="relative flex justify-center mb-4 "
        >
            {/* Glowing background effect */}
            <motion.div
                className="absolute inset-0 rounded-full "
                style={{
                    background: `radial-gradient(circle, ${houseInfo.colors[0]}40 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                    transform: 'scale(1.5)'
                }}
                animate={{
                    scale: [1.5, 1.8, 1.5],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* House logo */}
            <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.10 }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    src={logoPath}
                    alt={`${houseInfo.name} crest`}
                    width={320}
                    height={320}
                    className="drop-shadow-2xl"
                />
            </motion.div>

            {/* Floating particles around the crest */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full "
                    style={{
                        background: houseInfo.colors[1],
                        left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 80}%`,
                        top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 80}%`,
                    }}
                    animate={{
                        scale: [0.5, 1, 0.5],
                        opacity: [0.3, 0.8, 0.3],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </motion.div>
    );
}
