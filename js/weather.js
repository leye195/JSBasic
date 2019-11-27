const weatherContainer=document.querySelector(".memo-weather");
const API_KEY="5190672c2133015e104260d0bbaf055d";
function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then((response)=>{
        //const weatherData=response.json();
        //console.log(weatherData);
        //console.log(response.json()));
        return response.json()
    }).then((data)=>{
        const{main,name,weather,sys}=data;
        //console.log(main);
        const temp=document.querySelector(".temp");
        temp.innerHTML=`Weather in ${name}(${sys.country}) ${main.temp}°C`;
    })
}
function saveCoords(obj){
    localStorage.coords=JSON.stringify(obj);
}
function handleGeoSuccess(pos){
    console.log(pos);
    const {coords}=pos;
    console.log(coords);
    const coordsObj={
        latitude:coords.latitude,
        longitude:coords.longitude,
    };
    saveCoords(coordsObj);
    getWeather(coordsObj.latitude,coordsObj.longitude);
}
function handleGeoError(){
    console.log('Can not access geolocation');
}
function askForCoords(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
    }else{
        alert("Geolocation is not supported");
    }
}
function loadCoords(){
    const loadedCoords=localStorage.coords;
    if(!loadedCoords){
        askForCoords();
    }else{
        //get weather
        const parsedCoords=JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
    loadCoords(); 
}
init();