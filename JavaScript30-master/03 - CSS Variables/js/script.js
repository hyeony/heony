
//qauerySeletAll will give you array. something called a NodeList
const inputs = document.querySelectorAll('.controls input');

//array는 array로 다룰수있는 map and reduce와 같은 모든종류의방법
/*
console에 inputs 를 찍어보면 단지 proto에 entries, for each 두개의
메소드를 등등을 볼 수 있음.

 하지만 배열을 콘솔에찍어서 proto를 보면
 concat(),Array(),fill().. 등등 배열로 사용하는 모든 메소드를 볼 수 있음
*/
/*
종종 NodeList를 배열로 바꾸기도하는데,
지금은 foreach만 사용할거기때문에 foreach를 지원하지않는 브라우저가아니라면
그냥 작업을 진행해도됨.
*/

function handleUpdate(){
	//dataset은 모든 어떤 엘리먼트 내 data attributes 포함하고있는
	const suffix = this.dataset.sizing || '';
	document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
	console.log(suffix);
}

//각 input의 change event 확인
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

