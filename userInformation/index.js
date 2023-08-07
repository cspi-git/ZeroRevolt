"use strict";

(async()=>{
    "use strict";

    // Dependencies
    const prettyOutput = require("prettyoutput")
    const request = require("request-async")

    // Variables
    const args = process.argv.slice(2)

    // Main
    if(!args.length) return console.log("usage: node index.js <token> <userID>")
    if(!args[1]) return console.log("Invalid userID.")
    
    var response = await request(`https://api.revolt.chat/users/${args[1]}`, {
        headers: {
            "x-session-token": args[0]
        }
    })

    response = JSON.parse(response.body)

    if(response.hasOwnProperty("type")){
        console.log("Invalid UserID.")
    }else{
        console.log()
        console.log(prettyOutput(response, { indentationLength: 2 }))
    }
})()