const scenetop = document.querySelector("#top");
const sceneend = document.querySelector("#end");
const start = document.querySelector("#start");
const start2 = document.querySelector("#start2");
const start3 = document.querySelector("#start3");
const start4 = document.querySelector("#start4");
const scecedisplay = document.querySelector("#display");
let field = document.querySelectorAll(".field");
let turn = document.querySelector("h2");
let judgdisplay = document.querySelector("#judgdisplay");
let game = document.querySelector("#game");
let board = Array(9);
let winflag = true;
let count = 0;

// 勝ちパターンを前列挙した二次元配列
const win_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// 先攻・後攻を決めた時の処理
init();

function init() {
    start.addEventListener('click', player_first, false);
    start2.addEventListener('click', player_second, false);
}

// 操作するプレイヤー名の表示
function turn_action() {
    if (count % 2 == 0) {
        turn.textContent = "コンピューターの番です"
    } else {
        turn.textContent = "あなたの番です"
    }
    Judgment();
    count++;
}

// 操作するプレイヤー名の切り替え
function changescene(hiddenscene, visiblescene) {
    hiddenscene.classList.add("hidden");
    hiddenscene.classList.remove("visible");
    visiblescene.classList.add("visible");
    visiblescene.classList.remove("hidden");
}

// プレイヤーが先攻の場合
function player_first() {
    changescene(scenetop, scecedisplay);
    player();
}

// プレイヤーが後攻の場合
function player_second() {
    changescene(scenetop, scecedisplay);
    count = 3;
    turn.textContent = "コンピューターの番です";
    computer();
    player()
}

//プレイヤー側の処理
function player() {
    for (let i = 0; i < field.length; i++) {
        field[i].onclick = () => {
            console.log(i + "が押されました");
            if (board[i] == undefined) {
                field[i].innerHTML += "<p class=" + "player_tag" + ">" + "◯" + "</p>";
                board[i] = 1;
                turn_action();
                if (winflag) {
                    computer();
                }
            }
        }
    }
}

//コンピュータ側の処理
function computer() {
    game.classList.add('pointer-none'); //画面上の操作を無効にする
    if (board[4] == 1 && count == 1) {
        draw_computer(0); //コンピューターが後攻かつ真ん中が埋まっている時は必ず左上を指す
        return;
    } else if (count == 1) {
        draw_computer(4) // コンピュータ後攻の場合は必ず真ん中を指す
        return;
    }
    //コンピュータが2手目以降の場合の処理
    if (count > 2) {
        for (let j = 2; j > 0; j--) {
            for (let i = 0; i < win_patterns.length; i++) {
                let patterns = win_patterns[i];
                let square1 = (board[patterns[0]]);
                let square2 = (board[patterns[1]]);
                let square3 = (board[patterns[2]]);

                // 3並びで空白を見つける処理
                let x = square1 == undefined && square2 == j && square3 == j
                let y = square1 == j && square2 == undefined && square3 == j
                let z = square1 == j && square2 == j && square3 == undefined

                if (x) {
                    draw_computer(patterns[0]);
                    return;
                } else if (y) {
                    draw_computer(patterns[1]);
                    return;
                } else if (z) {
                    draw_computer(patterns[2]);
                    return;
                }
            }
        }
    }
    if (!count % 2 == 0) {
        let flag = true;
        while (flag) {
            let random = Math.floor(Math.random() * board.length);
            if (board[random] == undefined) {
                draw_computer(random);
                flag = false;
            }
        }
    }

    // コンピュータが指す場所を塗りつぶす
    function draw_computer(place) {
        setTimeout(function () {
            field[place].innerHTML += "<p class=" + "computer_tag" + ">" + "×" + "</p>";
            board[place] = 2;
            game.classList.remove('pointer-none');
            turn_action();
        }, 1000);
    }
}

//3つ並び判定
function Judgment() {

    for (let i = 0; i < win_patterns.length; i++) {
        let patterns = win_patterns[i];
        let square1 = (board[patterns[0]]);
        let square2 = (board[patterns[1]]);
        let square3 = (board[patterns[2]]);
        completed = square1 && square1 == square2 && square2 == square3 && square3 == square1;
        if (completed) {
            if (count % 2 == 0) {
                judgtextcreate(0);
                return;
            } else {
                judgtextcreate(1);
                return;
            }
        }
    }
    if (board.includes(undefined) == false && winflag) {
        judgtextcreate(2)
        return;
    }

    function judgtextcreate(result) {
        let judgtext = ["あなたの勝ちです", "コンピュータの勝ちです", "引き分けです"];
        judgdisplay.textContent = judgtext[result];
        changescene(scenetop, sceneend);
        scecedisplay.classList.remove("visible");
        scecedisplay.classList.add("hidden");
        start3.textContent = "もう一度対戦する";
        start3.onclick = () => {
            document.location.reload()
        };
        game.classList.add('pointer-none');
        winflag = false;
        return;
    }
}