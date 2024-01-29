import Link from "next/link";

const products = ['shirt', 'pants', 'skirt', 'shoes'];

export default function ProductPage() {
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
