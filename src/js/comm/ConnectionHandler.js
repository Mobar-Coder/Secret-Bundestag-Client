class ConnectionHandler {
    constructor(onAccept, onStart, onRequestDecision, onGameState, onEnd) {
        this.onAccept = onAccept;
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
        };

        this.connection.onmessage = function (event) {
            try {
                let json = JSON.parse(event.data);

                switch (json.name) {
                    case "Accept":
                        this.onAccept(json.body);
                        break;
                    case "GameStart":
                        this.onStart(json.body);
                        break;
                    case "RequestDecision":
                        this.onRequestDecision(json.body);
                        break;
                    case "GameState":
                        this.onGameState(json.body);
                        break;
                    case "GameEnd":
                        this.onEnd(json.body);
                        break;
                }
            } catch (e) {
                console.warn("Error parsing incomming message", e);
            }
        }

        return true;
    }
}