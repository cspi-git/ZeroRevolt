(async()=>{
    "use strict";

    // Dependencies
    const fileDownloader = require("nodejs-file-downloader")
    const request = require("request-async")
    const fs = require("fs")

    // Variables
    const args = process.argv.slice(2)

    var idsIndex = 0

    // Functions
    async function download(ids){
        if(ids.length === idsIndex) return console.log("Finished.")

        const id = ids[idsIndex]

        var response = await request(`https://api.revolt.chat/users/${id}`, {
            headers: {
                "x-session-token": args[0]
            }
        })

        response = JSON.parse(response.body)

        if(response.hasOwnProperty("retry_after")){
            console.log(`Limit detected. Retry after: ${response.retry_after}`)

            setTimeout(function(){
                download(ids)
            }, response.retry_after)
            return
        }

        const name = `${response._id}_${new Buffer(response.username).toString("base64")}`
        const avatar = response.hasOwnProperty("avatar") ? { url: `https://autumn.revolt.chat/avatars/${response.avatar._id}`, name: response.avatar.filename.replace(/.*?.\W/, `${name}.`) } : { url: `https://api.revolt.chat/users/${id}/default_avatar`, name: `${name}.png` }

        try{
            const downloader = new fileDownloader({
                url: avatar.url,
                fileName: avatar.name,
                directory: args[2]
            })

            await downloader.download()

            console.log(`Status: Success | Link: ${avatar.url}`)
        }catch{
            console.log(`Status: Failed | Link: ${avatar.url}`)
        }

        idsIndex++
        download(ids)
    }

    // Main
    if(!args.length) return console.log("usage: node index.js <token> <serverID> <output>")
    if(!args[1]) return console.log("Invalid serverID.")
    if(!fs.existsSync(args[2])) return console.log("Output directory does not exists.")

    console.log("Scraping users, please wait.")
    var response = await request(`https://api.revolt.chat/servers/${args[1]}/members`, {
        headers: {
            "x-session-token": args[0]
        }
    })

    response = JSON.parse(response.body).members
    response = response.map((member) =>{
        return member._id.user
    })

    console.log("Downloading users profile picture, please wait.")

    download(response)
})()