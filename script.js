// импортируем слова из файла
import { WORDS } from "./words.js";

// количество попыток
const NUMBER_OF_GUESSES = 6;
// сколько попыток осталось
let guessesRemaining = NUMBER_OF_GUESSES;
// текущая попытка
let currentGuess = [];
// следующая буква
let nextLetter = 0;
// загаданное слово
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
// на всякий случай выведем в консоль загаданное слово, чтобы проверить, как работает игра
console.log(rightGuessString)
// создаём игровое поле
function initBoard() {
    // получаем доступ к блоку на странице
    let board = document.getElementById("game-board");

    // создаём строки
    // делаем цикл от 1 до 6, потому что попыток у нас как раз 6
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        // создаём новый блок на странице
        let row = document.createElement("div")
        // добавляем к нему класс, чтобы потом работать со строками напрямую
        row.className = "letter-row"
        
        // создаём отдельные клетки
        // добавляем по 5 клеток в ряд
        for (let j = 0; j < 5; j++) {
            // создаём новый блок на странице
            let box = document.createElement("div")
            // добавляем к нему класс
            box.className = "letter-box"
            // вкладываем новый блок внутрь блока со строкой
            row.appendChild(box)
        }

        // как все 5 клеток готовы, добавляем новую строку на поле
        board.appendChild(row)
    }
}

// рисуем игровое поле
initBoard();
