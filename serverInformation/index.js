(async()=>{
    "use strict";

    // Dependencies
    const request = require("request-async")

    // Variables
    const args = process.argv.slice(2)

    // Main
    if(!args.length) return console.log("usage: node index.js <token> <serverID>")
    if(!args[1]) return console.log("Invalid serverID.")

    var response = await request(`https://api.revolt.chat/servers/${args[1]}`, {
        headers: {
            "x-session-token": args[0]
        }
    })

    response = JSON.parse(response.body)

    var response2 = await request(`https://api.revolt.chat/users/${response.owner}`, {
        headers: {
            "x-session-token": args[0]
        }
    })

    response2 = JSON.parse(response2.body)

    console.log(`
Server Name: ${response.name}
Server Banner: ${response.hasOwnProperty("banner") ? response.banner._id : "None"}
Server Icon: ${response.hasOwnProperty("icon") ? response.icon._id : "None"}
Server Description:
------------------------------------------------------------------------------------------------------
${response.description}
------------------------------------------------------------------------------------------------------

Owner Name: ${response2.username}
Owner ID: ${response.owner}
Owner Online: ${response2.online}

Roles Count: ${Object.keys(response.roles).length}
Categories Count: ${response.categories.length}
Channels Count: ${response.channels.length}

Flags: ${response.flags}
Analytics: ${response.analytics}
Discoverable: ${response.discoverable}`)
})()