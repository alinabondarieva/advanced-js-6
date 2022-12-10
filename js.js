// поясніть своїми словами, як ви розумієте поняття асинхронності у Javascript


// Завдання
// Написати програму "Я тебе знайду по IP"
// Технічні вимоги:
// Створити просту HTML-сторінку з кнопкою Знайти по IP.
// Натиснувши кнопку - надіслати AJAX запит за адресою https://api.ipify.org/?format=json, отримати звідти IP адресу клієнта.
// Дізнавшись IP адресу, надіслати запит на сервіс https://ip-api.com/ та отримати інформацію про фізичну адресу.
// під кнопкою вивести на сторінку інформацію, отриману з останнього запиту – континент, країна, регіон, місто, район.
// Усі запити на сервер необхідно виконати за допомогою async await.

const btn = document.createElement("button")
const parent = document.querySelector("#root")  
const url = "https://api.ipify.org/?format=json"
const baseUrl = "http://ip-api.com"
btn.innerText = "Я тебе знайду по IP"
parent.append(btn) 
btn.addEventListener("click", async function (event){
    event.preventDefault()
    const ip = await getIp(url)
    const adress = await getAdress(baseUrl, ip)
    renderData(adress)
})
async function getIp(url){
   const response = await fetch(url)
   const data = await response.json()
   return data.ip
}

async function getAdress(baseUrl, ip){
    const response = await fetch(`${baseUrl}/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`)
    const data = await response.json()
    return data
}

function renderData(adress){
    parent.insertAdjacentHTML("beforeend", `<div><p>${adress.status}</p><p>${adress.message}</p><p>${adress.continent}</p><p>${adress.continentCode}</p><p>${adress.country}</p><p>${adress.countryCode}</p><p>${adress.region}</p><p>${adress.regionName}</p><p>${adress.city}</p><p><${adress.zip}/p><p>${adress.lat}</p><p>${adress.lon}</p><p></p><p>${adress.timezone}</p><p>${adress.isp}</p><p>${adress.org}</p><p>${adress.as}</p><p>${adress.query}</p></div>`)
 console.log(adress)
}