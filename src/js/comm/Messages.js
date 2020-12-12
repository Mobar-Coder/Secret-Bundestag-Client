let messages = {
    createMessage: function (name, body) {
        return {
            name: name,
            timestamp: new Date().toISOString(),
            version: 1,
            body: body
        }
    },

    createJoinMessage: function (name, lobby) {
        return this.createMessage("Join", {
            name: name,
            lobby: lobby
        });
    },

    createGenericReply: function (decision) {
        return this.createMessage("Decision", {
            decision: decision
        })
    }
}