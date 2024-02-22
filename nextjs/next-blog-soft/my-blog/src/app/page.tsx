import CarouselPosts from "@/components/CarouselPosts";
import FeaturedPosts from "@/components/FeaturedPosts";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/** @ts-expect-erro Server Component */}
      <FeaturedPosts />
      {/** @ts-expect-erro Server Component */}
      <CarouselPosts />
    </>
  );
}
