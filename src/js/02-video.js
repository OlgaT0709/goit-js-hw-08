import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

// створюємо плеєр Vimeo 
const player = new Vimeo(iframe, {
  id: 236203659,
  width: 640,
  height: 360,
});

// додаємо обробник події 'timeupdate' до плеєра Vimeo і додаємо throttle, 
// щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду
player.on('timeupdate', throttle(onPlayerTimeupdate, 1000));

  // зберігаємо поточний час відтворення у localStorage
  function onPlayerTimeupdate (data){
    localStorage.setItem('videoplayer-current-time', data.seconds);
   
  };

// встановлюємо час відтворення з localStorage, якщо він збережений
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
 
}
// очищуємо localStorage
 localStorage.removeItem('videoplayer-current-time');
