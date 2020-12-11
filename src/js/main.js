window.onload = function () {
    let domHandler = new DomHandler(onLoginButtonClick);
    let connHandler = new ConnectionHandler();
    let renderer = new Render();

    domHandler.showLoginModal();

    function onLoginButtonClick(user, lobby, server, port) {
        let success = connHandler.connect(user, lobby, server, port);

        if (success) {
            domHandler.hideLoginModal();
        } else {
            // @TODO error
        }
    }

}