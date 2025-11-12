import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BestGym - ฟิตเนสและยิม ศรีนครินทร์",
  description: "ฟิตเนสและยิมคุณภาพ ใกล้ Seacon ศรีนครินทร์ 45 เปิด จ.-ศ. 08:00-22:00",
  icons: {
    icon: "/BestGym/logo.jpg",
    apple: "/BestGym/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
