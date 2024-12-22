import { Geist, Geist_Mono, Open_Sans, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Inventory App",
  description:
    "Sebuah sistem manajemen inventaris sederhana untuk melacak barang di gudang dengan fitur tambah, lihat, edit, dan hapus data barang. Sistem ini dilengkapi tabel responsif untuk menampilkan data secara efisien.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} ${nunito.variable} antialiased`}
      >
        <Toaster
          toastOptions={{
            className: "font-sans",
            style: {
              fontSize: "14px",
            },
          }}
          position="top-center"
          reverseOrder={false}
        />
        {children}
      </body>
    </html>
  );
}
