let currentPuzzle = 1;
let solvedPuzzles = 0; // 解いた問題数
let reachedPuzzle9 = false; // 問9に進んだかどうか
const puzzles = [
    { title: "問題1",question: "問題1", correctAnswer: "1", hint: "ヒント1", image: "" },
    { title: "問題2",question: "問題2", correctAnswer: "2", hint: "ヒント2", image: "" },
    { title: "問題3",question: "問題3", correctAnswer: "3", hint: "ヒント3", image: "" },
    { title: "問題4",question: "問題4", correctAnswer: "4", hint: "ヒント4", image: "" },
    { title: "問題5",question: "きがあうときに灰色のひらがなの上向きをつなげてよもう", correctAnswer: "5", hint: "ヒント5", image: "" },
    { title: "問題6",question: "問題6", correctAnswer: "6", hint: "ヒント6", image: "" },
    { title: "問題7",question: "問題7", correctAnswer: "7", hint: "ヒント7", image: "" },
    { title: "問題8",question: "すべての問題から仲間外れを見つけ出し、\nこの謎の指示に従おう", correctAnswer: "8", hint: "ヒント8", image: "" },
    { title: "問題9",question: "問題9", correctAnswer: "9", hint: "ヒント9", image: "" } // 9問目
];

let answers = {}; // 各問題に対する回答を記録
let hintsDisplayed = {}; // ヒントが表示されたかどうかを記録
let hintCount = 0; // ヒント表示回数をカウント


// 問題選択メニューの表示/非表示を切り替える
function toggleMenu() {
    const menuContainer = document.getElementById('menu-container');
    const isMenuVisible = menuContainer.style.display === 'flex';
    
    // メニューの表示・非表示を切り替え
    menuContainer.style.display = isMenuVisible ? 'none' : 'flex';
}

// 問題の表示
function displayPuzzle() {
    // ヒントを消す
    document.getElementById('message').textContent = '';

    const puzzle = puzzles[currentPuzzle - 1];
      // 題名を表示
    document.getElementById('puzzle-title').textContent = puzzle.title;
    document.getElementById('puzzle-text').textContent = puzzle.question;

    // 画像が存在する場合、画像を表示
    if (puzzle.image) {
        const imgElement = document.createElement('img');
        imgElement.src = puzzle.image;
        imgElement.alt = "問題の画像";
        imgElement.style.width = '100%';
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
        "問題1の解説",
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
    { text: 'あ', top: 25, left: 25, fontSize: '30px', rotate: 30 },
    { text: 'い', top: 200, left: 150, fontSize: '30px', rotate: 45 }, // 45度回転
    { text: 'き', top: 301, left: 221, fontSize: '25px', rotate: 0 }, // -30度回転
    { text: 'え', top: 400, left: 450, fontSize: '30px', rotate: 90 }, // 90度回転
    { text: 'お', top: 500, left: 600, fontSize: '35px', rotate: 135 }, // 135度回転
    { text: 'か', top: 150, left: 600, fontSize: '35px', rotate: 0 },
    { text: 'う', top: 250, left: 100, fontSize: '30px', rotate: 180 }, // 180度回転
    { text: 'く', top: 350, left: 200, fontSize: '35px', rotate: -60 }, // -60度回転
    { text: 'け', top: 450, left: 350, fontSize: '30px', rotate: 30 }, // 30度回転
    { text: 'こ', top: 550, left: 500, fontSize: '40px', rotate: -90 }, // -90度回転
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
        }, 2000);

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
    document.getElementById('clear-message').textContent = "パーフェクトクリア！\nおめでとう！";
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('clear-screen').style.display = 'block';
    document.getElementById('retry-button').style.display = 'none'; // もう一度挑戦するボタンを非表示
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
