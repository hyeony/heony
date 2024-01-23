import React from 'react';
import ProductNotFound from "../not-found";

type Props = {
  params: {
    slug: string;
  }
}

export default function PantsPage({params}: Props) {
  if(params.slug === 'nothing') {
    return <ProductNotFound />;
  }

  return (
    <div>
      <div>{params.slug} 설명 디테일 페이지</div>
    </div>
  );
}

export function generateStaticParams() {
  const products = ['pants', 'skirt'];
  return products.map(product => ({
    slug: product,
  }));
}
