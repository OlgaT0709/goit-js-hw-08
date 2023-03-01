
import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = formRef.querySelector('input[name="email"]');
const messageRef = formRef.querySelector('textarea[name="message"]');

       
// Під час завантаження сторінки перевіряємо стан сховища, і якщо там є збережені дані, заповнюємо ними поля форми.
const savedInput = JSON.parse(localStorage.getItem('feedback-form-state'));
if (savedInput !== null) {
    
    emailRef.value = savedInput.email;
    messageRef.value = savedInput.message;
}

// Відстежуємо на формі подію input, і щоразу записуємо у локальне сховище об'єкт з полями email і message, 
// Сховище оновлюється не частіше, ніж раз на 500 мілісекунд (використовуємо бібліотеку lodash.throttle)

formRef.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
    if (event.currentTarget) {
     const { email, message } = event.currentTarget.elements;

    
        const formData = {
            email: email.value,
            message: message.value,
        };
        localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    }
};


// Під час сабміту форми виводимо у консоль об'єкт з полями email, message та їхніми поточними значеннями.
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    const { email, message } = event.currentTarget.elements;
    
    const formData = {
        email: email.value,
        message: message.value,
        };
        console.log(formData);

           
    // очищуємо сховище і поля форми
    event.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
    };
 
    
