exports.run = async(client, message, args) => {
    if(args.length === 0) return message.channel.send('This field is required').then(m => m.delete(7500));
    if(args.length < 2 || args.length > 32) return message.channel.send('Must be between **2** and **32** in length.').then(m => m.delete(7500));
    if(args == client.user.username) return message.channel.send('**نفس الاسم !**').then(m => m.delete(7500));
    client.user.setUsername(args).then(() => {
        message.channel.send(`Successfully changed name to **${args}**`);
    }).catch((err) => {
        return message.channel.send(`**${err}**`);
    });
};

exports.conf = {
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: "setname"
};