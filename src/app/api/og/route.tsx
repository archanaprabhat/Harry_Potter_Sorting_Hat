import { ImageResponse } from 'next/og';
import { HOUSES } from '@/lib/quiz-data';
import { getHouseInfo } from '@/lib/sorting-logic';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const house = searchParams.get('house');
        const name = searchParams.get('name') || 'A Wizard';

        if (!house || !Object.keys(HOUSES).includes(house)) {
            return new ImageResponse(
                (
                    <div
                        style={{
                            fontSize: 40,
                            color: 'black',
                            background: 'white',
                            width: '100%',
                            height: '100%',
                            padding: '50px 200px',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        Harry Potter Sorting Hat
                    </div>
                ),
                {
                    width: 1200,
                    height: 630,
                },
            );
        }

        const houseInfo = getHouseInfo(house as keyof typeof HOUSES);
        const primaryColor = houseInfo.colors[0];
        const secondaryColor = houseInfo.colors[1];

        // We need absolute URL for the image
        const protocol = request.headers.get('x-forwarded-proto') || 'http';
        const host = request.headers.get('host');
        const baseUrl = `${protocol}://${host}`;
        const logoUrl = `${baseUrl}/images/${house}_logo.png`;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#1e293b', // slate-900
                        backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                        color: 'white',
                        fontFamily: 'serif',
                    }}
                >
                    {/* Overlay for better text contrast */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        }}
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={logoUrl}
                            alt={houseInfo.name}
                            width="250"
                            height="250"
                            style={{ marginBottom: 20 }}
                        />

                        <div style={{ fontSize: 30, marginBottom: 10, opacity: 0.9 }}>
                            {name} belongs to...
                        </div>

                        <div
                            style={{
                                fontSize: 100,
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                color: 'white',
                                textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                                marginBottom: 20,
                            }}
                        >
                            {houseInfo.name}
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            {houseInfo.traits.slice(0, 3).map((trait) => (
                                <div
                                    key={trait}
                                    style={{
                                        padding: '10px 30px',
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        borderRadius: '50px',
                                        fontSize: 24,
                                        border: '1px solid rgba(255,255,255,0.3)',
                                    }}
                                >
                                    {trait}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            fontSize: 24,
                            opacity: 0.8,
                            zIndex: 10,
                        }}
                    >
                        Discover your house at harry-potter-sorting-hat.vercel.app
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        console.log(`${errorMessage}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
