const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    const msg = message.content.toLowerCase();

    const categoryId = "580844338481856514";

    var userName = message.author.username;
    var bool = false;

    message.guild.channels.forEach((channel) => {
        if(channel.name == userName.msg + "-") {
            message.channel.send("**Acesta este ticket-ul tau" + message.author);

            bool = true;
        }
    });

    if(bool == true) return;

    var embedCreateTicket = new Discord.RichEmbed()
    .setTitle("Salut!" + message.author.username + ". A fost creat un canal pentru ticket-ul tau in categoria: `TICKETS`")
    .setFooter("Acest server te va ajuta la nevoie.");

    message.channel.send(embedCreateTicket);

    message.guild.createChannel(userName + "-", "text").then((createdChannel) => {

        createdChannel.setParent(categoryId).then((settedParent) => {

            settedParent.overwritePermissions(message.guild.roles.find("name","@everyone"),{ "READ_MESSAGES": false });

            settedParent.overwritePermissions(message.author, {
                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "AD_REACTIONS": true
            });

    var embedParent = new Discord.RichEmbed()
    .setTitle("Salut!" + message.author.username.toString() + ". Acesta este ticket-ul tau!")
    .setDescription("Scrie/posteaza aici cu ce vrei sa te ajutam.")
    .setFooter("Te vom ajuta mereu.");

    settedParent.send(embedParent);

        }).catch(errr => {
            message.channel.send("Error")
        })
    })   


}

module.exports.config = {
    command: "new"
}