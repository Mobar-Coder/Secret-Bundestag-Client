var connection; 

function myFunction() {
  connection = new WebSocket('wss://echo.websocket.org');

  connection.onopen = function () {
    connection.send(JSON.stringify({messageType: "gameStart", fraction: "liberal", role: "normal"})); // Send the message 'Ping' to the server
  };

  connection.onmessage = function(event) {
    serverMsg = JSON.parse(event.data)
    document.getElementById('demo').innerHTML = (event.data);
    handleServerMessage(serverMsg);
  };
    
  connection.onclose = function(event) {
    if (event.wasClean) {
      alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      alert('[close] Connection died');
    }
  };
}

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
      if(serverMsg.fraction.localeCompare("Fascist") && !serverMsg.role.localeCompare("Hitler")){
          document.getElementById("hitlerName").innerHTML = serverMsg.hitler;
          var teammates = "";
          for(var i = 0; i < serverMsg.teammates.length; i++){
              teammates += serverMsg.teammates[i];
          }
          document.getElementById("teammates").innerHTML = teammates;
      }
      document.getElementById("titleScreen").disabled = true;
      document.getElementById("titleScreen").style.display = "none";
      document.getElementById("basicInfo").disabled = false;
      document.getElementById("basicInfo").style.display = "initial";
  }
  else if(!serverMsg.messageType.localeCompare("decision")){
      
      for(var i = 0; i < serverMsg.teammates.length; i++){
          addButton(serverMsg.choices[i]);
      }
  }
}