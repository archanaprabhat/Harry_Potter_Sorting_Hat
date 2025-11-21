import { Metadata } from "next";
import Link from "next/link";
import HouseCrest from "@/components/results/HouseCrest";
import HouseInfo from "@/components/results/HouseInfo";
import Button from "@/components/ui/Button";
import StarField from "@/components/effects/StarField";
import { HOUSES } from "@/lib/quiz-data";
import { getHouseInfo } from "@/lib/sorting-logic";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { searchParams }: Props
): Promise<Metadata> {
    const params = await searchParams;
    const house = typeof params.house === 'string' ? params.house : 'gryffindor';
    const name = typeof params.name === 'string' ? params.name : 'A Wizard';

    return {
        title: `${name} is a ${house.charAt(0).toUpperCase() + house.slice(1)}!`,
        description: `Find out which Hogwarts House you belong to. ${name} was sorted into ${house}!`,
        openGraph: {
            title: `${name} is a ${house.charAt(0).toUpperCase() + house.slice(1)}!`,
            description: `The Sorting Hat has spoken! ${name} belongs to ${house}. Which house will you be in?`,
            images: [`/api/og?house=${house}&name=${name}`],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${name} is a ${house.charAt(0).toUpperCase() + house.slice(1)}!`,
            description: `The Sorting Hat has spoken! ${name} belongs to ${house}.`,
            images: [`/api/og?house=${house}&name=${name}`],
        },
    };
}

export default async function SharePage({ searchParams }: Props) {
    const params = await searchParams;
    const house = typeof params.house === 'string' && Object.keys(HOUSES).includes(params.house)
        ? (params.house as keyof typeof HOUSES)
        : 'gryffindor';
    const name = typeof params.name === 'string' ? params.name : 'A Wizard';

    const houseInfo = getHouseInfo(house);
    const primaryColor = houseInfo.colors[0];
    const secondaryColor = houseInfo.colors[1];

    return (
        <div
            className="min-h-screen flex flex-col overflow-hidden relative text-white"
            style={{
                background: `linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}20 50%, ${primaryColor}15 100%)`,
                backgroundColor: '#0f172a', // slate-900 fallback
            }}
        >
            {/* Dynamic background overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(circle at 30% 20%, ${primaryColor}40 0%, transparent 50%), 
                      radial-gradient(circle at 70% 80%, ${secondaryColor}30 0%, transparent 50%)`,
                }}
            />

            <StarField />

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 py-12">
                <div className="max-w-md w-full space-y-8 text-center">

                    <div className="space-y-2">
                        <p className="text-amber-200/80 font-serif italic text-lg">The Sorting Hat has spoken...</p>
                        <h1
                            className="text-3xl sm:text-4xl font-bold font-serif"
                            style={{
                                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: `0 0 20px ${secondaryColor}40`
                            }}
                        >
                            {name} is a {houseInfo.name}!
                        </h1>
                    </div>

                    <HouseCrest house={house} />

                    <HouseInfo house={house} />

                    <div className="pt-8 space-y-4">
                        <p className="text-xl font-serif text-white/90">
                            Where do you belong?
                        </p>

                        <Link href="/" className="block w-full">
                            <Button
                                variant="primary"
                                size="large"
                                fullWidth
                            >
                                🪄 Take the Sorting Quiz
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
