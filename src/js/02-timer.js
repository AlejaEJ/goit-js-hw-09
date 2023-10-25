import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
      
    const days = addLeadingZero(Math.floor(ms / day));
    
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      
    return { days, hours, minutes, seconds };
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate < new Date()){
            window.alert("Please choose a date in the future");
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', () => {
    const selectedDate = new Date(datetimePicker.value).getTime();

    const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = selectedDate - now;

        if (distance < 0) {
            clearInterval(intervalId);
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(distance);

        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    }, 1000);
});