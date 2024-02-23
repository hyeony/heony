import { readFile } from "fs/promises";
import path from "path";



export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};

export type PostData = Post & {content:string};

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts()
  .then((posts) => posts.filter((post) => post.featured ));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts()
  .then((posts) => posts.filter((post) => post.featured ));
}

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  return readFile(filePath, 'utf-8')
  .then<Post[]>(JSON.parse)
  .then((posts) => posts.sort((a,b) => (a.date> b.date ? -1 : 1)));

}


//함수를 만들고, 파일 이름을 전달해야하는데 
//promise비동기 함수고
//전달하는 타입은 Psot는 일반 메타데이터 정보를 가지고 있었고
//그 컨텐츠가 들어있는 PostData라는타입을 반환해주도록 한다.
export async function getPostData(fileName: string): Promise<PostData> {
  const filepath = path.join(process.cwd(), 'data', 'posts',`${fileName}.md`);
  const metadata = await getAllPosts() //
  .then((posts) => posts.find((post) => post.path === fileName));
  if(!metadata) throw new Error(`$(fileName)에 해당하는 포스트를 찾을 수 없음`);

  const content = await readFile(filepath, 'utf-8');
  return{...metadata, content};
}