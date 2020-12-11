window.onload = function () {
    let domHandler = new DomHandler(onLoginButtonClick);
    let connHandler = new ConnectionHandler(onGameStart, onRequestDecision, onGameState, onGameEnd);
    let renderer = new Render();

    domHandler.showDecisionsModal("Test", ["a", "b"]);

    function onLoginButtonClick(user, lobby, server, port) {
        let success = connHandler.connect(user, lobby, server, port);

        if (success) {
            domHandler.hideLoginModal();
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