class ConnectionHandler {
    constructor(onAccept, onStart, onRequestDecision, onGameState, onEnd, onError) {
        this.onAccept = onAccept;
        this.onStart = onStart;
        this.onRequestDecision = onRequestDecision;
        this.onGameState = onGameState;
        this.onEnd = onEnd;
        this.onError = onError;
    }

    connect(userName, lobby, server, port) {
        this.connection = new WebSocket("ws://" + server + ":" + port);

        let onErr = this.onError;
        this.connection.onerror = function (err) {
            onErr();
        }

        let conn = this.connection; // Weird implicit closure hack...
        this.connection.onopen = function () {
            conn.send(JSON.stringify(messages.createJoinMessage(userName, lobby)));
        };

        let that = this;
        this.connection.onmessage = function (event) {
            try {
                let json = JSON.parse(event.data);

                switch (json.name) {
                    case "Accept":
                        that.onAccept(json.body);
                        break;
                    case "GameStart":
                        that.onStart(json.body);
                        break;
                    case "RequestDecision":
                        that.onRequestDecision(json.body);
                        break;
                    case "GameState":
                        that.onGameState(json.body);
                        break;
                    case "GameEnd":
                        that.onEnd(json.body);
                        break;
                }
            } catch (e) {
                console.warn("Error parsing incoming message", e);
            }
        };
    }

    send(msg) {
        this.connection.send(JSON.stringify(msg));
    }
}