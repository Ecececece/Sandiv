'use client';

import { useEffect, useState } from "react";

type Sandiv = {
    name: string;
    bread: string;
    ingredients: string[];
    cheese: string[] | "none";
    sauceSalty: string[] | "none";
};

export default function Sal() {
    const [sandivs, setSandivs] = useState<Sandiv[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [dots, setDots] = useState("");

    useEffect(() => {
        async function fetchSandivs() {
            try {
                const response = await fetch('/saltysandivs.json');
                if (!response.ok) throw new Error('Veri yüklenemedi');

                const data = await response.json();
                if (Array.isArray(data.Sandivs)) {
                    const randomSandiv = data.Sandivs.sort(() => Math.random() - 0.5).slice(0, 4)
                    console.log(randomSandiv);

                    setSandivs(randomSandiv);
                }
                else setSandivs([]);

                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Bilinmeyen hata");
                setLoading(false);
            }

            const interval = setInterval(() => { setDots((prev) => (prev === "..." ? "" : prev + ".")); }, 200);
            return () => clearInterval(interval);
        }

        fetchSandivs();
    }, []);

    if (loading) return <div className="loading">Yükleniyor{dots}</div>

    if (error) return <div>Hata: {error}</div>;

    return (
        <div className="bosluk">
            <div className="homeBannerShadow mb-6">
                <div className="homeBanner bottom-3">
                    {sandivs.length > 0 ? (
                        sandivs.map((sandiv, index) => (
                            <div key={index} className="homeBannerSandiv">
                                <div className="flex justify-start items-center relative left-24 top-8">
                                    <div className="w-2/4 flex justify-center items-center">
                                        {/* Ekmek resmi */}
                                        <img
                                            src={`https://storage.cloud.google.com/sandiv/${sandiv.bread}.png`}
                                            className="bread"
                                        />
                                        {/* Tuzlu malzemeler */}
                                        {sandiv.ingredients.map((ingredient, idx) => (
                                            <img
                                                key={idx}
                                                src={`https://storage.cloud.google.com/sandiv/${ingredient}.png`}
                                                className="ingredient"
                                                style={{
                                                    bottom: `${-180 + idx * 10}px`,
                                                }}
                                            />
                                        ))}
                                        {/* Peynir resimleri */}
                                        {sandiv.cheese !== "none" && sandiv.cheese.map((cheese, cheeseidx) => (
                                            <img
                                                key={cheeseidx}
                                                src={`https://storage.cloud.google.com/sandiv/${cheese}.png`}
                                                className="ingredient"
                                                style={{
                                                    bottom: `${-180 + (sandiv.ingredients.length + sandiv.sauceSalty.length + cheeseidx) * 10}px`
                                                }}
                                            />
                                        ))}
                                        {/* Sos resimleri */}
                                        {sandiv.sauceSalty !== "none" && sandiv.sauceSalty.map((sauceSalty, sauceidx) => (
                                            <img
                                                key={sauceidx}
                                                src={`https://storage.cloud.google.com/sandiv/${sauceSalty}.png`}
                                                className="ingredient"
                                                style={{
                                                    bottom: `${-180 + (sandiv.ingredients.length + sauceidx + sandiv.cheese.length) * 10}px`,
                                                }}
                                            />
                                        ))}
                                        {/* Ekmek resmi */}
                                        <img
                                            src={`https://storage.cloud.google.com/sandiv/${sandiv.bread}.png`}
                                            className="bread"
                                            style={{
                                                bottom: `${-180 + (sandiv.ingredients.length + sandiv.sauceSalty.length + sandiv.cheese.length) * 10}px`,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="homeBannerSandivName">{sandiv.name}</div>
                            </div>
                        ))
                    ) : (
                        <div>Veri bulunamadı.</div>
                    )}
                </div>
                <div className="homeBannerText">Favori Sandivs</div>
            </div>

            <div className="flex gap-6">
                <a href="/Restaurants" className="homeButtonShadow">
                    <div className="homeButton">
                        <img src="/homeBanner1.png" className="h-full aspect-auto rounded-3xl" />
                    </div>
                </a>

                <a href="/Home" className="h-40 w-40"><img src="/logo.png" className="rounded-2xl border-solid border-3 border-border-pink" /></a>

                <a href="" className="homeButtonShadow">
                    <div className="homeButton">
                        <img src="/homeBanner2.png" className="h-full aspect-auto rounded-3xl" />
                    </div>
                </a>
            </div>

            <div className="flex gap-6 mt-6">
                <div className="homeBannerShadowHalf">
                    <div className="homeBannerHalf">

                    </div>
                </div>

                <div className="homeBannerShadowHalf">
                    <div className="homeBannerHalf">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}