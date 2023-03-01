import Vimeo from '@vimeo/player';
const iframe = document.querySelector('#vimeo-player');

// створюємо плеєр Vimeo 
const player = new Vimeo(iframe, {
  id: 236203659,
  width: 640,
  height: 360,
});

// додаємо обробник події 'timeupdate' до плеєра Vimeo
player.on('timeupdate', function(data) {
  // зберігаємо поточний час відтворення у localStorage
    localStorage.setItem('vimeoPlayerCurrentTime', data.seconds);
   
});

// встановлюємо час відтворення з localStorage, якщо він збережений
const savedTime = localStorage.getItem('vimeoPlayerCurrentTime');
if (savedTime) {
  player.setCurrentTime(savedTime);
}
