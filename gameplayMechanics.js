function addButton(buttonText){
    var newButton = document.createElement('button');
    newButton.innerText = buttonText;
    newButton.onclick = function(){
        var msg = {messageType: "reply", choice: newButton.innerText};
        connection.send(JSON.stringify(msg));
        removeButtons();
    }

    document.getElementById("choices").appendChild(newButton);
}

function removeButtons(){
    var div = document.getElementById("test");
    while(div.firstChild){
        div.removeChild(div.lastChild)
    }
}



