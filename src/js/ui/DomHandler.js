class DomHandler {
    constructor(onLoginButtonClick) {
        this.loginModal = new bootstrap.Modal(document.getElementById('modalLogin'), {
            backdrop: false,
            keyboard: false
        });

        this.decisionModal = new bootstrap.Modal(document.getElementById('modalDecisions'), {
            backdrop: false,
            keyboard: false
        });

        this.errorModal = new bootstrap.Modal(document.getElementById('modalDecisions'));

        $("#loginButtonConnect").click(function () {
            onLoginButtonClick(
                $("#loginInputName").val(),
                $("#loginInputLobby").val(),
                $("#loginInputServer").val(),
                $("#loginInputPort").val()
            );
        });
    }

    showLoginModal() {
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
                + "\"> <label class=\"form-check-label\" for=\"" + opt + "\">" + opt + "</label>"
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

    hideErrorModal() {
        this.errorModal.hide();
    }
}