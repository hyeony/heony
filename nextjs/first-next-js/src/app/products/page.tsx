import { getProducts } from "@/service/products";
import Link from "next/link";

const products = getProducts();

export default function ProductPage() {
  //서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그걸 보여줌)
  return (
    <>
      <div>제품설명디테일페이지</div>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link href={`products/${product}`}>{product}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
