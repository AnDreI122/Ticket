const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    const categoryId = "580844338481856514";

    if(message.channel.parentID == categoryId){
        message.chhannel.delete()

    }else{

        message.channel.send("I delete the channel")

    }

}

module.exports.config = {
    command: "close"
}