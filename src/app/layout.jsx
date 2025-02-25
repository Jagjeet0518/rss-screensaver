import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "RSS ScreenSaver",
  description: "A sleek, modern RSS feed screensaver built with Next.js and React. This application fetches and displays RSS feed items with smooth transitions and a starry background, perfect for turning idle screens into informative displays.",
  keywords: "RSS, RSS Feed, RSS Screensaver, RSS Feed Screensaver, RSS Feed Viewer",
  openGraph: {
    type: "website",
    url: "https://rss-screensaver.vercel.app/",
    title: "RSS Screensaver",
    description: "A sleek, modern RSS feed screensaver built with Next.js and React. This application fetches and displays RSS feed items with smooth transitions and a starry background, perfect for turning idle screens into informative displays.",
    siteName: "RSS Screensaver",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased sky`}
      >
        {children}
        <Toaster position="bottom-center" visibleToasts={1} invert richColors />
        <div id="stars" className="stars"></div>
        <div id="stars2" className="stars2"></div>
        <div id="stars3" className="stars3"></div>
      </body>
    </html>
  );
}
