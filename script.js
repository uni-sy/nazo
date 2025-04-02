let currentPuzzle = 1;
let solvedPuzzles = 0; // 解いた問題数
let reachedPuzzle9 = false; // 問9に進んだかどうか
const puzzles = [
    { title: "問題1",question: "赤つないで読もう", correctAnswer: "1", hint: "ヒント1", image: "7.png" },
    { title: "問題二",question: "謎を解け", c⇦orrectAnswer: "2", hint: "ヒント2", image: "スクリーンショット 2024-06-12 185222.png" },
    { title: "問題3",question: "⇦をつなげ", correctAnswer: "3", hint: "ヒント3", image: "3-1.png" },
    { title: "問題4",question: "ほしを作って△を読もう", correctAnswer: "4", hint: "ヒント4", image: "" },
    { title: "問題5",question: "問題から仲間外れを見つけ出し、この謎の指示に従おう", correctAnswer: "5", hint: "ヒント5", image: "" },
    { title: "問題6",question: "問題6", correctAnswer: "6", hint: "ヒント6", image: "" },
    { title: "問題7",question: "none", correctAnswer: "7", hint: "ヒント7", image: "7.png" },
    { title: "問題8",question: "「は」から、灰色のひらがなの上向きをつなげて指示に従おう", correctAnswer: "8", hint: "はたのうえをよめ", image: "ra1.jpg" },
    { title: "問題9",question: "問題9", correctAnswer: "9", hint: "ヒント9", image: "" } // 9問目
];

let answers = {}; // 各問題に対する回答を記録
let hintsDisplayed = {}; // ヒントが表示されたかどうかを記録
let hintCount = 0; // ヒント表示回数をカウント
let startTime;
let timerInterval;

// 問題選択メニューの表示/非表示を切り替える
function toggleMenu() {
    const menuContainer = document.getElementById('menu-container');
    const isMenuVisible = menuContainer.style.display === 'flex';
    
    // メニューの表示・非表示を切り替え
    menuContainer.style.display = isMenuVisible ? 'none' : 'flex';
}

    //スタート関数
