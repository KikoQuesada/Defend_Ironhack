document.getElementById('startButton').addEventListener('click', () => {
    const game = new Game('game-canvas');
    game.start();

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event);
    });

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event);
    });
});

