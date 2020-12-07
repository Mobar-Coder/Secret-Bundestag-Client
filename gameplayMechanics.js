function addButton(buttonText){
    var newButton = document.createElement('button');
    newButton.innerText = buttonText;
    newButton.onclick = function(){
        var msg = {decision: newButton.innerText};
        connection.send(makeMessage("genericReply", msg));
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

function updatePlayersField(serverMsg){
    players = "";
      for(var i = 0; i < serverMsg.players.length; i++){
        players += serverMsg.body.players[i].name;
        if(!serverMsg.body.players[i].alive){
          players += " dead";
        }
        if(serverMsg.body.players[i].govRole){
          players += " " + serverMsg.body.players[i].govRole;
        }
        players += "\n"
      }
      document.getElementById("players").innerText = players;
}