document.addEventListener("DOMContentLoaded", function() {
    // スタートボタンの処理を関数にまとめる
    function startGame() {
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
        document.getElementById("game-container").style.display = "block";

        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    // グローバルに関数を公開
    window.startGame = startGame;
});


function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
    const seconds = String(elapsedTime % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

// ゲームクリア時に時間を表示
function gameClear() {
    clearInterval(timerInterval);
    const finalTime = document.getElementById("timer").textContent;
    alert(`パーフェクトクリア！かかった時間: ${finalTime}`);
}

// 問題の表示
function displayPuzzle() {
    // ヒントを消す
    document.getElementById('message').textContent = '';

    const puzzle = puzzles[currentPuzzle - 1];
    // 題名を表示
    document.getElementById('puzzle-title').textContent = puzzle.title;
    // 問題3のテキストに改行を追加
    document.getElementById('puzzle-text').textContent = puzzle.question;
    
    // 画像が存在する場合、画像を表示
    if (puzzle.image) {
        const imgElement = document.createElement('img');
        imgElement.src = puzzle.image;
        imgElement.alt = "問題の画像";
        imgElement.style.width = '100%';
        imgElement.style.cursor = 'pointer';

        document.getElementById('puzzle-text').appendChild(imgElement);
    }

    // 解答欄の初期化
    document.getElementById('answer-input').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('next-btn').style.display = 'none'; // 「次の問題」ボタンを非表示

    // 解答がすでにある場合、解答ボックスを無効化
    if (answers[currentPuzzle]) {
        document.getElementById('answer-input').disabled = true;
        document.getElementById('answer-input').value = answers[currentPuzzle];
        document.getElementById('answer-button').style.display = 'none'; // 解答ボタンを非表示
        document.getElementById('hint-btn').style.display = 'none'; // ヒントボタンを非表示
    } else {
        document.getElementById('answer-input').disabled = false;
        document.getElementById('answer-button').style.display = 'inline-block'; // 解答ボタンを表示
        document.getElementById('hint-btn').style.display = 'inline-block'; // ヒントボタンを表示
    }

    updateButtons();
}


// ヒントを表示する関数
function showHint() {
    const puzzle = puzzles[currentPuzzle - 1];

    // すでに3回ヒントを表示した場合は表示しない
    if (hintCount >= 3) {
        document.getElementById('message').textContent = "ヒントは3回までです。";
        return;
    }

    // 同じ問題のヒントがすでに表示されている場合は新たに表示しない
    if (hintsDisplayed[currentPuzzle]) {
        return;
    }

    // 現在表示されているヒントを消去（同時に複数のヒントが表示されないようにする）
    document.getElementById('message').textContent = ''; 

    const hintMessage = document.createElement('div');
    hintMessage.textContent = `ヒント: ${puzzle.hint}`;
    hintMessage.style.fontSize = '16px';
    hintMessage.style.marginTop = '10px';
    hintMessage.style.color = '#FF6347'; // ヒントはオレンジ色で表示
    document.getElementById('message').appendChild(hintMessage);

    // ヒント回数をカウント
    hintCount++;

    // ヒント表示の状態を記録
    hintsDisplayed[currentPuzzle] = true; 
}

// ギブアップボタンを押したときの処理
function giveUp() {
    // ギブアップ確認画面を表示
    document.getElementById('give-up-confirmation').style.display = 'block';
}

// ギブアップ確認で「はい」を押したときの処理
function confirmGiveUp() {
    // ギブアップ確認画面を非表示
    document.getElementById('give-up-confirmation').style.display = 'none';
        // ギブアップ時にひらがなを非表示にする
    document.getElementById('hiragana-container').style.display = 'none';

    // ゲームの問題をリセット
    showExplanationScreen();
}

// ギブアップ確認で「いいえ」を押したときの処理
function cancelGiveUp() {
    // ギブアップ確認画面を非表示
    document.getElementById('give-up-confirmation').style.display = 'none';
}

// 解説画面の表示
function showExplanationScreen() {
    document.getElementById('game-container').style.display = 'none'; // ゲーム画面を非表示
    document.getElementById('clear-screen').style.display = 'none'; // ゲームクリア画面を非表示

    const explanationContainer = document.getElementById('explanation-container');
    explanationContainer.style.display = 'block'; // 解説画面を表示

    const explanations = [
        "ラーメン",
        "問題2の解説",
        "問題3の解説",
        "問題4の解説",
        "問題5の解説",
        "問題6の解説",
        "問題7の解説",
        "問題8の解説",
        "問題9の解説"
    ];

    let explanationText = '';
    for (let i = 0; i < explanations.length; i++) {
        explanationText += `<p>問題 ${i + 1}: ${explanations[i]}</p>`;
    }

    explanationContainer.innerHTML = explanationText;
}
// 配置するひらがなのデータ
const hiraganaData = [
    { text: 'は', top: 130, left: -357, fontSize: '20px', rotate: 90 },
    { text: 'い', top: 150, left: -3, fontSize: '30px', rotate: 45 }, // 45度回転
    { text: 'A', top: 351, left: 81, fontSize: '30px', rotate: 270 }, // -30度回転
    { text: 'え', top: -230, left: -50, fontSize: '30px', rotate: 200 }, // 90度回転
    { text: 'お', top: 90, left: -200, fontSize: '25px', rotate: 13 }, // 135度回転
    { text: 'た', top: -90, left: 158, fontSize: '25px', rotate: 180 },
    { text: 'う', top: 880, left: -50, fontSize: '30px', rotate: 0 }, // 180度回転
    { text: 'よ', top: -188, left: -287, fontSize: '35px', rotate: 87 }, // -60度回転
    { text: 'め', top: 0, left: 40, fontSize: '30px', rotate: 30 }, // 30度回転
    { text: 'の', top: 365, left: 340, fontSize: '24px', rotate: 230 }, // -90度回転
    { text: 'さ', top: 290, left: 68, fontSize: '25px', rotate: 280 },
    { text: '？', top: 200, left: 100, fontSize: '25px', rotate: -13},
    { text: 'M', top: 200, left: 100, fontSize: '28px', rotate: 23},
    { text: '魑', top: 250, left: 150, fontSize: '29px', rotate:335},
    { text: 'へ', top: -90, left: -320, fontSize: '26px', rotate: 135},
    { text: '！', top:200, left: 40, fontSize: '30px', rotate: 23},
    { text: 'D', top: 300, left: 30, fontSize: '20px', rotate: 345}
];

// ひらがなを指定された位置とサイズでページに表示
function displayHiragana() {
    const container = document.getElementById('hiragana-container');

    hiraganaData.forEach(item => {
        const hiraganaElement = document.createElement('div');
        hiraganaElement.textContent = item.text;
        hiraganaElement.classList.add('hiragana');
        hiraganaElement.style.top = `${item.top}px`;
        hiraganaElement.style.left = `${item.left}px`;
        hiraganaElement.style.fontSize = item.fontSize;
        hiraganaElement.style.transform = `rotate(${item.rotate}deg)`; // 回転を適用

        container.appendChild(hiraganaElement);
    });
}

// ページが読み込まれた後にひらがなを表示
window.onload = displayHiragana;



// 解答の確認処理
function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const puzzle = puzzles[currentPuzzle - 1];

    // 既に表示されている〇を削除する
    const existingCorrectSymbol = document.querySelector('.correct-answer');
    if (existingCorrectSymbol) {
        existingCorrectSymbol.remove();
    }

    if (userAnswer === puzzle.correctAnswer) {
        // 正解した場合、その部屋（問題）で答えを記録
        answers[currentPuzzle] = userAnswer;

        // 〇を表示
        const correctSymbol = document.createElement('div');
        correctSymbol.classList.add('correct-answer');
        correctSymbol.textContent = "〇";
        document.getElementById('game-container').appendChild(correctSymbol);

        // 2秒後に〇を消す
        setTimeout(() => {
            correctSymbol.classList.add('hidden');
        }, 1500);

        solvedPuzzles++; // 解いた問題数を増加
        updateButtons();

        // 次の問題に進むためのボタンを表示
        if (currentPuzzle < puzzles.length) {
            document.getElementById('next-btn').style.display = 'block';
        }
      // ヒントボタンと解答ボタンを非表示
        document.getElementById('hint-btn').style.display = 'none';
        document.getElementById('answer-button').style.display = 'none';

        // ゲームのクリア判定
        if (!reachedPuzzle9 && solvedPuzzles === 8) {
            showNormalClearScreen(); // ノーマルクリア
        }

        // パーフェクトクリア判定
        if (reachedPuzzle9 && solvedPuzzles === 9) {
            showPerfectClearScreen(); // パーフェクトクリア
        }

        // 解答ボタンを非表示にする
        document.getElementById('answer-button').style.display = 'none';
    } else {
        document.getElementById('message').textContent = "答えが違います。もう一度試してください。";
        setTimeout(() => {
            document.getElementById('message').textContent = '';
        }, 3000); // 3秒後にメッセージを消す
    }
}

    // 次の問題に進む処理
    function nextPuzzle() {
        if (currentPuzzle === 8) {
            // 問8の次で問9に進む
            currentPuzzle = 9;
        reachedPuzzle9 = true; // 問9に進んだ
        displayPuzzle();
    } else if (currentPuzzle === 9) {
        // 問9を解いた後にパーフェクトクリアを表示
        showPerfectClearScreen();
    } else {
        currentPuzzle++;
        displayPuzzle();
    }
}

// ノーマルクリア画面を表示
function showNormalClearScreen() {
    document.getElementById('clear-message').textContent = "ノーマルクリア！";
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('clear-screen').style.display = 'block';
    document.getElementById('retry-button').style.display = 'inline-block'; // もう一度挑戦するボタンを表示
}

// パーフェクトクリア画面を表示
function showPerfectClearScreen() {
    clearInterval(timerInterval); // タイマー停止
    const finalTime = document.getElementById("timer").textContent; // 最終タイム取得
    document.getElementById('hiragana-container').style.display = 'none';
    // クリア画面を作成
    const clearScreen = document.createElement("div");
    clearScreen.id = "perfect-clear-screen";
    clearScreen.style.position = "fixed";
    clearScreen.style.top = "0";
    clearScreen.style.left = "0";
    clearScreen.style.width = "100%";
    clearScreen.style.height = "100%";
    clearScreen.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    clearScreen.style.display = "flex";
    clearScreen.style.flexDirection = "column";
    clearScreen.style.justifyContent = "center";
    clearScreen.style.alignItems = "center";
    clearScreen.style.textAlign = "center";
    clearScreen.style.zIndex = "1000";

    // メッセージ表示
    const message = document.createElement("h1");
    message.textContent = "パーフェクトクリア！";
    message.style.color = "white";
    message.style.fontSize = "3rem";
    message.style.marginBottom = "20px";

    // タイム表示
    const timeDisplay = document.createElement("p");
    timeDisplay.textContent = `かかった時間: ${finalTime}`;
    timeDisplay.style.color = "yellow";
    timeDisplay.style.fontSize = "2rem";

    // 解説ボタン
    const explanationButton = document.createElement("button");
    explanationButton.textContent = "解説を見る";
    explanationButton.style.fontSize = "1.5rem";
    explanationButton.style.padding = "10px 30px";
    explanationButton.style.cursor = "pointer";
    explanationButton.style.border = "none";
    explanationButton.style.backgroundColor = "#ffcc00";
    explanationButton.style.color = "black";
    explanationButton.style.borderRadius = "10px";
    explanationButton.style.marginTop = "20px";
    explanationButton.addEventListener("click", function() {
        clearScreen.remove(); // クリア画面を削除
        showExplanationScreen(); // 解説画面に遷移
    });

    // 画面に要素を追加
    clearScreen.appendChild(message);
    clearScreen.appendChild(timeDisplay);
    clearScreen.appendChild(explanationButton);
    document.body.appendChild(clearScreen);
}


// ゲームのリセット処理
function resetGame() {
    currentPuzzle = 1;
    solvedPuzzles = 0;
    answers = {};
    reachedPuzzle9 = false; // 問9に進んだフラグをリセット
    hintsDisplayed = {}; // ヒント表示のリセット
    hintCount = 0; // ヒント回数のリセット
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('clear-screen').style.display = 'none';
    displayPuzzle();
}

// ボタンの更新（問題番号ボタン）
function updateButtons() {
    const buttonContainer = document.getElementById('menu-container');
    buttonContainer.innerHTML = ''; // 既存のボタンをリセット

    // 問題のボタンを生成
    for (let i = 1; i <= 8; i++) { // 問9を除いたボタンを生成
        const button = document.createElement('button');
        button.textContent = `問題 ${i}`;
        button.onclick = () => goToPuzzle(i);
        
        // 解答した問題は緑色にしてボタンを有効にする
        if (i <= solvedPuzzles || (i === 9 && reachedPuzzle9)) {
            button.style.backgroundColor = '#4CAF50'; // 緑色に変更
        }
        button.disabled = false;
        buttonContainer.appendChild(button);
    }

    // 問9が解放されるまで問題選択メニューに追加しない
    if (reachedPuzzle9) {
        const button = document.createElement('button');
        button.textContent = `問題 9`;
        button.onclick = () => goToPuzzle(9);
        buttonContainer.appendChild(button);
    }
}

// 指定した問題に移動する関数
function goToPuzzle(puzzleNumber) {
    currentPuzzle = puzzleNumber;
    displayPuzzle();
}

// ゲーム開始
displayPuzzle();
