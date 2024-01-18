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
// обработчик нажатия на клавиши
document.addEventListener("keydown", (e) => {

    // если попыток не осталось
    if (guessesRemaining === 0) {
        // выходим из функции
        return
    }

    // получаем код нажатой клавиши
    let pressedKey = String(e.key)
    // если нажат Backspace и в строке есть хоть один символ
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        // то удаляем последнюю введённую букву
        deleteLetter();
        // и выходим из обработчика
        return;
    }

    // если нажат Enter
    if (pressedKey === "Enter") {
        // проверяем введённое слово
        checkGuess();
        // и выходим из обработчика
        return;
    }

    // проверяем, есть ли введённый символ в английском алфавите
    let found = pressedKey.match(/[a-z]/gi)
    // если нет
    if (!found || found.length > 1) {
        // то выходим из обработчика
        return
    // иначе добавляем введённую букву в новую клетку
    } else {
        insertLetter(pressedKey)
    }
})
// выводим букву в клетку
function insertLetter (pressedKey) {
    // если клетки закончились
    if (nextLetter === 5) {
        // выходим из функции
        return;
    }
    // получаем доступ к текущей строке
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    // и к текущей клетке, где будет появляться буква
    let box = row.children[nextLetter]
    // меняем текст в блоке с клеткой на нажатый символ
    box.textContent = pressedKey
    // добавляем к клетке жирную обводку
    box.classList.add("filled-box")
    // добавляем введённый символ к массиву, в которой хранится наша текущая попытка угадать слово
    currentGuess.push(pressedKey)
    // помечаем, что дальше будем работать со следующей клеткой
    nextLetter += 1
}
