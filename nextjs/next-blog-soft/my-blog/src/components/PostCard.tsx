import { Post } from "@/service/posts";import Image from "next/image";
import Link from "next/link";
import styles from './PostCard.module.css'

type Props = {post: Post};
export default function PostCard( {post:{title, description, date, category, path}}:Props) {
  return <Link href={`/posts/${path}`} className={styles.postLink}>
    <article className="rounded-md overflow-hidden shadow-md  shadow-md hover:shadow-xl">
      <Image src={`/images/posts/${path}.png`} alt={title} 
      width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} 
      className="postImg" />

      <div className={styles.postTextWrap}>
        <time className={styles.postDate}>{date.toString()}</time>
        <h3 className={styles.postTitle}>{title}</h3>
        <p className={styles.postDesc}>{description}</p>
        <span className={styles.postCtg}>{category}</span>
      </div>
    </article>
  </Link>
}
