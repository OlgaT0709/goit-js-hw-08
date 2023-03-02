
import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = formRef.querySelector('input[name="email"]');
const messageRef = formRef.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = "feedback-form-state";
       
// Під час завантаження сторінки перевіряємо стан сховища, і якщо там є збережені дані, заповнюємо ними поля форми.
const savedInput = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
if (savedInput) {
    
    emailRef.value = savedInput.email;
    messageRef.value = savedInput.message;
}

// Відстежуємо на формі подію input,  
// Сховище оновлюється не частіше, ніж раз на 500 мілісекунд (використовуємо бібліотеку lodash.throttle)

formRef.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {

        const { email, message } = event.target.form.elements;
        const formData = {
            email: email.value,
            message: message.value,
        };
        // і щоразу записуємо у локальне сховище об'єкт з полями email і message,
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
    
};

// Під час сабміту форми 
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    const { email, message } = event.currentTarget.elements;
    // перевіряємо , що поля заповнені 
    if (email.value !== '' && message.value !== '') {
        const formData = {
            email: email.value,
            message: message.value,
        };
        // виводимо у консоль об'єкт з полями email, message та їхніми поточними значеннями.
        console.log(formData);

         
        // очищуємо сховище і поля форми
        event.currentTarget.reset();
        localStorage.removeItem(LOCALSTORAGE_KEY);
    };
};
    

