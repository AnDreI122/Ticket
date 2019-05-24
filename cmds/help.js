const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    const helpembed = new Discord.RichEmbed()
    .setTitle("Help commands:")
    .setDescription("new -> Create a now ticket for help.\nhelp -> It shows you the help commands.");

    message.channel.send(helpembed)

}

module.exports.config = {
    command: "help"
}