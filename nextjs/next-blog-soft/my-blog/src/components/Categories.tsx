import styles from './PostCard.module.css'

type Props = {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
}
export default function Categories( {categories, selected, onClick}: Props ) {
  return (
    <div className='mt-7'>
      <h2>Category</h2>
      <ul className={styles.postCtgUl}>
        {categories.map((category) => (
          // 이벤트는 따로 앖고 prop으로 전달받은 onClick을 호출
          //현재 선택된 카테고리를 전달
          <li className={styles.postCtgLi} key={category} onClick={() => onClick(category)} >{category}</li>
        ))}
      </ul>
    </div>
  )
}
