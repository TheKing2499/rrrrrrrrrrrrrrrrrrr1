module.exports = client => {
 console.log(`Online ${client.user.tag} (Guild${client.guilds.size > 1 ? 's' : ''}: ${client.guilds.size})`);
};