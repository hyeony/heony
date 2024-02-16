import { GetStaticPaths, GetStaticProps } from "next";
import { serializeMdx } from "../libs/mdx";
import { getAllPosts } from "../libs/post";

export const getStaticPaths: GetStaticPaths =  () => {
  const posts = getAllPosts();

  return {
    paths: posts.map( (post) => post.slug), 
      fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({params} ) => {
  const { slugs } = params as { slugs: string[] };

  // const slug = `/posts/${[...slugs].join('/')}`;
  const slug = [...slugs].join(`/`);
  // const post = getAllPosts().find( (post) => post.slug === slug );
  const post = getAllPosts().find( (v) => v.slang === slug );

  if(!post){
    return {
      notFound: true,
    };
  }

  const mdx = await serializeMdx(post.content);

  return {
    props: { mdx },
  };

};

export default function PostPage( {mdx}: {mdx: MDXRemoteSerializeResult} ){
  return (
    <div className="prose dark:prose-dark mt-4 w-full max-w-none">
      <MDXRemote { ...mdx} />
    </div>
  );
}

