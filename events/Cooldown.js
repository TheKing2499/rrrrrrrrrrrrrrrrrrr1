const Discord = require("discord.js");
const {GUILDSUPPORT} = require('../config');
const blacklist = require("../JSON/blacklist");
module.exports = async(message) => {
    if(blacklist.hasOwnProperty(message.author.id)) return;
    let client = message.client;
    if(message.author.bot) return;
    let Suρρоrt = client.guilds.get(GUILDSUPPORT).members.map(m => m.id);
    if(Suρρоrt.includes(message.author.id) ? message.channel.type == 'dm' : message.channel.type !== 'dm') return;
    let command = message.content.split(' ').join(' ');
    let member = message.author.id.slice(13);
    let catgory = ['633204109196918787'];
    let guild = client.guilds.get(GUILDSUPPORT);
    let suggestions = guild.channels.get('633204109196918787');
    if(command == command) {
        if(Suρρоrt.includes(message.author.id)) {
            if(!catgory.includes(message.channel.parentID)) return;
            if(command == 'close') {
                client.users.get(message.channel.topic).send(`**تم إغلاق التذكرة**`).then(() => message.channel.delete()).catch(() => message.channel.delete());
                return client.channels.get('633212445141237772').send(`Ticket <@${message.channel.topic}> is closed by ${message.author}`);
            } else {
                client.users.get(message.channel.topic).send(`**(Staff) ${message.member.displayName}:** ${command}`).then(() => message.channel.send(`تم إرسال الرسالة بنجاح`).then(m => m.delete(5000))).catch(() => message.channel.send(`فشل إرسال الرساله، ينصح بإغلاق التذكره`).then(m => m.delete(5000)));
            };
        } else {
            if(guild.channels.find(c => c.name === member)) {
                let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi);
                let embed = new Discord.RichEmbed();
                embed.setColor(0x36393f);
                embed.setAuthor(message.author.username + ` iD: [${message.author.id}]`, message.author.avatarURL)
                embed.setDescription(command.replace(links, ''));
                if(links) {embed.setImage(`${links}`)};
                guild.channels.find(c => c.name === member).send(embed)
            } else {
            guild.createChannel(member, {
                type: 'text',
                topic: message.author.id,
                permissionOverwrites: suggestions.permissionOverwrites,
                parent: suggestions.id,
                position: 2
            }).then((c) => {
                client.channels.get('633212445141237772').send(`**New ticket by:** ${message.author}`);
                let embed = new Discord.RichEmbed().setColor(0x36393f)
                .setDescription(command);
                c.send(`Hey ${c.guild.defaultRole}, New ticket has been opened at \`#${member}\` by ${message.author}`, embed);
                return message.reply(`**تم فتح تذكرتك وسيقوم أحد الدعم الفني لدينا بالاتصال بك في أقرب وقت ممكن**`);
            }).catch(console.error);
            };
        };
    };
};