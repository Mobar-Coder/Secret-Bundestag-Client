class ConnectionHandler {
    constructor(onStart, onRequestDecision, onGameState, onEnd) {
        this.onStart = onStart;
        this.onRequestDecision = onRequestDecision;
        this.onGameState = onGameState;
        this.onEnd = onEnd;
    }

    connect(userName, lobby, server, port) {
        try {
            this.connection = new WebSocket("ws://" + server + ":" + port);
        } catch (e) {
            console.warn(e);
            this.connection = null;
            return false;
        }

        let conn = this.connection; // Weird implicit closure hack...
        this.connection.onopen = function () {
            conn.send(JSON.stringify(messages.createJoinMessage(name, lobby)));
        }

        return true;
    }
}