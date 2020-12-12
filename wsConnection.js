var connection; 

function connect(){
  connection = new WebSocket('ws://' + document.getElementById("ip").value + ":" + document.getElementById("port").value);
  connection.onopen = function (){
    var msg = {name: document.getElementById("name").value, lobby:document.getElementById("lobby").value};
    connection.send(makeMessage("JoinRequest", msg));
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
  if(!serverMsg.name.localeCompare("gameStart")){
      document.getElementById("myRole").innerHTML = serverMsg.body.role;
      document.getElementById("myFraction").innerHTML = serverMsg.body.fraction;
      updatePlayersField(serverMsg)
      if(!serverMsg.fraction.localeCompare("fascist") && serverMsg.body.role.localeCompare("Hitler")){
          document.getElementById("hitlerName").innerHTML = serverMsg.body.hitler;
          var teammates = "";
          for(var i = 0; i < serverMsg.body.teammates.length; i++){
              teammates += serverMsg.body.teammates[i];
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
  else if(!serverMsg.name.localeCompare("requestDecision")){
      
      for(var i = 0; i < serverMsg.body.choices.length; i++){
          addButton(serverMsg.body.choices[i]);
      }
  }
  else if(!serverMsg.name.localeCompare("gameState")){
    document.getElementById("libPol").innerText = serverMsg.body.liberalPolicies;
    document.getElementById("fasPol").innerText = serverMsg.body.fascistPolicies;
    updatePlayersField(serverMsg);
    document.getElementById("electionTracker").innerText = serverMsg.body.electionTracker;
    document.getElementById("cardPile").innerText = serverMsg.body.cardPile;
    document.getElementById("discardPile").innerText = serverMsg.body.discardPile;
  }
  else if(!serverMsg.name.localeCompare("gameEnd")){
    connection.close();
    document.getElementById("titleScreen").disabled = false;
      document.getElementById("titleScreen").style.display = "initial";
      document.getElementById("basicInfo").disabled = true;
      document.getElementById("basicInfo").style.display = "none";
      document.getElementById("gameState").disabled = true;
      document.getElementById("gameState").style.display = "none";
  }
}