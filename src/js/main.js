window.onload = function () {
    let domHandler = new DomHandler(onLoginButtonClick, onGameStartClick, onDecisionSubmit);
    let connHandler = new ConnectionHandler(onAccept, onGameStart, onRequestDecision, onGameState, onGameEnd, onError);
    let renderer = new Render();

    domHandler.showLoginModal();

    function onLoginButtonClick(user, lobby, server, port) {
        connHandler.connect(user, lobby, server, port);
    }

    function onGameStartClick() {
        connHandler.send(messages.createStartRequest());
    }

    function onDecisionSubmit(decision) {
        connHandler.send(messages.createGenericReply(decision));
    }

    function onAccept(body) {
        domHandler.hideLoginModal();
        console.log(body);
        if (body.leader) {
            domHandler.showStartGame();
        } else {
            domHandler.hideStartGame();
        }
    }

    function onGameStart() {
        domHandler.hideStartGame();
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