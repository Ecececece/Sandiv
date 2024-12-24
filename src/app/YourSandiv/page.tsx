'use client'

import { useEffect, useState } from "react";

type Sandiv = {
  name: string;
  bread: string;
  ingredients: string[];
  cheese: string[] | "none";
  sauce: string[] | "none";
};

type Ingredient = {
  category: string; trName: string; enName: string;
};

export default function Home() {
  const [sandivs, setSandivs] = useState<Sandiv[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
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

  return (
    <div>
      <div className="yourSandiv-div">
        <div className="ingredientsShadow">
          <div className="ingredients">
            <div className="ingredientDeneme">
              {/* Ekmek */}
              <details>
                <summary>Ekmekler</summary>
                <details>
                  <summary>Tuzlu Ekmekler:</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (ingredient.category === "breadSalty") {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input
                              type="checkbox"
                              name={ingredient.category}
                              id={ingredient.enName}
                            />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>

                <details>
                  <summary>Tatlı Ekmekler:</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (ingredient.category === "breadSweet") {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input
                              type="checkbox"
                              name={ingredient.category}
                              id={ingredient.enName}
                            />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>
              </details>
              {/* Peynir */}
              <details>
                <summary>Peynirler</summary>
                <div className="flex flex-col">
                  {[...ingredients].map((ingredient, index) => {
                    if (ingredient.category === "cheese" && ingredient.enName !== "none") {
                      return (
                        <label key={`${ingredient.enName}-${index}`}>
                          <input
                            type="checkbox"
                            name={ingredient.category}
                            value={ingredient.enName}
                          />
                          {ingredient.trName}
                        </label>
                      );
                    }
                  })}
                </div>
              </details>
              {/* Malzeme */}
              <details>
                <summary>Malzemeler</summary>
                <details>
                  <summary>Tuzlu Malzemeler:</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (ingredient.category === "ingredientSalty") {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input type="checkbox" name={ingredient.category} id={ingredient.enName} />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>

                <details>
                  <summary>Tatlı Malzemeler:</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (ingredient.category === "ingredientSweet") {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input type="checkbox" name={ingredient.category} id={ingredient.enName} />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>
              </details>
              {/* Sos */}
              <details>
                <summary>Soslar</summary>
                <details>
                  <summary>Tuzlu Soslar:</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (ingredient.category === "sauceSalty") {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input type="checkbox" name={ingredient.category} id={ingredient.enName} />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>
                <details>
                  <summary>Tatlı Soslar:</summary>
                  <div className="flex flex-col">
                    {[...ingredients].map((ingredient, index) => {
                      if (ingredient.category === "sauceSweet") {
                        return (
                          <label key={`${ingredient.enName}-${index}`}>
                            <input type="checkbox" name={ingredient.category} id={ingredient.enName} />
                            {ingredient.trName}
                          </label>
                        );
                      }
                    })}
                  </div>
                </details>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}