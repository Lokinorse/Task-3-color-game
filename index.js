/* !!!Задание недоделано. Успел сделать только таймер!!! */
var board = [];
var columns = [1, 2, 3, 4];
//Stopwatch:
var seconds = 0;
var minutes = 0;
var hours = 0;


function setColors(){
    board.forEach(function(el){
/*         return el.color='black' */
    })
}


var app = new Vue({
    el: '#app',
    data: function () {
        for (i = 0; i < 4; i++) {
            for (l = 0; l < 4; l++) {
                board.push({ x: i, y: l })
            }
        }
        return {
            board,
            colorBox:['red','blue','white','green','orange','red','chocolate'] ,
            stopWatchData: "00:00:00",
        }
    },
    methods: {
        stopWatch: function () {
            setInterval(function add() {
/*                 Каждую секунду мы будем прибавлять по одной секунде, пока их не станет более 59, тогда мы прибавим минуту, а секунды обнулим */
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes >= 60) {
                        minutes = 0;
                        hours++;
                    }
                }
/*                 Создаём формат времени с двумя нулями (00:00:00) */
                app.stopWatchData = (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
                    ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
                    ":" + (seconds > 9 ? seconds : "0" + seconds);
            }, 1000)

        }
    },

});
