const fs = require('fs');
const moment = require('moment');
const {GUILD} = require('../config');
const blacklist = require("../JSON/blacklist");
exports.run = async(client, message, args) => {
    if(message.channel.id !== '633217267513032704') return undefined;
    var user = client.users.get(args);
    if(!user) return message.channel.send('قم بكتابة ايدي المستخدم لحظره');
    let Suρρоrt = client.guilds.get(GUILD).roles.get('635227210969776169').members.map(m => m.id);
    if(Suρρоrt.includes(user.id)) return message.channel.send(`لايمكنك حظر الإدارة`);
      if(!blacklist.hasOwnProperty(user.id)) {
        blacklist[user.id] = {
            na: user.username,
            in: moment().format()
        };
        message.channel.send(`i have add the ${user} blacklist`).then(() => user.send(`${user}, You have been blacklisted.`));
        return fs.writeFile("./JSON/blacklist.json", JSON.stringify(blacklist, null, 4), (err) => { if(err) console.error(err); });
    } else {
        message.channel.send(`**added ${user} to Blacklisted before \`${moment(blacklist[user.id].in).fromNow()}\`**`);
    };
};

exports.conf = {
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: "add"
};