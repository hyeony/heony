import { useState } from "react"
import "./App.css";
import Experience from "./Experience";
function yourChangeModelFunction(index: number) {
  // index에 따라 다른 모델을 표시하거나 로드하는 로직을 구현합니다.
  console.log(`Changing model to index ${index}`);
  // 예시: 모델 변경하는 로직
}

function App() {
  const [current, setCurrent] = useState(0)


  return (
    <>
      <Experience current={current}  changeModel={yourChangeModelFunction}/>
    </>
  );
}

export default App;
