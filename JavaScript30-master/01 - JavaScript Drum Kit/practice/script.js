// var keyboardSound = function () {


//   document.onkeydown = function (event) {
//     if (event.which == 65)
//       console.log('키코드:' + event.keyCode);
//   };

// };

// keyboardSound();
function playsound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0; //rewind to the start
  audio.play();
  key.classList.add('playing');
}

function removeTransition(e) {
  if(e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playsound);
