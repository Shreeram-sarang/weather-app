import './style.css'

const key='5c4ad26b2348695b1c5af3d5ab23fde3'
let city
const baseURL=`https://api.openweathermap.org/data/2.5/weather?`
const button=document.querySelector('button')

let wind=document.querySelector('#speed')
let humidity=document.querySelector('#humidity')
let place=document.querySelector('.place')
let temp=document.querySelector('.temp')
let climate=document.querySelector('.climate').querySelector('img')

button.addEventListener('click',
    (event)=>{
        event.preventDefault(); 
        city=document.querySelector('input').value
        console.log("before calling search"+city)
        search(city)
        console.log("after calling search")
    })


async function search(city){
    const url=`${baseURL}q=${city}&appid=${key}`
    console.log('before try in search')
    try{
    const response=await fetch(url)
    const data=await response.json()
    console.log(data)
    update(data)
    }
    catch(error){
        console.log('error fetching weather data')
    }
}

function update(data){
    
    let x=data.weather[0].main
    const weatherStatus=['Clouds','Clear',]
    const imgLinks=['/public/images/cloudy.png','./public/images/clearSun.png']
    console.log(x)

    wind.innerHTML=data.wind.speed+'km/hr'
    place.innerHTML=data.name
    temp.innerHTML=Math.round(data.main.temp-273)+"&deg; C"
    humidity.innerHTML=Math.round(data.main.humidity)+'%'

    for (let i=0;i<weatherStatus.length;i++){
        if (x===weatherStatus[i]){
        climate.src=imgLinks[i]
        }
    }
    
}