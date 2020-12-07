function myFunction() {
    connection = new WebSocket('wss://echo.websocket.org');
  
    connection.onopen = function () {
      connection.send(JSON.stringify({messageType: "gameStart", fraction: "fascist", role: "normal", players: ["Albert", "Guenther", "Arnold", "Jakob", "Sepp"], hitler: "Guenther", teammates: []})); // Send the message 'Ping' to the server
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

  function testDecision(){
    connection.send(JSON.stringify({messageType: "decision", choices: ["Yes", "No"]}));
  }