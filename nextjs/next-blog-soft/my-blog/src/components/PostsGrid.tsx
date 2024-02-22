import { Post } from '@/service/posts.tsx'
import PostCard from './PostCard';
import styles  from './PostCard.module.css';

type Props = {posts: Post[]};

export default function PostsGrid({posts}:Props){
  return (
      <ul className={`${styles.postUl} grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` }>
        {posts.map((post) => (
          <li key={post.path} className={styles.postLi}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
  );
}

