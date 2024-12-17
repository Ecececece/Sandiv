"use client";

import { useEffect, useState } from "react";

type Sandiv = {
  name: string;
  bread: string;
  ingredients: string[];
  cheese: string[] | "none";
  sauce: string[] | "none";
};

export default function SweetSandivs() {
  const [sandivs, setSandivs] = useState<Sandiv[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [dots, setDots] = useState("");

  useEffect(() => {
    async function fetchSandivs() {
      try {
        const response = await fetch("/sweetsandivs.json");
        if (!response.ok) throw new Error("Veri yüklenemedi");

        const data = await response.json();

        // Tip kontrolü ekleniyor
        if (Array.isArray(data.Sandivs)) {
          setSandivs(data.Sandivs);
        } else {
          setSandivs([]);
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
        setLoading(false);
      }

      const interval = setInterval(() => {
        setDots((prev) => (prev === "..." ? "" : prev + ".")); // Dots sırasını değiştir
      }, 500); // Her 500ms'de bir güncelle
      return () => clearInterval(interval);
    }

    fetchSandivs();
  }, []);

  if (loading){
    return (
        <div className="loading">
            Yükleniyor{dots}
        </div>
    )
  }

  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-20 m-4">
        <a href="/SaltySandivs" className="option-button">
          <div className="sandiv-button-shadow"></div>
          <div className="absolute">Tuzlu Sandivs</div>
        </a>

        <a href="/SweetSandivs" className="option-button">
          <div className="sandiv-button-shadow"></div>
          <div className="absolute">Tatlı Sandivs</div>
        </a>

        <a href="/SweetSandivs" className="option-button">
          <div className="sandiv-button-shadow"></div>
          <div className="absolute">Kendi Sandivin</div>
        </a>
      </div>

      <div className="sandivs-div" id="scrollable">
        {sandivs.length > 0 ? (
          sandivs.map((sandiv, index) => (
            <div key={index} className="sandiv">
              <div className="sandivShadow">
                <div className="sandivIMG">
                  <div className="flex justify-center ml-24">
                    {/* Ekmek resmi */}
                    <img
                      src={`https://ik.imagekit.io/zvxotlby9c/malzemeler/bread/sweet/${sandiv.bread}.png?updatedAt=1733917749146`}
                      className="bread"
                    />
                    {/* Tatlı malzemeler */}
                    {sandiv.ingredients.map((ingredient, idx) => (
                      <img
                        key={idx}
                        src={`https://ik.imagekit.io/zvxotlby9c/malzemeler/sweet/${ingredient}.png?updatedAt=1734430698579`}
                        className="ingredient"
                        style={{
                          bottom: `${-180 + idx * 10}px`,
                        }}
                      />
                    ))}
                    {/* Peynir resimleri */}
                    {sandiv.cheese !== "none" &&
                      sandiv.cheese.map((cheese, cheeseidx) => (
                        <img
                          key={cheeseidx}
                          src={`https://ik.imagekit.io/zvxotlby9c/malzemeler/cheese/${cheese}.png?updatedAt=1733917747096`}
                          className="ingredient"
                          style={{
                            bottom: `${
                              -180 +
                              (sandiv.ingredients.length +
                                sandiv.sauce.length +
                                cheeseidx) *
                                10
                            }px`,
                          }}
                        />
                      ))}
                    {/* Sos resimleri */}
                    {sandiv.sauce !== "none" &&
                      sandiv.sauce.map((sauce, sauceidx) => (
                        <img
                          key={sauceidx}
                          src={`https://ik.imagekit.io/zvxotlby9c/malzemeler/sauce/${sauce}.png?updatedAt=1733917737445`}
                          className="ingredient"
                          style={{
                            bottom: `${
                              -180 +
                              (sandiv.ingredients.length +
                                sauceidx +
                                sandiv.cheese.length) *
                                10
                            }px`,
                          }}
                        />
                      ))}
                    {/* Son bir ekmek resmini ekliyoruz */}
                    <img
                      src={`https://ik.imagekit.io/zvxotlby9c/malzemeler/bread/sweet/${sandiv.bread}.png?updatedAt=1733917749146`}
                      className="bread"
                      style={{
                        bottom: `${
                          -180 +
                          (sandiv.ingredients.length +
                            sandiv.sauce.length +
                            sandiv.cheese.length) *
                            10
                        }px`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-center relative -right-32">
                  <div className="sandivName">{sandiv.name}</div>
                  <a
                    className="sepetButton"
                    onClick={() => console.log(sandiv.name)}
                  >
                    <div className="sandiv-button-shadow"></div>
                    <div className="absolute">Sepete Ekle</div>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Veri bulunamadı.</div>
        )}
      </div>
    </div>
  );
}
