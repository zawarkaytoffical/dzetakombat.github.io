document.addEventListener('DOMContentLoaded', () => {
    const nicknameContainer = document.getElementById('nicknameContainer');
    const gameContainer = document.getElementById('gameContainer');
    const nicknameInput = document.getElementById('nickname');
    const setNicknameButton = document.getElementById('setNickname');
    const tapButton = document.getElementById('tapButton');
    const clickCountElement = document.getElementById('clickCount');
    const welcomeMessage = document.getElementById('welcomeMessage');

    let nickname = localStorage.getItem('nickname');
    let clickCount = 0;

    // Проверяем, есть ли ник в localStorage
    if (nickname) {
        nicknameContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        welcomeMessage.textContent = `Добро пожаловать, ${nickname}!`;
    }

    // Устанавливаем никнейм
    setNicknameButton.addEventListener('click', () => {
        const enteredNickname = nicknameInput.value.trim();
        if (enteredNickname) {
            nickname = enteredNickname;
            localStorage.setItem('nickname', nickname);
            nicknameContainer.style.display = 'none';
            gameContainer.style.display = 'block';
            welcomeMessage.textContent = `Добро пожаловать, ${nickname}!`;
        }
    });

    // Отправляем клики на сервер
    async function sendClicks() {
        await fetch('/api/clicks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname, clicks: clickCount }),
        });
    }

    // Обрабатываем клики
    tapButton.addEventListener('click', () => {
        clickCount++;
        clickCountElement.textContent = clickCount;
        sendClicks();
    });
});
