function makeMessage(messageName, messageBody){
    var d = new Date(msSinceEpoch);
    return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() + 'T' +
           d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
    var message = {name: messageName, timestamp: d, version: 1, body: messageBody};
    return JSON.stringify(message);
}