import Link from 'next/link'
import styles from './layout.module.css'

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