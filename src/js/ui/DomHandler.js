class DomHandler {
    constructor(onLoginButtonClick) {
        this.loginModal = new bootstrap.Modal(document.getElementById('modalLogin'), {
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
    }

    showLoginModal() {
        this.loginModal.show();
    }

    hideLoginModal() {
        this.loginModal.hide();
    }
}