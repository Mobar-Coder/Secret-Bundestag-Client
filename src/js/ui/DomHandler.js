class DomHandler {
    constructor(onLoginButtonClick, onStartGameClick, onDecisionSubmit, onWinAccept) {
        this.loginModal = new bootstrap.Modal(document.getElementById('modalLogin'), {
            backdrop: false,
            keyboard: false
        });

        this.decisionModal = new bootstrap.Modal(document.getElementById('modalDecisions'), {
            backdrop: false,
            keyboard: false
        });

        this.errorModal = new bootstrap.Modal(document.getElementById('modalError'));

        this.winModal = new bootstrap.Modal(document.getElementById('modalWin'), {
            backdrop: false,
            keyboard: false
        });

        $("#loginButtonConnect").click(function () {
            onLoginButtonClick(
                $("#loginInputName").val(),
                $("#loginInputLobby").val(),
                $("#loginInputServer").val(),
                $("#loginInputPort").val()
            );
        });

        let errorModal = this.errorModal;
        $("#modalErrorClose").click(function () {
            errorModal.hide();
        });

        $("#buttonStartGame").click(onStartGameClick);

        let onSubmit = onDecisionSubmit;
        $("#decisionsButtonSubmit").click(function () {
            let selected = $('input[name=decisionRadio]:checked').val()
            onSubmit(selected);
        })

        let winModal = this.winModal;
        $("#modalWinClose").click(function () {
            winModal.hide();
            onWinAccept();
        });
    }

    showLoginModal(userName, lobby, server, port) {
        if (userName !== undefined) {
            $("#loginInputName").val(userName);
        }
        if (lobby !== undefined) {
            $("#loginInputLobby").val(lobby);
        }
        if (server !== undefined) {
            $("#loginInputServer").val(server);
        }
        if (port !== undefined) {
            $("#loginInputPort").val(port);
        }

        this.loginModal.show();
    }

    hideLoginModal() {
        this.loginModal.hide();
    }

    showDecisionsModal(title, options) {
        $("#decisionsTitle").html(title);

        let optionsHtml = "";
        for (let c = 0; c < options.length; ++c) {
            let opt = options[c];
            optionsHtml +=
                "<div class=\"form-check\">\n"
                + "<input class=\"form-check-input\" type=\"radio\" name=\"decisionsRadio\" id=\"" + opt
                + "\" value='"+opt+"'> <label class=\"form-check-label\" for=\"" + opt + "\">" + opt + "</label>"
                + "</div>";
        }

        $("#decisionsModalBody").html(optionsHtml);

        this.decisionModal.show()
    }

    hideDecisionsModal() {
        this.decisionModal.hide()
    }

    showErrorModal(message) {
        $("#errorModalText").html(message);
        this.errorModal.show();
    }

    showStartGame() {
        $("#buttonStartGame").show();
    }

    hideStartGame() {
        $("#buttonStartGame").hide();
    }

    setRole(role) {
        $("#pRole").html(role);
    }

    setPoliciesInfo(liberalPolicies, fascistPolicies, electionTracker) {
        $("#pPolicies").html("Liberal: " + liberalPolicies, "Fascist: " + fascistPolicies +
            "(Elections: "+ electionTracker + ")");
    }

    setPlayers(players) {
        let html = "";
        for (let c=0; c<players.length; ++c) {
            let text = players[c].name;
            if (players[c].govRole != null) {
                text += " (" + players[c].govRole + ")";
            }
            if (!players[c].alive) {
                text = "<strike>" + text + "</strike>";
            }

            html += "<li>" + text + "</li>";
        }
        $("#listPlayers").html(html);
    }

    showWinner(winner) {
        $("#winModalText").html("The winner is: " + winner);
        this.winModal.show();
    }
}