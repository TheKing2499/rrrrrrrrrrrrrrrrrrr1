const Discord = require("discord.js");
exports.run = async(client, message, args) => {
    if(args.length < 1 || args.length > 128) return client.user.setGame(false) && message.channel.send('Must be between **1** and **128** in length.').then(m => m.delete(7500));
    let embed = new Discord.RichEmbed().setColor(0x36393f)
    .addField('**: اختر الوضع**', `**1** Playing\n**2** Streaming\n**3** Listening\n**4** Watching\n**0** لإلغاء الامر`);
    let mod = message.channel.send(embed);
    let filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, {max: 1}).then(co => {
        if(isNaN(co.first().content)) return mod.then(m => m.delete()) && message.channel.send("**ارقام فقط**");
        if(co.first().content > 4 || co.first().content < 1) {
            mod.then(m => m.delete());
            return message.channel.send("**تم إلغاء الامر**").then(m => m.delete(7500));
        } else {
            co.first().delete();
            mod.then(m => m.delete());
            if(co.first().content == "1") {
                return client.user.setGame(args).then(() => {
                    message.channel.send(`Successfully changed Playing to **${args}**`);
                }).catch((err) => {
                    return message.channel.send(`**${err}**`);
                });
            } else if(co.first().content == "2") {
                client.user.setGame(args, "https://www.twitch.tv/deeps_games").then(() => {
                    message.channel.send(`Successfully changed Streaming to **${args}**`);
                }).catch((err) => {
                    return message.channel.send(`**${err}**`);
                });
            } else if(co.first().content == "3") {
                client.user.setActivity(args, {type: 'LISTENING'}).then(() => {
                    message.channel.send(`Successfully changed Listening to **${args}**`);
                }).catch((err) => {
                    return message.channel.send(`**${err}**`);
                });
            } else if(co.first().content == "4") {
                client.user.setActivity(args, {type: 'WATCHING'}).then(() => {
                    message.channel.send(`Successfully changed Watching to **${args}**`);
                }).catch((err) => {
                    return message.channel.send(`**${err}**`);
                });
            };
        };
    });
};

exports.conf = {
    aliases: [],
    permLevel: 3
};
  
exports.help = {
    name: "setgame"
};