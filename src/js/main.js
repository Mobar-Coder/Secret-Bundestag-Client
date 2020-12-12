window.onload = function () {
    let domHandler = new DomHandler(onLoginButtonClick);
    let connHandler = new ConnectionHandler(onAccept, onGameStart, onRequestDecision, onGameState, onGameEnd);
    let renderer = new Render();

    domHandler.showDecisionsModal("Test", ["a", "b"]);

    function onLoginButtonClick(user, lobby, server, port) {
        let success = connHandler.connect(user, lobby, server, port);

        if (!success) {
            domHandler.showErrorModal("Error connecting to server!");
        }
    }

    function onAccept() {
        domHandler.hideLoginModal();
    }

    function onGameStart() {
        renderer.panToTable();
    }

    function onRequestDecision(body) {
        domHandler.showDecisionsModal(body.type, body.choices);
    }

    function onGameState() {

    }

    function onGameEnd() {

    }

}