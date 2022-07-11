(async()=>{
    // Dependencies
    const request = require("request-async")

    // Variables
    const args = process.argv.slice(2)

    // Main
    if(!args.length) return console.log("usage: node index.js <token> <serverID> <channelID>")
    if(!args[1]) return console.log("Invalid serverID.")
    if(!args[2]) return console.log("Invalid channelID.")

    var response = await request(`https://api.revolt.chat/servers/${args[1]}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "x-session-token": args[0]
        },
        body: JSON.stringify({ description: "", system_messages: { user_joined: args[2] }})
    })

    console.log(`Payload sent(Size): ${response.body.length}`)
    console.log(response.statusCode)
})()