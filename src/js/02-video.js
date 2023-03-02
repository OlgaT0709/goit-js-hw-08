import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const LOCALSTORAGE_KEY = "videoplayer-current-time";

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
    localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
   
  };

// встановлюємо час відтворення з localStorage, якщо він збережений
const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(savedTime);
 
}
// очищуємо localStorage
//  localStorage.removeItem(LOCALSTORAGE_KEY);
