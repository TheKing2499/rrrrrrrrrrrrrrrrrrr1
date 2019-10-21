const fs = require('fs');
const {GUILD} = require('../config');
const blacklist = require("../JSON/blacklist");
exports.run = async(client, message, args) => {
    if(message.channel.id !== '633217267513032704') return undefined;
    var user = client.users.get(args);
    if(!user) return message.channel.send('قم بكتابة ايدي المستخدم لإزالة حظره');
    let Suρρоrt = client.guilds.get(GUILD).roles.get('635227210969776169').members.map(m => m.id);
    if(Suρρоrt.includes(user.id)) return message.channel.send(`لايمكنك حظر الإدارة`);
    if(!blacklist.hasOwnProperty(user.id)) {
        return message.channel.send(`you don't added ${user} to blacklist`);
    } else {
        message.channel.send(`I've removed ${user} from the blacklist`).then(() => {
            delete blacklist[user.id];
            return fs.writeFile('./JSON/blacklist.json', JSON.stringify(blacklist, null, 4), (err) => {
                if(err) console.error(err);
            });
        });
    };
};

exports.conf = {
    aliases: ['re'],
    permLevel: 2
};
  
exports.help = {
    name: "remove"
};
