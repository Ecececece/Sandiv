import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Sandiv",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body className={`flex font-sandiv flex-col overflow-x-hidden`}>
                <div className="h-44 w-full flex justify-center items-center bg-bar sticky top-0 z-50">
                    <a href="/Home"><img src="/logo.png" className="h-36 rounded-2xl border-solid border-3 border-border-pink"/></a>
                    
                    <a href="/SaltySandivs" className="sandiv-button">
                        <div className="sandiv-button-shadow"></div>
                        <div className="absolute">Ürünler</div>
                    </a>

                    <a href="/Campaigns" className="sandiv-button">
                        <div className="sandiv-button-shadow"></div>
                        <div className="absolute">Kampanyalar</div>
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

                {children}
            </body>
        </html>
    );
}
