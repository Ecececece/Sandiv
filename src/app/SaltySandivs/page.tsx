"use client";

import { useEffect, useState } from "react";

type Sandiv = {
  name: string;
  bread: string;
  ingredients: string[];
  cheese: string[] | "none";
  sauceSalty: string[] | "none";
};

type Ingredient = { trName: string; enName: string };

const RenderSandivItems = ({ sandiv, className = "" }: { sandiv: Sandiv, className?: string; }) => {
  return (
    <div className={`sandivIMG ${className}`}>
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
        {sandiv.cheese !== "none" &&
          sandiv.cheese.map((cheese, cheeseidx) => (
            <img
              key={cheeseidx}
              src={`/malzemeler/${cheese}.webp`}
              className="ingredient"
              style={{
                bottom: `${-180 +
                  (sandiv.ingredients.length +
                    sandiv.sauceSalty.length +
                    cheeseidx) *
                  10
                  }px`,
              }}
            />
          ))}
        {/* Sos resimleri */}
        {sandiv.sauceSalty !== "none" &&
          sandiv.sauceSalty.map((sauceSalty, sauceidx) => (
            <img
              key={sauceidx}
              src={`/malzemeler/${sauceSalty}.webp`}
              className="ingredient"
              style={{
                bottom: `${-180 +
                  (sandiv.ingredients.length +
                    sauceidx +
                    sandiv.cheese.length) *
                  10
                  }px`,
              }}
            />
          ))}
        {/* Ekmek resmi */}
        <img
          src={`/malzemeler/${sandiv.bread}.webp`}
          className="bread"
          style={{
            bottom: `${-180 +
              (sandiv.ingredients.length +
                sandiv.sauceSalty.length +
                sandiv.cheese.length) *
              10
              }px`,
          }}
        />
      </div>
    </div>
  );
};

export default function SaltySandivs() {
  const [sandivs, setSandivs] = useState<Sandiv[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dots, setDots] = useState("");

  const [clickSandiv, setClickSandiv] = useState<Sandiv | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "" : prev + ".")); // 3 nokta animasyonu
    }, 200);

    async function fetchSandivs() {
      try {
        const response = await fetch("/saltysandivs.json");
        if (!response.ok) throw new Error("Veri yüklenemedi");

        const data = await response.json();

        setSandivs(Array.isArray(data.Sandivs) ? data.Sandivs : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
      } finally {
        setLoading(false);
      }
    }

    fetchSandivs();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch("/ingredients.json");
        if (!response.ok) throw new Error("Veri yüklenemedi");

        const data = await response.json();

        const allIngredients = [
          ...data.breadSalty.map((item: Ingredient) => ({
            ...item,
            category: "breadSalty",
          })),
          ...data.breadSweet.map((item: Ingredient) => ({
            ...item,
            category: "breadSweet",
          })),
          ...data.cheese.map((item: Ingredient) => ({
            ...item,
            category: "cheese",
          })),
          ...data.ingredientSalty.map((item: Ingredient) => ({
            ...item,
            category: "ingredientSalty",
          })),
          ...data.ingredientSweet.map((item: Ingredient) => ({
            ...item,
            category: "ingredientSweet",
          })),
          ...data.sauceSalty.map((item: Ingredient) => ({
            ...item,
            category: "sauceSalty",
          })),
          ...data.sauceSweet.map((item: Ingredient) => ({
            ...item,
            category: "sauceSweet",
          }))
        ];

        setIngredients(allIngredients);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
      }
    }

    fetchIngredients();
  }, []);

  useEffect(() => {
    const sandivScrollElement = document.getElementById("sandivScroll");

    if (clickSandiv) {
      document.body.style.overflow = "hidden";
      if (sandivScrollElement) {
        sandivScrollElement.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "auto";
      if (sandivScrollElement) {
        sandivScrollElement.style.overflowY = "auto";
        sandivScrollElement.style.overflowX = "hidden";
      }
    }

    // Temizleme
    return () => {
      document.body.style.overflow = "auto";
      if (sandivScrollElement) {
        sandivScrollElement.style.overflow = "auto";
      }
    };
  }, [clickSandiv]);



  if (loading) return <div className="loading">Yükleniyor{dots}</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="flex flex-col relative">
      <div className="sandivs-div" id="sandivScroll">
        {sandivs.length > 0 ? (
          sandivs.map((sandiv, index) => (
            <div
              key={index}
              className="sandiv"
              onClick={() => {
                setClickSandiv(sandiv);
              }}
            >
              <div className="sandivShadow">
                <RenderSandivItems sandiv={sandiv} />

                <div className="flex justify-center relative">
                  <div className="sandivName">{sandiv.name}</div>

                  <a
                    key={index}
                    className="sepetButton -bottom-73"
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

      {clickSandiv && (
        <div className="ingredientScreenBack">
          <div className="ingredientScreen">
            <div className="ingredientScreenShadow">
              {sandivs
                .filter((sandiv) => sandiv.name === clickSandiv.name)
                .map((sandiv, index) => (
                  <div key={index}>
                    <RenderSandivItems sandiv={sandiv} className="-bottom-20" />
                    <div className="flex flex-col items-center">
                      <div className="sandivName">{sandiv.name}</div>

                      <div className="absolute top-72 flex flex-row gap-10">
                        <div>
                          <div className="ingredientListMainElement">Ekmek :</div>
                          <ul className="list-disc ingredientListElement">
                            {[...ingredients].map((ingredient, index) => {
                              if (sandiv.bread.includes(ingredient.enName)) {
                                return <li key={`${ingredient.enName}-${index}`}>{ingredient.trName}</li>;
                              }
                            })}
                          </ul>

                          <div className="ingredientListMainElement mt-8">Peynir(ler) :</div>
                          <ul className="list-disc ingredientListElement">
                            {[...ingredients].map((ingredient, index) => {
                              if (sandiv.cheese.includes(ingredient.enName)) {
                                return <li key={`${ingredient.enName}-${index}`}>{ingredient.trName}</li>;
                              }
                            })}
                          </ul>

                          <div className="ingredientListMainElement mt-8">Sos(lar) :</div>
                          <ul className="list-disc ingredientListElement">
                            {[...ingredients].map((ingredient, index) => {
                              if (sandiv.sauceSalty.includes(ingredient.enName)) {
                                return <li key={`${ingredient.enName}-${index}`}>{ingredient.trName}</li>;
                              }
                            })}
                          </ul>
                        </div>

                        <div>
                          <div className="ingredientListMainElement">Malzeme(ler) :</div>
                          <ul className="list-disc ingredientListElement">
                            {[...ingredients].map((ingredient, index) => {
                              if (sandiv.ingredients.includes(ingredient.enName)) {
                                return <li key={`${ingredient.enName}-${index}`}>{ingredient.trName}</li>;
                              }
                            })}
                          </ul>
                        </div>
                      </div>
                      <a
                        key={index}
                        className="sepetButton -bottom-190"
                        onClick={() => {console.log(sandiv.name), setClickSandiv(null)}}
                      >
                        <div className="sandiv-button-shadow"></div>
                        <div className="absolute">Sepete Ekle</div>
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}