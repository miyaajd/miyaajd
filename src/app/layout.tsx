import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col py-4 px-4 relative">
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
