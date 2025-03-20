const options = document.querySelectorAll(".img");
const start = document.getElementById("start");
const tMins = document.getElementById("b1");
const oMins = document.getElementById("b2");
const tSecs = document.getElementById("b3");
const oSecs = document.getElementById("b4");
const lobby = document.querySelector(".lobby");
const timerDisplay = document.querySelector(".timerDisplay");
const timerStopped = document.querySelector(".timerStopped");
const images = document.querySelectorAll('.img');
const reset = document.getElementById("resetBtn");
const rest = document.getElementById("restBtn");
const back = document.getElementById("backBtn");
const stop = document.getElementById("stopTimer");
const sound = document.getElementById("sound");
const customBtn = document.getElementById("customTime");
let selectedTime = '';
let timer = '';


customBtn.addEventListener("click", () => {
    let input = window.prompt("Enter starting time: (1 to 60 mins)");
    if(input > 60 || input < 1 || isNaN(input)){
        alert("Invalid input!");
        return;
    } 
    startTimer(input);
});

function stopSound(){
    sound.pause();
    sound.currentTime = 0;
}

stop.addEventListener("click", () => {
    console.log("Timer stopped!");
    backToLobby();
});
back.addEventListener("click", () => backToLobby());

function backToLobby(){
    stopSound();
    clearInterval(timer);
    displayTime(0);

    images.forEach(i => i.classList.remove('active'));

    lobby.style.display = "flex";
    timerDisplay.style.display = "none";
    timerStopped.style.display = "none";
 
    selectedTime = '';
};


reset.addEventListener("click", () => {    
    stopSound();
    lobby.style.display = "none";
    timerDisplay.style.display = "flex";
    timerStopped.style.display = "none";
     
    startTimer(selectedTime);
    console.log("Timer reset!");
});

rest.addEventListener("click", () => {    
    stopSound();
    lobby.style.display = "none";
    timerDisplay.style.display = "flex";
    timerStopped.style.display = "none";
    
    selectedTime = '5';
    startTimer(selectedTime);
});

images.forEach(img => {
    img.addEventListener('click', () => {
        images.forEach(i => i.classList.remove('active'));

        img.classList.add('active');
    });
});


options.forEach(option =>{
    option.addEventListener("click", () =>{
        const timeValue = option.dataset.time;
        console.log(timeValue);
        if(timeValue !==''){
            selectedTime = parseInt(timeValue);
        }
    });
});

start.addEventListener("click", () => {
    if(selectedTime){
        startTimer(selectedTime);
    } else {
        alert("Select a time before starting!");
    }
});


function startTimer(time){
    lobby.style.display = "none";
    timerDisplay.style.display = "flex";
    timerStopped.style.display = "none";

    console.log("started");
    let totalCount = (time * 60);
    displayTime(totalCount);
    // let totalCount = 5;
    
    timer = setInterval(() => {
        if(totalCount > 0){
            totalCount--;
            displayTime(totalCount);
        } else {
            sound.pause();
            sound.currentTime = 0;
            sound.play();
            clearInterval(timer);
            console.log("Done")
            lobby.style.display = "none";
            timerDisplay.style.display = "none";
            timerStopped.style.display = "flex";
        }
    }, 1000);
}

function displayTime(time){
    tMins.textContent = Math.floor((time/60)/10);
    oMins.textContent = Math.floor((time/60)%10);
    tSecs.textContent = Math.floor((time%60)/10);
    oSecs.textContent = Math.floor((time%60)%10);
}