const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client({ disableEveryone: true });
bot.cmds = new Discord.Collection();

function loadCmds () {
 fs.readdir('./cmds', (err, files) => {
    if(err) console.error(err);

    const jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {return console.log("Nu am gasit comenzi...")}
    else { console.log(jsfiles.length + " comenzi gasite.") }

    jsfiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./cmds/${f}`)];
        const cmds = require(`./cmds/${f}`);
        console.log(`Comanda ${f} s-a incarcat.`);
        bot.cmds.set(cmds.config.command, cmds);
    })

})

}

loadCmds();

bot.on("message", async message => {

    const sender = message.author;
    const msg = message.content.toUpperCase();
    const prefix = "!s"
    const cont = message.content.slice(prefix.length).split(" ");
    const args = cont.slice(1);

    var cmd = bot.cmds.get(cont[0])
    if(cmd) cmd.run(bot, message, args)

        if(msg === prefix + "RELOAD") {

        if(!message.member.roles.find("name", "bot-commander")) {
            message.channel.send("📩 | Nu ai gradul `bot-commander`")
        } else {
        message.channel.send({embed:{description:"Toate comenzile au luat refresh."}})
        loadCmds();
        }
    }

});

bot.on("ready", async () => {
    console.log("Bot lounched...")

    bot.user.setStatus("dnd")

    bot.user.setActivity("Ticket | !shelp")

    try {
		var link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e) {
		console.log(e.stack);
	}
});

bot.login("NDY3NjQwMDc5NzYzMTExOTM2.XOgXWw.QYYG_CqJUEhssKgaf6R06O3LmRA")

