const form=document.querySelector(".memo-form"),
input=form.querySelector("input");
greeting=document.querySelector('.memo-greetings');
const SHOW_CN="showing";
function saveName(text){
    localStorage.currentUser=text;
}
function handleSubmit(e){
    e.preventDefault();
    const currentValue=input.value;
    paintGreeting(currentValue); 
    saveName(currentValue);
}
function askForName(){
    form.classList.add(SHOW_CN);
    form.addEventListener('submit',handleSubmit);
}
function paintGreeting(text){
    form.classList.remove(SHOW_CN);
    greeting.classList.add(SHOW_CN);
    greeting.innerText=`Hello ${text}`;
}
function loadName(){
    const currentUser=localStorage.currentUser;
    if(currentUser===undefined){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init();