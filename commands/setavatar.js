exports.run = async(client, message, args) => {
    if(!message.channel.permissionsFor(message.guild.me).has('ATTACH_FILES')) return message.channel.send('I need this permission **ATTACH_FILES** to continue.');
    if(args.length === 0) return client.user.setAvatar(0);
    client.user.setAvatar(`${args}`).then(() => {
        message.channel.send(`Successfully changed avatar to`,{ files: [{attachment: `${args}`, name: `Avatar/${client.user.username}.png`}]});
    }).catch((err) => {
        return message.channel.send(`**${err}**`);
    });
};

exports.conf = {
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: "setavatar"
};