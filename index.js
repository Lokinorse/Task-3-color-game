let board = [];
let pairs = [];
let columns = [1, 2, 3, 4];

let seconds = 0;
let minutes = 0;
let hours = 0;



let app = new Vue({
    el: '#app',
    data: function () {
        const colorBox = ['red', 'blue', 'black', 'green', 'orange', 'violet', 'chocolate', 'white']
        //Добавляем ещё по паре цветов
        colorBox.map(function (el) {
            colorBox.push(el);
        })
        let varColor = function () {
            let random = [Math.floor(Math.random() * colorBox.length)]
            let chosenColor = colorBox[random];
            colorBox.splice(random, 1);
            return chosenColor
        }
        for (i = 0; i < 16; i++) {
            board.push({ ind: i, color: varColor(), head: true })
        }


        return {
            board,
            stopWatchIsOn: false,
            counter: 0,
            indexSequence: [],
            stopWatchData: "00:00:00",

        }
    },

    methods: {

        stopWatch: function () {
            app.stopWatchIsOn = true;
            setInterval(function add() {
                /*Каждую секунду мы будем прибавлять по одной секунде, пока их не станет более 59, тогда мы прибавим минуту, а секунды обнулим */
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes >= 60) {
                        minutes = 0;
                        hours++;
                    }
                }
                /* Создаём формат времени с двумя нулями (00:00:00) */
                app.stopWatchData = (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
                    ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
                    ":" + (seconds > 9 ? seconds : "0" + seconds);
            }, 1000)
        },
        turnIt: function (e) {
            if (app.stopWatchIsOn == true) {
                app.counter += 1;
                /*             При нажатии на клетку меняет значение св-ва head на false,
                            чтобы появился цвет клетки. */
                let currentIndex = board[e.target.innerHTML].ind;
                if (app.counter < 3) {
                    app.board[currentIndex].head = false;
                }
                /*             Добавляем цвет клетки, на которую только что нажали в массив,
                            colorSequence, чтобы иметь возможность открыть угаданные клетки. */

                app.indexSequence.push(currentIndex)
                let currentColor = app.board[currentIndex].color
                let previousColor = app.board[app.indexSequence[app.indexSequence.length - 2]].color;

                if (app.counter == 2) {
                    app.counter = 0;
                /* Если игроку удалось последовательно открыть две клетки определённого цвета, то закрашиваем их 
                с помощью св-ва head. */
                    if (previousColor !== currentColor) {
/*                         Используем setTimeout, чтобы отобразить юзеру цвет клетки, в случае, если он не угадал. */
                        setTimeout(function () {
                            app.board[currentIndex].head = true;
                            app.board[app.indexSequence[app.indexSequence.length - 2]].head = true;

                        }, 200)
                    }

                }

                if (app.counter > 2) {
                    app.counter = 0;
                }

            }
            function areAllHeadsTrue(el) {
                return el.head === false
            }
/*             Если все клетки закрашены (имеют св-во head = true), то игрок победил, показываем alert */
            if (app.board.every(areAllHeadsTrue)) {
                alert('Вы выиграли!\n Затраченное время:' + app.stopWatchData)
            }

        }
    },


});
