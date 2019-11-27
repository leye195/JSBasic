const body=document.querySelector("body");
const imgArr=['1','2','3','4','5'];
function paintImg(idx){
  const image=new Image();
  image.src=`img/${imgArr[idx]}.jpg`;
  image.classList.add("bgimg");
  body.appendChild(image);
  //image.addEventListener("loadend",)
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}
function init(){
    const idx=getRandomIntInclusive(0,imgArr.length-1);
    paintImg(idx);
}
init();