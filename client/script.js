import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loarder(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.'; // add + '.'

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300) // 300 millisec
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {  // we are still typing.
      element.innerHTML += text.chartAt(index) // get character under a specific index in the text that AI is going to return
      index++;
    } else {
      clearInterval(interval)
    }
  }, 20) // 20 millisec
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`
}

function chatStripe(isAi, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div class="profile">
            <img
            src="${isAi ? bot : user}"
            />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();
   const data = new FormData(form);

   // user's chatStripe
   chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
   form.reset();
}