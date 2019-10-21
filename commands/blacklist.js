const moment = require('moment');
const Discord = require("discord.js");
const blacklist = require("../JSON/blacklist.json");
exports.run = async(client, message, args) => {
    if(message.channel.id !== '633217267513032704') return undefined;
    if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('I need this permission **EMBED_LINKS** to continue.');
    if(Object.keys(blacklist).length <= 0) {
        return message.channel.send(`**القائمة السوداء فارغه**`);
    } else {
        let noOfPages = Object.keys(blacklist).length / 10;
        let i = (args > 1 && args < noOfPages + 1) ? args : 1; i = i - 1;
        let total = noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages);
        if(args > total) return message.channel.send(`Pages available from **${i + 1}** to **${total}**`);
        let LI = [];
        let I = 1;
        for(const user of Object.keys(blacklist)) {
            LI.push(`**${I++}-** ${blacklist[user].na} [${user}] **in** \`${moment(blacklist[user].in).fromNow()}\``);
        };
        return message.channel.send(new Discord.RichEmbed().setColor(0x36393f).setDescription(LI.slice(i * 10, (i * 10) + 10)).setFooter(`page ${i + 1} of ${total} for blacklist`, undefined));
    };
};

exports.conf = {
    aliases: ['list'],
    permLevel: 2
};

exports.help = {
    name: "blacklist"
};