import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "RSS ScreenSaver",
  description: "RSS ScreenSaver is a simple RSS reader for the web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`antialiased sky`}
      >
        {children}
        <Toaster />
        <div id="stars" className="stars"></div>
        <div id="stars2" className="stars2"></div>
        <div id="stars3" className="stars3"></div>
      </body>
    </html>
  );
}
