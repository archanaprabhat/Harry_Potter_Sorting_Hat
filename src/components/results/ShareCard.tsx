// src/components/results/ShareCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { HOUSES } from "@/lib/quiz-data";
import { getHouseInfo } from "@/lib/sorting-logic";

interface ShareCardProps {
    house: keyof typeof HOUSES;
    userName: string;
}

export default function ShareCard({ house, userName }: ShareCardProps) {
    const houseInfo = getHouseInfo(house);
    const logoPath = `/images/${house}_logo.png`;

    return (
        <div
            id="share-card"
            className="w-[600px] h-[800px] relative flex flex-col items-center justify-center overflow-hidden p-12"
            style={{
                background: `linear-gradient(135deg, ${houseInfo.colors[0]}, ${houseInfo.colors[1]})`,
            }}
        >
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Border */}
            <div className="absolute inset-8 border-4 border-white/30 rounded-3xl" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-8">

                {/* Header */}
                <div className="space-y-2">
                    <p className="text-white/80 font-serif text-xl italic tracking-wider">
                        The Sorting Hat has spoken
                    </p>
                    <h1 className="text-4xl font-bold text-white font-serif drop-shadow-lg">
                        {userName}
                    </h1>
                </div>

                {/* House Crest */}
                <div className="relative w-64 h-64 drop-shadow-2xl">
                    <Image
                        src={logoPath}
                        alt={`${houseInfo.name} crest`}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* House Name */}
                <div className="space-y-4">
                    <p className="text-white/90 font-serif text-2xl">
                        belongs to
                    </p>
                    <h2 className="text-6xl font-bold text-white font-serif tracking-widest uppercase drop-shadow-xl">
                        {houseInfo.name}
                    </h2>
                </div>

                {/* Traits */}
                <div className="flex gap-4 pt-4">
                    {houseInfo.traits.slice(0, 3).map((trait) => (
                        <span
                            key={trait}
                            className="px-7 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium border border-white/30"
                        >
                            {trait}
                        </span>
                    ))}
                </div>

            </div>

            {/* Footer */}
            <div className="absolute bottom-12 z-10 text-white/60 font-serif text-sm">
                harry-potter-sorting-hat.vercel.app
            </div>
        </div>
    );
}
