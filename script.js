const xonalar = document.getElementById("xonalar")
const daily = document.getElementById("daily")
const info = document.getElementById("info")
const todayBalans = document.getElementById("todayBalans")
const TodayClients = document.getElementById("TodayClients")
const changeBalansButton = document.getElementById("changeBalansButton")
const PS3 = document.getElementById("PS3")
const PS5 = document.getElementById("PS5")
let minusSumDesc = document.getElementById("minusSumDesc")
let minusesBody = document.getElementById("minusesBody")



let rooms = JSON.parse(localStorage.getItem('rooms')) || [
    {
        id: 1,
        title: '1-xona PS3',
        type: 'PS3',
        open: {
            hour: 0,
            minute: 0,
        },
        close: {
            hour: 0,
            minute: 0,
        },
        sum: 0,
        isOpen: false,
    },
    {
        id: 2,
        title: '2-xona PS3',
        type: 'PS3',
        open: {
            hour: 0,
            minute: 0,
        },
        close: {
            hour: 0,
            minute: 0,
        },
        sum: 0,
        isOpen: false,
    },
    {
        id: 3,
        title: '3-xona PS3',
        type: 'PS3',
        open: {
            hour: 0,
            minute: 0,
        },
        close: {
            hour: 0,
            minute: 0,
        },
        sum: 0,
        isOpen: false,
    },
    {
        id: 4,
        title: '4-xona PS3',
        type: 'PS3',
        open: {
            hour: 0,
            minute: 0,
        },
        close: {
            hour: 0,
            minute: 0,
        },
        sum: 0,
        isOpen: false,
    },
    {
        id: 5,
        title: '5-xona PS5',
        type: 'PS5',
        open: {
            hour: 0,
            minute: 0,
        },
        close: {
            hour: 0,
            minute: 0,
        },
        sum: 0,
        isOpen: false,
    },
]


let oth = {
    sum: 0,
    oneHour: 15000,
    oneHourPS3: localStorage.getItem('PS3') || 10000,
    oneHourPS5: localStorage.getItem('PS5') || 20000,

    dailyClient: 0,

    newPS3: localStorage.getItem('PS3') || 10000,
    newPS5: localStorage.getItem('PS5') || 10000
}


let DailyHistory = JSON.parse(localStorage.getItem('daily')) || [

]

let Kun = new Date();

let Today = JSON.parse(localStorage.getItem('today')) || {
    id: (DailyHistory[0]?.id || 0) + 1,
    day: `${Kun.getDate()}/${Kun.getMonth() + 1}/${Kun.getFullYear()}`,
    money: 0,
    client: 0,
    history: [
        {}
    ]
}

let Minuses = JSON.parse(localStorage.getItem('minuses')) || [
]

const openTime = (id) => {
    let date = new Date();
    let room = rooms[id]
    room.isOpen = true
    room.open = {
        hour: date.getHours(),
        minute: date.getMinutes(),
    }
    Start()
}

const closeTime = (id) => {
    let room = rooms[id]

    room.isOpen = 'getMoney'

    let hour = (room.close.hour - room.open.hour) * 60

    if (room.open.hour > room.close.hour) {
        hour = ((24 - room.open.hour) * 60) + (room.close.hour * 60)
    }

    let minute = (room.close.minute - room.open.minute)
    if (room.type === 'PS5') {
        room.sum = Math.floor((Number(hour) + Number(minute)) * (oth.oneHourPS5 / 60))
    } else if (room.type === 'PS3') {
        room.sum = Math.floor((Number(hour) + Number(minute)) * (oth.oneHourPS3 / 60))

    }

    Start()
}

const onchangeCloseTime = (id, type) => {
    let room = rooms[id - 1]

    closeH = document.getElementById(`closeH${id}`).value
    closeM = document.getElementById(`closeM${id}`).value

    if (type === 'h') {
        console.log(closeH);
        room.close = {
            hour: closeH,
            minute: room.close.minute,
        }
    } else if (type === 'm') {
        console.log(closeM);
        room.close = {
            hour: room.close.hour,
            minute: closeM,
        }
    } else {
        console.log('error', type, closeH, closeM);
    }

    Start()
}

const getMoney = (id) => {
    let room = rooms[id]

    Today.money += room.sum
    Today.client += 1

    Today = {
        id: (DailyHistory[0]?.id || 0) + 1,
        day: `${Kun.getDate()}/${Kun.getMonth() + 1}/${Kun.getFullYear()}`,
        money: Today.money || 0,
        client: Today.client || 0,
        history: [
            ...Today.history
        ]
    }

    Today.history.push({
        id: (Today.history[Today.length - 1] || id || 0) + 1,
        title: room.title,
        start: room.start,
        close: room.close,
        money: room.sum,
    })

    localStorage.setItem('today', JSON.stringify(Today))

    room.sum = 0;

    room.open = {
        hour: 0,
        minute: 0,
    }

    room.close = {
        hour: 0,
        minute: 0,
    }

    room.isOpen = false;

    Start()
}

