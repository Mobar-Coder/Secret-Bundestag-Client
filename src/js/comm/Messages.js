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
        return this.createMessage("join", {
            name: name,
            lobby: lobby
        });
    },

    createGenericReply: function (decision) {
        return this.createMessage("decision", {
            decision: decision
        })
    }
}