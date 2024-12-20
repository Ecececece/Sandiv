"use client";

import { useEffect, useState } from "react";

type Ingredient = { enName: string };

type Category =
  | "breadSalty"
  | "breadSweet"
  | "cheese"
  | "ingredientSalty"
  | "ingredientSweet"
  | "sauce";

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
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
          ...data.sauce.map((item: Ingredient) => ({
            ...item,
            category: "sauce",
          })),
        ];

        const randombread = data.breadSalty
          .sort(() => Math.random() - 0.5)
          .slice(0, 1);
        const randomcheese = data.cheese
          .sort(() => Math.random() - 0.5)
          .slice(0, 1);
        const randomingredient = data.ingredientSalty
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
        const randomsauce = data.sauce
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);

        const randomIngredients = [
          ...randombread,
          ...randomingredient,
          ...randomcheese,
          ...randomsauce,
          ...randombread,
        ];
        setIngredients(randomIngredients);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  function getCategory(index: number): Category {
    if (index === 1 || index === 11) return "breadSalty";
    else if (index >= 2 && index <= 7) return "ingredientSalty";
    else if (index === 8) return "cheese";
    else if (index >= 9 && index <= 10) return "sauce";
    return "breadSalty";
  }
  /*
    function getStyle(index: number): React.CSSProperties {
        if (index === 1 || index === 11) return { height: '105px', width: '270px' };
        else if (index >= 2 && index <= 10) return { height: '90px', width: '240px' };
        return {};
    }

    const srcFirst: Record<Category, string> = {
        breadSalty: '/malzemeler/bread/salty/',
        breadSweet: '/malzemeler/bread/sweet/',
        cheese: '/malzemeler/cheese/',
        ingredientSalty: '/malzemeler/salty/',
        ingredientSweet: '/malzemeler/sweet/',
        sauce: '/malzemeler/sauce/',
    };

    const srcSecond: Record<Category, string> = {
        breadSalty: '.png?updatedAt=1733917749146',
        breadSweet: '.png?updatedAt=1733917747075',
        cheese: '.png?updatedAt=1733917747096',
        ingredientSalty: '.png?updatedAt=1733917744759',
        ingredientSweet: '.png?updatedAt=1733917734722',
        sauce: '.png?updatedAt=1733917737445',
    };

    const [leftPositionSandiv, setLeftPositionSandiv] = useState(0);
    const [leftPositionHomeBannerName, setLeftPositionHomeBannerName] = useState(0);

    const [offsetSandiv] = useState(225);
    const [offsetHomeBannerName] = useState(1160);
*/
  useEffect(() => {
    const updatePosition = () => {
      const screenWidth = window.innerWidth;

      const calculatedLeftSandiv = screenWidth - offsetSandiv;
      setLeftPositionSandiv(calculatedLeftSandiv);

      const calculatedLeftHomeBannerName = screenWidth - offsetHomeBannerName;
      setLeftPositionHomeBannerName(calculatedLeftHomeBannerName);
    };

    window.addEventListener("resize", updatePosition);
    updatePosition();
    return () => window.removeEventListener("resize", updatePosition);
  }, [offsetSandiv, offsetHomeBannerName]);

  return (
    <div className="flex flex-col">
      <div className="homeBanner">
        <div className="sandivIMG">
          <div className="flex justify-center ml-24">
            {loading && <div>Yükleniyor...</div>}
            {error && <div>Hata: {error}</div>}
            {!loading &&
              !error &&
              ingredients.map((ingredient, index) => {
                const category = getCategory(index + 1);
                return (
                  <img
                    key={index}
                    className="absolute"
                    src={`https://ik.imagekit.io/zvxotlby9c${srcFirst[category]}${ingredient.enName}${srcSecond[category]}`}
                    style={{
                      bottom: `${-210 + index * 12}px`,
                      ...getStyle(index + 1),
                    }}
                  />
                );
              })}
          </div>
        </div>

        <div
          className="homeBannerName"
          style={{ left: `${leftPositionHomeBannerName}px` }}
        >
          SANDIV
        </div>

        <div className="sandivIMG" style={{ left: `${leftPositionSandiv}px` }}>
          <div className="flex justify-center mr-2">
            {loading && <div>Yükleniyor...</div>}
            {error && <div>Hata: {error}</div>}
            {!loading &&
              !error &&
              ingredients.map((ingredient, index) => {
                const category = getCategory(index + 1);
                return (
                  <img
                    key={index}
                    className="absolute"
                    src={`https://ik.imagekit.io/zvxotlby9c${srcFirst[category]}${ingredient.enName}${srcSecond[category]}`}
                    style={{
                      bottom: `${-210 + index * 12}px`,
                      ...getStyle(index + 1),
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

<ul className="list-disc ">
  {loading && <div>Yükleniyor...</div>}
  {error && <div>Hata: {error}</div>}

  {[...ingredients].map((ingredient, index) => {
    if (sandiv.bread.includes(ingredient.enName)) {
      return <li key={`${ingredient.enName}-${index}`}>{ingredient.trName}</li>;
    }

    if (sandiv.cheese.includes(ingredient.enName)) {
      return <li key={`${ingredient.enName}-${index}`}>{ingredient.trName}</li>;
    }

    if (sandiv.sauce.includes(ingredient.enName)) {
      return <li key={`${ingredient.enName}-${index}`}>{ingredient.trName}</li>;
    }

    if (sandiv.ingredients.includes(ingredient.enName)) {
      return <li key={`${ingredient.enName}-${index}`}>{ingredient.trName}</li>;
    }
    return null;
  })}
</ul>;

<div className="w-52 h-52 z-50 ">
{divs.map((index) => (
<div
  key={index}
  className="p-4 bg-gray-200 border border-gray-400 rounded"
>
      {sandiv.name}
    </div>


  sandivs.map((sandiv, index) => (
    <div
      key={index}
      className="sandiv"
      onClick={() => {
        setClickSandiv(sandiv.name);
      }}
    >
      <div className="sandivShadow">
        <RenderSandivItems sandiv={sandiv} />

        <div className="flex justify-center relative ">
          <div className="sandivName">{sandiv.name}</div>
        </div>
      </div>
    </div>
  ))
) : (
  <div>Veri bulunamadı.</div>




  {
    "name": "Vejeteryan Sandiv",
    "bread": "white_bread",
    "cheese": ["mozzarella_cheese"],
    "sauce": ["sweet_and_spicy_sauce", "chipotle_sauce"],
    "ingredients": ["mushroom", "omlette", "carrot", "fajita_peppers", "fried_onion"]
},
{
    "name": "Kanat Sandiv",
    "bread": "tortilla",
    "cheese": ["swiss_cheese"],
    "sauce": ["mayonnaise_sauce"],
    "ingredients": ["turkey", "duck", "chicken", "jalapeno"]
},

{
    "name": "Tavuk Rüyası Sandiv",
    "bread": "three_cheese_bread",
    "cheese": ["mozzarella_cheese"],
    "sauce": ["ranch_sauce","chipotle_sauce"],
    "ingredients": ["chicken","bacon","fried_onion","fajita_peppers"]
},
{
    "name": "Et Sever Sandiv",
    "bread": "white_bread",
    "cheese": ["cheddar_cheese"],
    "sauce": ["barbecue_sauce"],
    "ingredients": ["beef","bacon","ham","meatball","steak"]
},
{
    "name": "Kahvaltılık Sandiv",
    "bread": "tortilla",
    "cheese": ["pepperjack_cheese"],
    "sauce": ["none"],
    "ingredients": ["omlette", "sucuk", "tomato", "sausage"]
},
{
    "name": "Vegan Sandiv",
    "bread": "naan_bread",
    "cheese": ["none"],
    "sauce": ["ketchup_sauce","hot_sauce","barbecue_sauce"],
    "ingredients": ["red_onion","fried_onion","tomato","cucumber","mushroom"]

},
{
    "name": "Denizci Sandiv",
    "bread": "cheddar_swirl_bread",
    "cheese": ["havarti_cheese"],
    "sauce": ["tartar_sauce"],
    "ingredients": ["shrimp", "jalapeno", "octopus", "chunk","red_onion"]
},
{
    "name": "Acılı Sandiv",
    "bread": "naan_bread",
    "cheese": ["pepperjack_cheese"],
    "sauce": ["hot_sauce","barbecue_sauce"],
    "ingredients": ["steak", "jalapeno", "green_pepper", "onion","bacon","fajita_peppers"]
},
{
    "name": "Çiftlik Sandiv",
    "bread": "multigrain_bread",
    "cheese": ["havarti_cheese"],
    "sauce": ["ranch_sauce","buffalo_sauce","mustard_sauce"],
    "ingredients": ["bacon", "jalapeno", "steak", "onion","pickle","fajita_peppers","turkey"]

},
{
    "name": "Acılı Tavuk Sandiv",
    "bread": "naan_bread",
    "cheese": ["pepperjack_cheese"],
    "sauce": ["hot_sauce"],
    "ingredients": ["steak", "jalapeno", "green_pepper", "onion"]
},
{
    "name": "Hint Sandiv",
    "bread": "naan_bread",
    "cheese": ["pepperjack_cheese"],
    "sauce": ["curry_sauce"],
    "ingredients": ["steak", "jalapeno", "fajita_peppers", "onion", "ham", "pastirma"]
},
{
    "name": "Sosyete Sandiv",
    "bread": "three_cheese_bread",
    "cheese": ["cheddar_cheese"],
    "sauce": ["hot_sauce","ranch_sauce","sweet_and_spicy_sauce"],
    "ingredients": ["steak", "jalapeno", "green_pepper", "onion","calamari" ,"ham", "steak"]
}