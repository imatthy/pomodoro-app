const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const session = document.querySelector('.minutes');
const message = document.querySelector('.app-message');
const h1 = document.querySelector('h1');
const counter = document.querySelector('.app-counter-box');
const options = document.querySelector('.app-options');
const resetBtn = document.querySelector('.btn-reset');
const stopBtn = document.querySelector('.btn-stop');
const resumeBtn = document.querySelector('.btn-resume');
const themes = document.querySelector('.themes');
const bgOptions = document.querySelectorAll('.bgOptions');


let myInterval;
let state = true;
options.disabled = true;
resumeBtn.disabled = true;
bgOptions.forEach(option => {
    option.disabled = true;
});

const appTimer = (totalSeconds) => {

    if(state) {
        message.style.animation='fadeOut 1s forwards';
        startBtn.style.animation='fadeOut 1s forwards';
        startBtn.disabled = true;
        h1.style.animation='move 2s forwards';
        h1.style.animation='size 2s forwards';
        counter.style.animation='moveCounter 3s forwards';
        counter.style.animation='sizeCounter 3s forwards';
        options.disabled = false;
        options.style.animation='fadeIn 3s forwards';
        resumeBtn.style.opacity = 0;
        message.disabled = true;
        state = false;
        
        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');
            
            totalSeconds--;
            
            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if(secondsLeft < 10){
                secondDiv.textContent = `0${secondsLeft}`;
            }else{
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;
            
            if(minutesLeft === 0 && secondsLeft === 0){
                bells.play();
                clearInterval(myInterval);
            }

            globalThis.totalSeconds = totalSeconds;
        }

        resetBtn.addEventListener('click', () => {
            clearInterval(myInterval);
            message.style.animation='fadeIn 1s forwards';
            startBtn.style.animation='fadeIn 1s forwards';
            h1.style.animation='moveBack 2s forwards';
            h1.style.animation='sizeBack 2s forwards';
            counter.style.animation='moveBackCounter 2s forwards';
            counter.style.animation='sizeBackCounter 2s forwards';
            options.style.animation='fadeOut 2s forwards';
            options.disabled = true;
            startBtn.disabled = false;
            message.disabled = false;
            stopBtn.style.animation='fadeIn 1s forwards';
            resumeBtn.style.animation='fadeOut 1s forwards';
            resumeBtn.disabled = true;
            stopBtn.disabled = false;
            state = true;
            clearInterval(myInterval);
            session.textContent = 25;
            document.querySelector('.seconds').textContent = '00';
        });
        myInterval = setInterval(updateSeconds, 1000);
    }
}

startBtn.addEventListener('click', () => {
    let sessionAmount = Number.parseInt(session.textContent);
    let totalSeconds = sessionAmount * 60;
    appTimer(totalSeconds);
});

stopBtn.addEventListener('click', () => {
    clearInterval(myInterval);
    stopBtn.style.animation='fadeOut 1s forwards';
    resumeBtn.style.animation='fadeIn 1s forwards';
    stopBtn.disabled = true;
    resumeBtn.disabled = false;
});

resumeBtn.addEventListener('click', () => {
    stopBtn.style.animation='fadeIn 1s forwards';
    resumeBtn.style.animation='fadeOut 1s forwards';
    resumeBtn.disabled = true;
    stopBtn.disabled = false;
    state = true;
    appTimer(totalSeconds);
});

themes.addEventListener('click', () => {
    themes.style.animation='fadeOut 1s forwards';
    bgOptions.forEach(option => {
        option.style.animation='fadeIn 1s forwards';
        option.disabled = false;
    });
 });

bgOptions.forEach(option => {
    option.addEventListener('click', () => {
        const imagePath = option.querySelector('img').src;
        document.querySelector('html').style.backgroundImage = `url(${imagePath})`;
        themes.style.animation='fadeIn 1s forwards';
        bgOptions.forEach(option => {
            option.style.animation='fadeOut 1s forwards';
            option.disabled = true;
        });
    });
});