"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isUrunler, setIsUrunler] = useState(false);

  useEffect(() => {
    document.cookie = "my_cookie=value; SameSite=Strict; Secure; path=/";

    setIsUrunler(
      pathname.startsWith("/SaltySandivs") || pathname.startsWith("/SweetSandivs") || pathname.startsWith("/YourSandiv")
    );
  }, [pathname]);

  return (
    <html lang="tr">
      <title>Sandiv</title>
      <body className="flex font-sandiv flex-col overflow-x-hidden bg-body">
        <div className="h-auto py-4 md:h-44 barShadow z-50 bg-bar flex-col md:flex-row">
          <a href="/Home" className="h-36 w-36">
            <img
              src="/logo.png"
              className="rounded-2xl border-solid border-3 border-border-pink Logo"
            />
          </a>

          <a href="/SaltySandivs" className="sandiv-button">
            <div className="sandiv-button-shadow"></div>
            <div className="absolute">Ürünler</div>
          </a>

          <a href="/Restaurants" className="sandiv-button">
            <div className="sandiv-button-shadow"></div>
            <div className="absolute">Restorantlar</div>
          </a>

          <a href="/About" className="sandiv-button">
            <div className="sandiv-button-shadow"></div>
            <div className="absolute">Hakkımızda</div>
          </a>
        </div>

        {isUrunler && (
          <div className="h-auto flex flex-col md:flex-row md:h-44 justify-center gap-5 p-4 barShadow bg-body z-30">
            <a href="/SaltySandivs" className="option-button">
              <div className="sandiv-button-shadow"></div>
              <div className="absolute">Tuzlu Sandivs</div>
            </a>

            <a href="/YourSandiv" className="kendiSandivin option-button">
              <div className="sandiv-button-shadow"></div>
              <div className="absolute">Kendi Sandivin</div>
            </a>

            <a href="/SweetSandivs" className="option-button">
              <div className="sandiv-button-shadow"></div>
              <div className="absolute">Tatlı Sandivs</div>
            </a>
          </div>
        )}

        {children}

        <div className="h-auto xl:h-72 w-full flex justify-between items-center bg-bar py-6 px-10 border-t-3 border-border-pink footerShadow flex-col xl:flex-row gap-5 xl:gap-0">
          <div className="footerBar">
            <h4>Site Haritası</h4>
            <a href="/Home">Ana Sayfa</a>
            <a href="/SaltySandivs">Ürünler</a>
            <a href="/Campaigns">Kampanyalar</a>
            <a href="/Restaurants">Restorantlar</a>
            <a href="/About">Hakkımızda</a>
          </div>

          <div className="footerBar">
            <h4>Ürünlerimiz</h4>
            <a href="/SaltySandivs">Tuzlu Sandivs</a>
            <a href="/YourSandiv">Kendi Sandivin</a>
            <a href="/SweetSandivs">Tatlı Sandivs</a>
          </div>

          <div className="footerBar">
            <h4>Diger</h4>
            <a href="">Görüs ve Önerileriniz</a>
            <a href="">Yasal Notlar</a>
            <a href="">Aydınlatma Metni</a>
            <a href="">Paket Servis Dagıtım Alanları</a>
            <a href="">Çerez Ayarları</a>
          </div>

          <a href="/Home" className="h-40 w-40 hidden xl:block">
            <img
              src="/logo.png"
              className="rounded-2xl border-solid border-3 border-border-pink"
            />
          </a>

          <div className="Copyright">
            <h3>
              <b>Copyright 2024 © Sandiv</b>
            </h3>
            <p>
              Tüm hakları saklıdır. Sandiv® markası ve logosu, Sandiv Gıda ve
              Ticaret A.Ş.'nin tescilli mülküdür.
              <br />
              Sandiv, müşterilerine en kaliteli ve lezzetli sandivler sunmayı
              taahhüt eden bir marka olarak,
              <br />
              hijyen ve müşteri memnuniyetini en üst düzeyde tutar.
            </p>
            <br />

            <h3>
              <b>Sandiv Gıda ve Ticaret A.Ş.</b>
            </h3>
            <p>
              yalnızca resmi sipariş kanalları olan{" "}
              <b>
                Sandiv Mobil Uygulaması, Sandiv Web Sitesi ve Sandiv
                <br />
                İletişim Hattı
              </b>{" "}
              aracılığıyla sipariş kabul etmektedir. Bu platformlar dışındaki
              kaynaklardan
              <br />
              verilen siparişlerin güvenliği ve doğruluğu şirketimiz
              sorumluluğunda değildir. Sandiv olarak,
              <br />
              tüm müşterilerimize güvenli, lezzetli ve kaliteli bir deneyim
              sunmak için çalışıyoruz. Bizi tercih
              <br />
              ettiğiniz için teşekkür eder, keyifli bir yemek deneyimi dileriz.
            </p>
            <br />
            <a
              href="https://ecerez.vercel.app/"
              className="fontFamily text-xl text-white"
            >
              Ecerez
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
