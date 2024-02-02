const xonalar = document.getElementById("xonalar")
const daily = document.getElementById("daily")
const info = document.getElementById("info")


let rooms = [
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
        title: '3-xona PS5',
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
    {
        id: 5,
        title: '5-xona PS3',
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
        id: 6,
        title: '6-xona PS3',
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
        id: 7,
        title: '7-xona PS3',
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
        id: 1,
        title: '8-xona PS3',
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
]

let oth = {
    sum: 0,
    oneHour: 15000,
    oneHourPS3: 10000,
    oneHourPS5: 20000,

    dailyClient: 0,
}


let DailyHistory = [

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
    let date = new Date();
    let room = rooms[id]

    room.isOpen = 'getMoney'
    room.close = {
        hour: date.getHours(),
        minute: date.getMinutes(),
    }
    let hour = (room.close.hour - room.open.hour) * 60

    if (room.open.hour > room.close.hour) {
        hour = ((24 - room.open.hour) + room.close.hour) * 60
    }

    let minute = (room.close.minute - room.open.minute)
    if (room.type === 'PS5') {
        room.sum = Math.floor((hour + minute) * (oth.oneHourPS5 / 60))
    } else if (room.type === 'PS3') {
        room.sum = Math.floor((hour + minute) * (oth.oneHourPS3 / 60))
    } else {
        room.sum = Math.floor((hour + minute) * (oth.oneHour / 60))
    }
    Start()

    // open -  close
    // 23:54 - 00:04

}

const getMoney = (id) => {
    let room = rooms[id]

    oth.sum += room.sum
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

    oth.dailyClient += 1
    Start()
}

const onChangeMinus = () => {
    let minusSum = Number(document.getElementById("minusSUm").value);
    oth.sum -= minusSum
    Start()
}


const closeMarket = () => {
    DailyHistory = [...DailyHistory,
    {
        id: (DailyHistory[DailyHistory.length - 1]?.id || 0) + 1,
        day: (DailyHistory[DailyHistory.length - 1]?.day || 0) + 1,
        money: oth.sum,
        client: oth.dailyClient,
    }]
    oth.sum = 0;
    oth.dailyClient = 0

    Start()
}

const Start = () => {
    xonalar.innerHTML = ''
    rooms.map((v, id) => {
        xonalar.innerHTML += `
            <div class="room ${v.id % 2 == 1 ? 'back1' : 'back2'}">
                <div class="title">${v.title}</div>
                <input type="text" value="${v.open.hour} : ${v.open.minute}" disabled class="open input">
                <input type="text" value="${v.close.hour} : ${v.close.minute}" disabled class="close input">
                ${v.isOpen == true ?
                `<button onclick="closeTime(${id})">yopish</button>`
                : v.isOpen == 'getMoney' ?
                    `<button onclick="getMoney(${id})">pulni oldim!</button>` :
                    `<button onclick="openTime(${id})">ochish</button>`
            }
            <input type="text" placeholder="tavsif, misol: 30 minut" class="input">
            <div class="tolashKere">${v.sum}</div>
            </div >
    `
    })

    daily.innerHTML = ""
    daily.innerHTML += `
        <h2>Umumiy Foyda: ${oth.sum} </h2>
        <h2>
        Umumiy hisobdan ayrish:
         <input  class="input" type="text" id="minusSUm"> 
         <button  onclick="onChangeMinus()">Ayrish</button>
         </h2>
         <h2>Bugungi clientlar: ${oth.dailyClient} </h2>
         <button  onclick="closeMarket()">Playsationni Yopish</button>

    `

    info.innerHTML = `
    <div class="room">
                <div>ID</div>
                <div>KUN</div>
                <div>Foyda</div>
                <div>Klientlar soni</div>
    </div>
    `
    DailyHistory.map((v, id) => {
        info.innerHTML += `
            <div class="room ${v.id % 2 == 1 ? 'back1' : 'back2'}">
                <div>${v.id}</div>
                <div>${v.day}</div>
                <div>${v.money}</div>
                <div>${v.client}</div>
            </div>
        `
    })
}


Start()