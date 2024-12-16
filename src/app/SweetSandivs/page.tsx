'use client';

import { useEffect, useState } from "react";

export default function Home() {
    const [sandivs, setSandivs] = useState([]);

    useEffect(() => {
        async function fetchSandivs() {
            const res = await fetch('/sandivs.json');
            const data = await res.json();
            setSandivs(data.Sandivs);
        }

        fetchSandivs();
    }, []);

    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-center gap-20 m-4">
                <a className="option-button">
                    <div className="sandiv-button-shadow"></div>
                    <div className="absolute">Tuzlu Sandivs</div>
                </a>

                <a  className="option-button">
                    <div className="sandiv-button-shadow"></div>
                    <div className="absolute">Tatlı Sandivs</div>
                </a>

                <a className="option-button">
                    <div className="sandiv-button-shadow"></div>
                    <div className="absolute">Kendi Sandivin</div>
                </a>
            </div>

            <div className="overflow-y-auto flex justify-center items-center flex-wrap ml-1 gap-16">
                {sandivs.map((sandiv, index) => (
                    <div key={index} className="sandiv">
                        <div className="sandivName">{sandiv.name}</div>
                        <div className="sandivIMG">
                        <div className="flex justify-center ml-24">
                            <img src={`./malzemeler/bread/salty/${sandiv.bread}.png`} className="bread"/>
                            {sandiv.ingredients.map((ingredient, idx) => (
                                <img key={idx} src={`./malzemeler/salty/${ingredient}.png`} className="ingredient" style={{bottom: `${-180 + (idx * 10)}px`,}}/>
                            ))}
                            {sandiv.cheese != "none" && sandiv.cheese.map((cheese, cheeseidx) => (
                                <img key={`${cheeseidx}`} src={`./malzemeler/cheese/${cheese}.png`} className="cheese" style={{bottom: `${-180 + ((sandiv.ingredients.length + sandiv.sauce.length + cheeseidx) * 10)}px`,}}/>
                            ))}
                            {sandiv.sauce != "none" && sandiv.sauce.map((sauce, sauceidx) => (
                                <img key={`${sauceidx}`} src={`./malzemeler/sauce/${sauce}.png`} className="ingredient" style={{bottom: `${-180 + ((sandiv.ingredients.length + sauceidx + sandiv.cheese.length) * 10)}px`,}}/>
                            ))}
                            <img src={`./malzemeler/bread/salty/${sandiv.bread}.png`} className="bread" style={{bottom: `${-180 + ((sandiv.ingredients.length + sandiv.sauce.length + sandiv.cheese.length) * 10)}px`,}}/>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
