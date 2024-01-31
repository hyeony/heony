// Import necessary dependencies and components
import { getProduct, getProducts } from "@/service/products";
import ProductNotFound from "../not-found";
import { notFound } from "next/navigation";
type Props = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Props) {
  return { title: `제품의 이름: ${params.slug}` };
}

export default async function ProductPage({ params: {slug} }: Props) {
  const product = await getProduct(slug);

  if(!product) {
    notFound();
  }

  return (
    //서버 파일에 있는 데이트중 해당 제품의 정보를 찾아서 그걸 보여줌
    <div>
      <div>{product.name} 설명 디테일 페이지</div>
    </div>
  );
}

export async function generateStaticParams() {
  //모든 제품의 페이지들을 미리 만들어 둘 수 있게 해줄거임(ssg)
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.name,
  }));
}
  