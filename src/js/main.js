window.onload = function () {
    let domHandler = new DomHandler(onLoginButtonClick, onGameStartClick, onDecisionSubmit, onWinAccept);
    let connHandler = new ConnectionHandler(onAccept, onGameStart, onRequestDecision, onGameState, onGameEnd, onError);
    let renderer = new Render();

    domHandler.showLoginModal(
        localStorage.getItem("userName"),
        localStorage.getItem("lobby"),
        localStorage.getItem("server"),
        localStorage.getItem("port")
    );

    function onLoginButtonClick(user, lobby, server, port) {
        localStorage.setItem("userName", user);
        localStorage.setItem("lobby", lobby);
        localStorage.setItem("server", server);
        localStorage.setItem("port", port);
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
        if (body.leader) {
            domHandler.showStartGame();
        } else {
            domHandler.hideStartGame();
        }
    }

    function onGameStart(body) {
        domHandler.hideStartGame();
        renderer.panToTable();
        domHandler.setRole(body.role);

    }

    function onRequestDecision(body) {
        domHandler.showDecisionsModal(body.type, body.choices);
    }

    function onGameState(body) {
        renderer.showNumberOfCards(body.liberalPolicies, body.fascistPolicies,
            body.cardPile, body.discardPile);

        domHandler.setPoliciesInfo(body.liberalPolicies, body.fascistPolicies, body.electrionTracker);
        domHandler.setPlayers(body.players);
    }

    function onGameEnd(body) {
        domHandler.showWinner(body.winnerTeam);
    }

    function onError() {
        domHandler.showErrorModal("Error connecting to server!");
    }

    function onWinAccept() {
        renderer.panFromTable(function () {
            domHandler.showLoginModal(
                localStorage.getItem("userName"),
                localStorage.getItem("lobby"),
                localStorage.getItem("server"),
                localStorage.getItem("port")
            );
        });
    }
}