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

    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        function handleResize() {
            const isXl= window.matchMedia("(min-width: 1280px)").matches; // xl
            const isLg= window.matchMedia("(min-width: 1024px)").matches; // lg
            const isMd = window.matchMedia("(min-width: 768px)").matches; // md
            if(isXl) setVisibleCount(4);
            else if(isLg) setVisibleCount(3);
            else if(isMd) setVisibleCount(2);
            else setVisibleCount(1);
        }
    
        handleResize(); // İlk çağrım
        window.addEventListener("resize", handleResize);
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);
      

    useEffect(() => {
        async function fetchSandivs() {
            try {
                const response = await fetch('/saltysandivs.json');
                if (!response.ok) throw new Error('Veri yüklenemedi');

                const data = await response.json();
                if (Array.isArray(data.Sandivs)) {
                    const randomSandiv = data.Sandivs.sort(() => Math.random() - 0.5).slice(0, visibleCount);
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
    }, [visibleCount]);

    if (loading) return <div className="loading">Yükleniyor{dots}</div>

    if (error) return <div>Hata: {error}</div>;

    return (
        <div className="bosluk">
            <div className="homeBannerShadow mb-6">
                <div className="homeBanner bottom-3">
                    {sandivs.length > 0 ? (
                        sandivs.map((sandiv, index) => (
                            <div key={index} className="homeBannerSandiv">
                                <div className="relative p-5">
                                    <div className="flex justify-center">
                                        {/* Ekmek resmi */}
                                        <img
                                            src={`/malzemeler/${sandiv.bread}.webp`}
                                            className="bread"
                                        />
                                        {/* Tuzlu malzemeler */}
                                        {sandiv.ingredients.map((ingredient, idx) => (
                                            <img
                                                key={idx}
                                                src={`/malzemeler/${ingredient}.webp`}
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
                                                src={`/malzemeler/${cheese}.webp`}
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
                                                src={`/malzemeler/${sauceSalty}.webp`}
                                                className="ingredient"
                                                style={{
                                                    bottom: `${-180 + (sandiv.ingredients.length + sauceidx + sandiv.cheese.length) * 10}px`,
                                                }}
                                            />
                                        ))}
                                        {/* Ekmek resmi */}
                                        <img
                                            src={`/malzemeler/${sandiv.bread}.webp`}
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

            <div className="flex gap-6 flex-col items-center md:flex-row">
                <a href="/Restaurants" className="homeButtonShadow">
                    <div className="homeButton">
                        <img src="/homeBanner1.png" className="h-full aspect-auto rounded-3xl" />
                    </div>
                </a>

                <a href="/Home" className="h-40 w-40 hidden md:block"><img src="/logo.png" className="w-full h-full rounded-2xl border-solid border-3 border-border-pink" /></a>

                <a href="" className="homeButtonShadow">
                    <div className="homeButton">
                        <img src="/homeBanner2.png" className="h-full aspect-auto rounded-3xl" />
                    </div>
                </a>
            </div>
        </div>
    );
}