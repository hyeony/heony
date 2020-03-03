const secondHand = document.querySelector('.second-hand');
const mindHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate(){
	const now = new Date();
	const seconds = now.getSeconds();
	const secondsDegerees = ((seconds / 60) * 360) + 90;
	secondHand.style.transform = `rotate(${secondsDegerees}deg)`;

	const mins = now.getMinutes();
	const minsDegrees = ((mins/60) * 360) + 90;
	mindHand.style.transform = `rotate(${minsDegrees}deg)`;

	const hour = now.getHours();
	const hourDegrees = ((hour / 60) * 360) + 90;
	console.log(hour);
	hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
setInterval(setDate, 1000);
 