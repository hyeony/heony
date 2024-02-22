import { getNonFeaturedPosts } from "@/service/posts";
import PostCard from "./PostCard";
import MultiCarousel from "./MultiCarousel";

export default async function CarouselPosts() {
  const posts = await getNonFeaturedPosts();

  return <section className="mt-20">
    <h2 className="text-2xl font-semobold text-center">You may like</h2>
    <MultiCarousel>
      {posts.map((post) =>( 
        <PostCard  key={post.path} post={post} />
      ))}
    </MultiCarousel>
  </section>
}