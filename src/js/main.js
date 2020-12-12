window.onload = function () {
    let domHandler = new DomHandler(onLoginButtonClick);
    let connHandler = new ConnectionHandler(onAccept, onGameStart, onRequestDecision, onGameState, onGameEnd, onError);
    let renderer = new Render();

    domHandler.showLoginModal();

    function onLoginButtonClick(user, lobby, server, port) {
        connHandler.connect(user, lobby, server, port);
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

    function onError() {
        domHandler.showErrorModal("Error connecting to server!");
    }

}