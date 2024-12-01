document.addEventListener('DOMContentLoaded', () => {
    const nicknameContainer = document.getElementById('nicknameContainer');
    const gameContainer = document.getElementById('gameContainer');
    const nicknameInput = document.getElementById('nickname');
    const setNicknameButton = document.getElementById('setNickname');
    const tapButton = document.getElementById('tapButton');
    const resetButton = document.getElementById('resetButton');
    const clickCountElement = document.getElementById('clickCount');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Проверяем, есть ли ник и клики в localStorage
    let nickname = localStorage.getItem('nickname');
    let clickCount = parseInt(localStorage.getItem('clicks'), 10) || 0;

    if (nickname) {
        nicknameContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        welcomeMessage.textContent = `Добро пожаловать, ${nickname}!`;
        clickCountElement.textContent = clickCount;
    }

    // Устанавливаем никнейм
    setNicknameButton.addEventListener('click', () => {
        const enteredNickname = nicknameInput.value.trim();
        if (enteredNickname) {
            nickname = enteredNickname;
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('clicks', 0); // Обнуляем клики при создании ника
            clickCount = 0;
            nicknameContainer.style.display = 'none';
            gameContainer.style.display = 'block';
            welcomeMessage.textContent = `Добро пожаловать, ${nickname}!`;
            clickCountElement.textContent = clickCount;
        }
    });

    // Обрабатываем клики
    tapButton.addEventListener('click', () => {
        clickCount++;
        localStorage.setItem('clicks', clickCount);
        clickCountElement.textContent = clickCount;
    });

    // Сброс кликов
    resetButton.addEventListener('click', () => {
        clickCount = 0;
        localStorage.setItem('clicks', 0);
        clickCountElement.textContent = clickCount;
    });
});
