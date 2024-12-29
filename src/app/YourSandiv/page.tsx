"use client";

import React, { useEffect, useState } from "react";

type Ingredient = {
  category: string;
  trName: string;
  enName: string;
};

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [error, setError] = useState<string | null>(null);

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
          })),
        ];

        setIngredients(allIngredients);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
      }
    }

    fetchIngredients();
  }, []);

  const [checkedBread, setCheckedBread] = useState<string | null>(null);
  const handleBreadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) setCheckedBread(event.target.value);
    else {
      setCheckedBread(null);
      setCheckedIngredients([]);
      setCheckedCheeses([]);
      setCheckedSauces([]);
      setCountIngredient(0);
      setCountCheese(0);
      setCountSauce(0);
    }
  };

  const [countIngredient, setCountIngredient] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      if (countIngredient < 10) {
        setCheckedIngredients([...checkedIngredients, value]);
        setCountIngredient(countIngredient + 1);
      } else event.target.checked = false;
    } else {
      setCheckedIngredients(
        checkedIngredients.filter((item) => item !== value)
      );
      setCountIngredient(countIngredient - 1);
    }
  };

  const [countCheese, setCountCheese] = useState(0);
  const [checkedCheeses, setCheckedCheeses] = useState<string[]>([]);
  const handleCheeseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      if (countCheese < 10) {
        setCheckedCheeses([...checkedCheeses, value]);
        setCountCheese(countCheese + 1);
      } else event.target.checked = false;
    } else {
      setCheckedCheeses(checkedCheeses.filter((item) => item !== value));
      setCountCheese(countCheese - 1);
    }
  };

  const [countSauce, setCountSauce] = useState(0);
  const [checkedSauces, setCheckedSauces] = useState<string[]>([]);
  const handleSauceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      if (countSauce < 3) {
        setCheckedSauces([...checkedSauces, value]);
        setCountSauce(countSauce + 1);
      } else event.target.checked = false;
    } else {
      setCheckedSauces(checkedSauces.filter((item) => item !== value));
      setCountSauce(countSauce - 1);
    }
  };

  return (
    <div className="h-customScreen lg:h-auto">
      <div className="yourSandiv-div">
        <div className="ingredientsShadow">
          <div className="ingredients">
            <div className="ingredientScroll">
              {/* Ekmek */}
              <details id="bread">
                <summary>Ekmekler</summary>
                <details>
                  <summary>Tuzlu Ekmekler</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (ingredient.category == "breadSalty") {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input
                              type="checkbox"
                              value={ingredient.enName}
                              onChange={handleBreadChange}
                              disabled={
                                !!checkedBread &&
                                checkedBread != `${ingredient.enName}`
                              }
                            />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>

                <details>
                  <summary>Tatlı Ekmekler</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (ingredient.category == "breadSweet") {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input
                              type="checkbox"
                              value={ingredient.enName}
                              onChange={handleBreadChange}
                              disabled={
                                !!checkedBread &&
                                checkedBread != `${ingredient.enName}`
                              }
                            />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>
              </details>
              {/* Malzeme */}
              {checkedBread && (
                <details id="ingredient">
                  <summary>Malzemeler</summary>
                  <details>
                    <summary>Tuzlu Malzemeler</summary>
                    <div className="flex flex-col">
                      {[...ingredients].map((ingredient, index) => {
                        if (ingredient.category == "ingredientSalty") {
                          return (
                            <label key={`${ingredient.enName}-${index}`}>
                              <input
                                type="checkbox"
                                value={ingredient.enName}
                                onChange={handleIngredientChange}
                                disabled={
                                  countIngredient == 10 &&
                                  !checkedIngredients.includes(
                                    `${ingredient.enName}`
                                  )
                                }
                              />
                              {ingredient.trName}
                            </label>
                          );
                        }
                      })}
                    </div>
                  </details>

                  <details>
                    <summary>Tatlı Malzemeler</summary>
                    <div className="flex flex-col">
                      {[...ingredients].map((ingredient, index) => {
                        if (ingredient.category == "ingredientSweet") {
                          return (
                            <label key={`${ingredient.enName}-${index}`}>
                              <input
                                type="checkbox"
                                value={ingredient.enName}
                                onChange={handleIngredientChange}
                                disabled={
                                  countIngredient == 10 &&
                                  !checkedIngredients.includes(
                                    `${ingredient.enName}`
                                  )
                                }
                              />
                              {ingredient.trName}
                            </label>
                          );
                        }
                      })}
                    </div>
                  </details>
                </details>
              )}
              {/* Peynir */}
              {checkedBread && (
                <details id="cheese">
                  <summary>Peynirler</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (
                        ingredient.category == "cheese" &&
                        ingredient.enName != "none"
                      ) {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input
                              type="checkbox"
                              value={ingredient.enName}
                              onChange={handleCheeseChange}
                              disabled={
                                countCheese == 2 &&
                                !checkedCheeses.includes(`${ingredient.enName}`)
                              }
                            />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>
              )}
              {/* Sos */}
              {checkedBread && (
                <details id="sauce">
                  <summary>Soslar</summary>
                  <details>
                    <summary>Tuzlu Soslar</summary>
                    <div className="flex flex-col">
                      {[...ingredients].map((ingredient, index) => {
                        if (ingredient.category == "sauceSalty") {
                          return (
                            <label key={`${ingredient.enName}-${index}`}>
                              <input
                                type="checkbox"
                                value={ingredient.enName}
                                onChange={handleSauceChange}
                                disabled={
                                  countSauce == 3 &&
                                  !checkedSauces.includes(
                                    `${ingredient.enName}`
                                  )
                                }
                              />
                              {ingredient.trName}
                            </label>
                          );
                        }
                      })}
                    </div>
                  </details>
                  <details>
                    <summary>Tatlı Soslar</summary>
                    <div className="flex flex-col">
                      {[...ingredients].map((ingredient, index) => {
                        if (ingredient.category == "sauceSweet") {
                          return (
                            <label key={`${ingredient.enName}-${index}`}>
                              <input
                                type="checkbox"
                                value={ingredient.enName}
                                onChange={handleSauceChange}
                                disabled={
                                  countSauce == 3 &&
                                  !checkedSauces.includes(
                                    `${ingredient.enName}`
                                  )
                                }
                              />
                              {ingredient.trName}
                            </label>
                          );
                        }
                      })}
                    </div>
                  </details>
                </details>
              )}
            </div>
          </div>
        </div>

        <div className="yourSandivIngredients -bottom-96 lg:-bottom-0">
          {checkedBread && (
            <img
              src={`/malzemeler/${checkedBread}.webp`}
              className="yourSandivIngredient"
              style={{
                bottom: `${-200}px`,
              }}
            />
          )}
          {checkedIngredients.length > 0 &&
            checkedIngredients.map((ingredient, index) => (
              <img
                src={`/malzemeler/${ingredient}.webp`}
                className="yourSandivIngredient"
                key={ingredient}
                style={{
                  bottom: `${-200 + (index + 1) * 25}px`,
                }}
              />
            ))}
          {checkedCheeses.length > 0 &&
            checkedCheeses.map((cheese, index) => (
              <img
                src={`/malzemeler/${cheese}.webp`}
                className="yourSandivIngredient"
                key={cheese}
                style={{
                  bottom: `${
                    -200 + (index + 1 + checkedIngredients.length) * 25
                  }px`,
                }}
              />
            ))}
          {checkedSauces.length > 0 &&
            checkedSauces.map((sauce, index) => (
              <img
                src={`/malzemeler/${sauce}.webp`}
                className="yourSandivIngredient"
                key={sauce}
                style={{
                  bottom: `${
                    -200 +
                    (index +
                      1 +
                      checkedIngredients.length +
                      checkedCheeses.length) *
                      25
                  }px`,
                }}
              />
            ))}
        </div>

        <div className="ingredientsShadow mr-0 mt-130 lg:mt-0">
          <div className="ingredients">
            <div className="ingredientScroll">
              {checkedBread != null && <div>Ekmek</div>}
              {checkedBread &&
                [...ingredients].map((ingredient) => {
                  if (checkedBread.includes(ingredient.enName)) {
                    return (
                      <div className="ml-5" key={ingredient.enName}>
                        {ingredient.trName}
                      </div>
                    );
                  }
                })}
              {checkedIngredients.length > 0 && <div>Malzeme(ler)</div>}
              {checkedIngredients &&
                [...ingredients].map((ingredient) => {
                  if (checkedIngredients.includes(ingredient.enName)) {
                    return (
                      <div className="ml-5" key={ingredient.enName}>
                        {ingredient.trName}
                      </div>
                    );
                  }
                })}
              {checkedCheeses.length > 0 && <div>Peynir(ler)</div>}
              {checkedCheeses &&
                [...ingredients].map((ingredient) => {
                  if (checkedCheeses.includes(ingredient.enName)) {
                    return (
                      <div className="ml-5" key={ingredient.enName}>
                        {ingredient.trName}
                      </div>
                    );
                  }
                })}
              {checkedSauces.length > 0 && <div>Sos(lar)</div>}
              {checkedSauces &&
                [...ingredients].map((ingredient) => {
                  if (checkedSauces.includes(ingredient.enName)) {
                    return (
                      <div className="ml-5" key={ingredient.enName}>
                        {ingredient.trName}
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
