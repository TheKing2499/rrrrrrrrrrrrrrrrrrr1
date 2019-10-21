const {PREFIX} = require('../config');
module.exports = message => {

    let client = message.client;
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.content.startsWith(PREFIX)) return;
    let command = message.content.toLowerCase().split(' ')[0].slice(PREFIX.length);
    let messageArray = message.content.split(/\s+/g);
    let params = messageArray.slice(1).join(' ');
    let perms = client.elevation(message);
    let cmd;
    if(client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if(client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    };
    if(cmd) {
        if(perms < cmd.conf.permLevel) return;
        cmd.run(client, message, params, perms);
    };
};