const onChangeMinus = () => {
    let minusSum = Number(document.getElementById("minusSUm").value);
    let minusSumDesc = document.getElementById("minusSumDesc")


    Minuses = [
        {
            id: (Minuses[0]?.id || 0) + 1,
            desc: minusSumDesc.value || 'Nomalum',
            date: Today.day || `${Kun.getDate()}/${Kun.getMonth() + 1}/${Kun.getFullYear()}`,
            sum: minusSum || 0
        },
        ...Minuses
    ]
    localStorage.setItem('minuses', JSON.stringify(Minuses))
    Today.money -= minusSum || 0
    console.log(Minuses);
    Start()
}


const closeMarket = () => {
    DailyHistory = [Today, ...DailyHistory]

    localStorage.setItem('daily', JSON.stringify(DailyHistory))
    Today = {
        id: (DailyHistory[0]?.id || 0) + 1,
        day: `${Kun.getDate()}/${Kun.getMonth() + 1}/${Kun.getFullYear()}`,
        money: 0,
        client: 0,
        history: [
            {}
        ]
    }
    localStorage.setItem('today', JSON.stringify(Today))


    Start()
}

let openChangeBalans = 1


PS3.addEventListener('change', (event) => {
    oth.newPS3 = event.target.value
})

PS5.addEventListener('change', (event) => {
    oth.newPS5 = event.target.value
})

const changePSBalans = () => {
    openChangeBalans = !openChangeBalans
    if (openChangeBalans) {
        changeBalansButton.innerText = 'Saqlash';
        PS5.removeAttribute('disabled')
        PS3.removeAttribute('disabled')

        PS3.value = oth.oneHourPS3
        PS5.value = oth.oneHourPS5

    } else {
        changeBalansButton.innerText = 'O\'zgartirish'
        PS5.setAttribute('disabled', 'true')
        PS3.setAttribute('disabled', 'true')

        oth.oneHourPS3 = oth.newPS3 || 0
        oth.oneHourPS5 = oth.newPS5 || 0
        PS3.value = oth.oneHourPS3
        PS5.value = oth.oneHourPS5

        localStorage.setItem('PS3', oth.oneHourPS3)
        localStorage.setItem('PS5', oth.oneHourPS5)
    }

    Start()
}


const DailyHistoryRead = () => {
    info.innerHTML = `
    <div class="roomDaily  top">
                <div>KUN</div>
                <div>Foyda</div>
                <div>Klientlar soni</div>
    </div>
    `

    if (DailyHistory.length) {
        DailyHistory.map((v, i) => {
            info.innerHTML += `
                <div class="roomDaily Pointer ${i % 2 == 1 ? 'back1' : 'back2'}">
                    <div>${v.day}</div>
                    <div>${v.money}</div>
                    <div>${v.client}</div>
                </div>
            `
        })
    } else {
        info.innerHTML += `
        <div class="roomDaily  notFund">
                    <div class="notFund">Bu yerda kunlik malumotlar chiqadi...</div>
        </div>
        `
    }
}

const DailyInfo = (type = 'minus', day) => {
    if (type == 'minus') {
        minusesBody.innerHTML = ''
        minusesBody.innerHTML = `<div class="room top">
            <div>Kun</div>
            <div>minus</div>
            <div>tavsif</div>
        </div>`
        if (Minuses.length) {
            Minuses.map((v) => {
                minusesBody.innerHTML += `<div class="minusRow ${v.id % 2 === 1 ? 'back1' : 'back2'}">
                    <div class="rightborder">${v.date}</div>
                    <div class="rightborder">${v.sum}</div>
                    <div>${v.desc}</div>
                </div>`
            })

        } else {
            minusesBody.innerHTML += `
            <div class="roomDaily  notFund">
                        <div class="notFund">Bu yerda Barcha rasxodlar chiqadi...</div>
            </div>
            `
        }
    } else if (type === 'dayInfo') {

    }

}

const RoomsRead = () => {
    localStorage.setItem('rooms', JSON.stringify(rooms))

    xonalar.innerHTML = ''
    rooms.map((v, id) => {
        xonalar.innerHTML += `
            <div class="room ${v.id % 2 == 1 ? 'back1' : 'back2'}">
                <div class="title">${v.title}</div>
                <input type="text" value="${v.open.hour} : ${v.open.minute}" disabled class="open input smallnumber">
                <div>
                    <input 
                        ${v.open.hour ? "" : 'disabled'} 
                        type="text" 
                        id="closeH${v.id}"
                        value="${v.close.hour}"  
                        onchange="onchangeCloseTime(${v.id},'h')" 
                        class="close input verysmallnumber"
                    >
                    <input 
                        ${v.open.minute ? "" : 'disabled'} 
                        type="text" 
                        id="closeM${v.id}"
                        value="${v.close.minute}"  
                        onchange="onchangeCloseTime(${v.id},'m')" 
                        class="close input verysmallnumber"
                     >
                </div>
                ${v.isOpen == true ?
                `<button onclick="closeTime(${id})">yopish</button>`
                : v.isOpen == 'getMoney' ?
                    `<button onclick="getMoney(${id})">pulni oldim!</button>` :
                    `<button onclick="openTime(${id})">ochish</button>`
            }
            <input type="text" placeholder="tavsif, misol: 30 minut" class="input ">
            <div class="tolashKere">${v.sum}</div>
            </div >
    `
    })
}


const Start = () => {

    RoomsRead()
    DailyInfo()


    todayBalans.innerText = `${Today.money}`
    TodayClients.innerText = `${Today.client}`

    DailyHistoryRead()
}

Start()
changePSBalans()