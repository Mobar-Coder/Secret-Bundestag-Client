window.onload = function () {
    let domHandler = new DomHandler(onLoginButtonClick);
    let connHandler = new ConnectionHandler(onGameStart, onRequestDecision, onGameState, onGameEnd);
    let renderer = new Render();

    domHandler.showLoginModal();

    function onLoginButtonClick(user, lobby, server, port) {
        let success = connHandler.connect(user, lobby, server, port);

        if (success) {
            domHandler.hideLoginModal();
            renderer.panToTable();
        } else {
            // @TODO error
        }
    }

    function onGameStart() {
        renderer.panToTable();
    }

    function onRequestDecision() {

    }

    function onGameState() {

    }

    function onGameEnd() {

    }

}