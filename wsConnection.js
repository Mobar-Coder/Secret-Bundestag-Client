var connection; 

function coonnect(){
  connection = new WebSocket('wss://' + document.getElementById("ip").value + ":" + document.getElementById("port").value);
  connection.onopen = function (){
    var msg = {messageType: "signup", name: document.getElementById("name").value, lobby:document.getElementById("lobby").value};
    connection.send(JSON.stringify(msg));
  }

  connection.onmessage = function(event) {
    serverMsg = JSON.parse(event.data)
    document.getElementById('demo').innerHTML = (event.data);
    handleServerMessage(serverMsg);
  };

  connection.onclose = function(event) {
    document.getElementById("titleScreen").disabled = false;
    document.getElementById("titleScreen").style.display = "initial";
    document.getElementById("basicInfo").disabled = true;
    document.getElementById("basicInfo").style.display = "none";
    document.getElementById("gameState").disabled = true;
    document.getElementById("gameState").style.display = "none";
    if (event.wasClean) {
      alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      alert('[close] Connection died');
    }
  };
}

function handleServerMessage(serverMsg){
  if(!serverMsg.messageType.localeCompare("gameStart")){
      document.getElementById("myRole").innerHTML = serverMsg.role;
      document.getElementById("myFraction").innerHTML = serverMsg.fraction;
      players = "";
      for(var i = 0; i < serverMsg.players.length; i++){
        players += serverMsg.players[i] + "\n";
      }
      document.getElementById("players").innerText = players;
      if(!serverMsg.fraction.localeCompare("fascist") && serverMsg.role.localeCompare("Hitler")){
          document.getElementById("hitlerName").innerHTML = serverMsg.hitler;
          var teammates = "";
          for(var i = 0; i < serverMsg.teammates.length; i++){
              teammates += serverMsg.teammates[i];
          }
          document.getElementById("teamMates").innerHTML = teammates;
      }
      document.getElementById("titleScreen").disabled = true;
      document.getElementById("titleScreen").style.display = "none";
      document.getElementById("basicInfo").disabled = false;
      document.getElementById("basicInfo").style.display = "initial";
      document.getElementById("gameState").disabled = false;
      document.getElementById("gameState").style.display = "inline-block";
  }
  else if(!serverMsg.messageType.localeCompare("decision")){
      
      for(var i = 0; i < serverMsg.choices.length; i++){
          addButton(serverMsg.choices[i]);
      }
  }
  else if(!serverMsg.messageType.localeCompare("gameState")){
    document.getElementById("libPol").innerText = serverMsg.liberalPolicies;
    document.getElementById("fasPol").innerText = serverMsg.fascistPolicies;
    document.getElementById("chancellor").innerText = serverMsg.chancellor;
    document.getElementById("candidate").innerText = serverMsg.candidate;
    document.getElementById("president").innerText = serverMsg.president;
  }
  else if(!serverMsg.messageType.localeCompare("gameEnd")){
    connection.close();
    document.getElementById("titleScreen").disabled = false;
      document.getElementById("titleScreen").style.display = "initial";
      document.getElementById("basicInfo").disabled = true;
      document.getElementById("basicInfo").style.display = "none";
      document.getElementById("gameState").disabled = true;
      document.getElementById("gameState").style.display = "none";
  }
}