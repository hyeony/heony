import type { Metadata } from "next";
import Link from 'next/link'
import { Nanum_Gothic } from "next/font/google";

const gothic = Nanum_Gothic({ 
  weight: '400',
  subsets: ['latin'],
 });

import "./globals.scss";
import styles from './layout.module.scss'

export const metadata: Metadata = {
  title: "넥스트로블로그만들기",
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
          <h1><Link href={'/'}>Heony</Link></h1>
          <nav className={styles.nav}>
            <Link href='/about'>about</Link>
            <Link href='/post'>blogPost</Link>
            <Link href='/contact'>Contact</Link>
          </nav>
        </header>
        {children}

      </body>
    </html>
  );
}
