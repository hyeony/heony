type Props = {
  params: {
    slug: string;
  }
}

export default function PantsPage({params}: Props) {
  return (
    <div>
      <div>{params.slug}설명디테일페이지</div>

    </div>
    
  )
}
