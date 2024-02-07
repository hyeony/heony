import type { Metadata } from "next";
import Link from 'next/link'
import { Nanum_Gothic } from "next/font/google";

const gothic = Nanum_Gothic({ 
  weight: '700',
  subsets: ['latin'],
 });

import "./globals.css";
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: "타이틀? 연습페이지인걸",
  description: "연습페이지라구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gothic.className}>
      <body className={gothic.className}>
        <header className={styles.header}>
          <h1><Link href={'/'}>HOYOHOYO</Link></h1>
          <nav className={styles.nav}>
            <Link href='/products'>Product</Link>
            <Link href='/sub'>SSSub</Link>
            <Link href='/contact'>Contact</Link>
          </nav>
        </header>
        {children}

      </body>
    </html>
  );
}
