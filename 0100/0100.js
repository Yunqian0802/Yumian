document.addEventListener("DOMContentLoaded",function(){
    const timeheader = document.getElementById('time-header');
    const timerDisplay = document.getElementById('timer-display');
    const edays =document.getElementById('days');
    const ehours = document.getElementById('hours');
    const eminutes = document.getElementById('minutes');
    const eseconds = document.getElementById('seconds');
    const bgmImage = document.getElementById('bgmImage');  
    const bgm = document.getElementById('bgm');  
     

    let timerType = null;
    let targetDate = new Date("2024-12-31T00:00:00Z");
    let startTime = new Date("2023-12-31T00:00:00Z");
    let intervalId = null;
    let isRotating = false;
    let curVolume = 0.1; 

    function updateTimer(){
        let now = new Date();
        if(timerType === 'countdown' ){
            let timedistance = targetDate - now;
            if(timedistance < 0){
                clearInterval(intervalId);
                timeheader.textContent = '相遇纪念日已过';
                edays.textContent='00';
                ehours.textContent='00';
                eminutes.textContent='00';
                eseconds.textContent='00';
                alert('别担心，未来不止下一个纪念日');
                return;
            }
           setTimerDisplay( Math.floor(timedistance/(1000*60*60*24)),/*向下取整*/
            Math.floor((timedistance%(1000*60*60*24))/(1000*60*60)),
            Math.floor((timedistance%(1000*60*60))/(1000*60)),
            Math.floor((timedistance%(1000*60))/1000));

            

        }else if(timerType === 'uptime'){
            let timedistance =now-(startTime||new Date(0));
            setTimerDisplay( Math.floor(timedistance/(1000*60*60*24)),/*向下取整*/
            Math.floor((timedistance%(1000*60*60*24))/(1000*60*60)),
            Math.floor((timedistance%(1000*60*60))/(1000*60)),
            Math.floor((timedistance%(1000*60))/1000));
    
            if(Math.floor(timedistance / (1000 * 60 * 60 * 24)) >= 365) {
                clearInterval(intervalId);
                timeheader.textContent='这是我们的又一年';
                alert('这是我们的又一年');
            }
        }
    }
    function setTimerDisplay(days,hours,minutes,seconds){
    edays.textContent = String(days).padStart(2,'0');/*padStart(2, '0') 确保字符串至少有两个字符，如果不足，则在前面添加零。例如，如果 days 是 5，则结果字符串是 "05"。
    小时数格式化：*/
    ehours.textContent = String(hours).padStart(2,'0');
    eminutes.textContent = String(minutes).padStart(2,'0');
    eseconds.textContent = String(seconds).padStart(2,'0');}

    function resetTimerDisplay(){
        setTimerDisplay(0,0,0,0);
    }
    function startTimer(type){
        timerType = type;
        if (timerType === 'countdown') {  
            timeheader.textContent = '距重逢还有';  
            updateTimer();  
            intervalId = setInterval(updateTimer, 1000);  
        } else if (timerType === 'uptime') {  
            // startTime = new Date();  
            timeheader.textContent = '距初遇已经过去';  
            updateTimer();  
            intervalId = setInterval(updateTimer, 1000);  
        }  
    }

    document.querySelector('.pic1 img').addEventListener('click', function () {  
        clearInterval(intervalId); // 清除可能存在的旧计时器  
        startTimer('uptime'); // 开始正计时  
    });  
  
    document.querySelector('.pic2 img').addEventListener('click', function () {  
        clearInterval(intervalId); 
        startTimer('countdown'); // 开始倒计时  
    });  

    bgm.volume = curVolume;
    bgmImage.addEventListener('click', function() {  
        if (isRotating) {  
            bgmImage.classList.remove('rotate');  
            bgm.pause();  
        } else {  
            bgmImage.classList.add('rotate');  
            bgm.play();  
        }  
        isRotating = !isRotating;  
    });  
})
    