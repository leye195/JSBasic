const clockContainer=document.querySelector(".memo-clock");
const clockTitle=document.querySelector(".clock-title");

function getTime(){
    const date=new Date();
    const hours=date.getHours(),minutes=date.getMinutes(),seconds=date.getSeconds();
    clockTitle.innerHTML=`${hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?'0'+seconds:seconds}`;
}
function init(){
    getTime();
    setInterval(getTime,1000);
}
init();