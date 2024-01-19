import "./globals.css";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Copyright from "./sections/Copyright";

export async function generateMetadata() {
  return {
    generator: "GameCove",
    applicationName: "GameCove",
    referrer: "origin-when-cross-origin",
    keywords: ["Game"],
    authors: [
      { name: "Fachry Dwi Afriza", url: "https://fachryafrz.vercel.app" },
    ],
    colorScheme: "dark",
    creator: "Fachry Dwi Afriza",
    publisher: "Fachry Dwi Afriza",
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    title: {
      default: "GameCove",
      template: "%s - GameCove",
    },
    description: `Your ultimate destination for all things gaming! Explore the latest information about a wide range of games, from popular titles to upcoming releases. Our modern design and user-friendly interface provide an enjoyable browsing experience as you discover details about your favorite games. Whether you're a casual or hardcore gamer, GameCove is here to satisfy your curiosity.`,
    metadataBase: new URL(`https://gamecove.vercel.app`),
    alternates: {
      canonical: "/",
      languages: "en-US",
    },
    openGraph: {
      title: "GameCove",
      description: `Your ultimate destination for all things gaming! Explore the latest information about a wide range of games, from popular titles to upcoming releases. Our modern design and user-friendly interface provide an enjoyable browsing experience as you discover details about your favorite games. Whether you're a casual or hardcore gamer, GameCove is here to satisfy your curiosity.`,
      url: process.env.APP_URL,
      siteName: "GameCove",
      images: "/logo.png",
      locale: "en_US",
      type: "website",
    },
    themeColor: "#202735",
    manifest: "/manifest.json",
    twitter: {
      card: "summary_large_image",
      title: "GameCove",
      description: `Your ultimate destination for all things gaming! Explore the latest information about a wide range of games, from popular titles to upcoming releases. Our modern design and user-friendly interface provide an enjoyable browsing experience as you discover details about your favorite games. Whether you're a casual or hardcore gamer, GameCove is here to satisfy your curiosity.`,
      creator: "@fachryafrz",
      images: "/logo.png",
    },
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
      other: {
        me: ["fachrydwiafriza@gmail.com", "https://fachryafrz.vercel.app"],
      },
    },
    category: "entertainment",
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={`true`}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-outfit bg-primary-bg text-white`}>
        {/* Navbar */}
        <Navbar />

        <main className={`min-h-[100dvh] mx-auto p-4 max-w-none`}>
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Copyright */}
        <Copyright />
      </body>
    </html>
  );
}
