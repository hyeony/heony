import { getProducts } from "@/service/products";
import Link from "next/link";


export default async function ProductPage() {
  //서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그걸 보여줌)
  const products = await getProducts();

  return (
    <>
      <div>제품설명디테일페이지</div>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
