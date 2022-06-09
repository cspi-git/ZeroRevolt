(async()=>{
    "use strict";

    // Main
    const request = require("request-async")

    // Variables
    const args = process.argv.slice(2)

    // Main
    if(!args.length) return console.log("usage: node index.js <token> <channelID> <userID> <message>")
    if(!args[1]) return console.log("Invalid channelID.")
    if(!args[2]) return console.log("Invalid userID.")
    if(!args[3]) return console.log("Invalid message.")

    var response = await request(`https://api.revolt.chat/channels/${args[1]}/messages`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-session-token": args[0]
        },
        body: JSON.stringify({ nonce: `AAAAAAAAAAAA${Math.floor(Math.random() * 9999999)}`, content: `${args.slice(3).join(" ")} [](<@${args[2]}> )`, })
    })

    response = JSON.parse(response.body)

    response.hasOwnProperty("content") ? console.log("Payload sent.") : console.log("Unable to send payload.")
})()