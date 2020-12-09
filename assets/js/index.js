const game = new Game('game-canvas');

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startButton').style.display = 'none';
    game.start();

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event);
    });

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event);
    });
});

