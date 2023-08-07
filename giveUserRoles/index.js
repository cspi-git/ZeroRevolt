(async()=>{
    "use strict";

    // Dependencies
    const request = require("request-async")
    
    // Variables
    const args = process.argv.slice(2)

    // Main
    if(!args.length) return console.log("usage: node index.js <token> <serverID> <userID> <roleID>")
    if(!args[1]) return console.log("Invalid serverID.")
    if(!args[2]) return console.log("Invalid userID.")
    if(!args[3]) return console.log("Invalid roleID.")

    var response = await request(`https://api.revolt.chat/servers/${args[1]}/members/${args[2]}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ roles: [args[3]] })
    })

    response = JSON.parse(response.body)
    response.hasOwnProperty("permission") ? console.log("Unable to give user the role.") : console.log("Role successfully give to user.")
})()