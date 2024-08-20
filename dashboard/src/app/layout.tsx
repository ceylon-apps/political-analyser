import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";

import {siteConfig} from "@/config/site"
import {ThemeProvider} from "@/components/theme-provider";
import {TailwindIndicator} from "@/components/tailwind-indicator";
import {SiteHeader} from "@/components/site-header";
import {TooltipProvider} from "@/components/ui/tooltip";
import {CounterStoreProvider} from "@/context/providers/counter-store-provider";
import {ChatStoreProvider} from "@/context/providers/chat-store-provider";
// const inter = Inter({subsets: ["latin"]});
const fontInter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})
export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontInter.variable
        )}>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
                <div className="relative flex h-screen flex-col">
                    <SiteHeader/>
                    <div className="container h-full py-2">{children}</div>
                    <div className={"h-6 w-full dark:bg-slate-500"}>

                    </div>
                </div>
                <TailwindIndicator/>
            </TooltipProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
