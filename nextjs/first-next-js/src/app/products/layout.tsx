import Link from 'next/link'
import styles from './layout.module.css'
import { Metadata } from 'next';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "타이틀? 멋진 제풉사이드",
  description: "제품을 판매하는곳",
};

export default function ProductLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className={styles.prdNav}>
        <Link href='/products/women'>여성옷</Link>
        <Link href='/products/man'>남성옷</Link>
      </nav>
      <section className={styles.prd}>
        {children}
      </section>
    </>
  )
}