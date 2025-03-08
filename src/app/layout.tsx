import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spherical Camera Tests",
  description: "Experiments with a spherical camera, 3D gaussian splatting, and R3F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
