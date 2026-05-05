import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import "./globals.css";

// 메타데이터 설정
export const metadata = {
  title: "MIYAAJD",
  description: "Personal Archive",

  icons: {
    icon: [
      {
        url: "/icons/favicon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/favicon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/icons/favicon/apple-touch-icon.png",
  },
  manifest: "/manifest.json",

  // 아이폰 대응
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MIAAJD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full antialiased`}>
      <body className="site-body">
        {/* header */}
        <Header></Header>
        {/* page */}
        {children}
        {/* footer */}
        <Footer></Footer>
      </body>
    </html>
  );
}
