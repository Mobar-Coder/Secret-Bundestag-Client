// function makeMessage(messageName, messageBody){
//     var d = new Date(msSinceEpoch);
//     return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + 'T' +
//            d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
//     var message = {name: messageName, timestamp: d, version: 1, body: messageBody};
//     return JSON.stringify(message);
// }



function makeMessage(messageName, messageBody){
    var d = makeTimestamp();
    var message = {name: messageName, timestamp: d, version: 1, body: messageBody};
    return JSON.stringify(message);
}

function makeTimestamp() {
    var date = new Date();
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2) +
      "." +
      ("0" + date.getMilliseconds()).slice(-3)
    );
  }