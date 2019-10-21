const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const blacklist = require("./JSON/blacklist");
const {TOKEN, GUILD, OWNER} = require('./config');
const dotenv = require('dotenv');
require('dotenv').config();


require('./util/eventLoader')(client);

const log = (msg) => {
	console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${msg}`);
};

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection(); 

fs.readdir('./commands/', (err, files) => {
   if(err) console.error(err); 
   log(`Loading a tatli of ${files.length} commands`); 
   files.forEach(f => {
     let props = require(`./commands/${f}`); 
     log(`Loading Command: ${props.help.name}`) 
     client.commands.set(props.help.name, props); 
     props.conf.aliases.forEach(alias => {
       client.aliases.set(alias, props.help.name);
      });
   });
});

client.reload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./commands/${command}`)];
			let cmd = require(`./commands/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
			  if (cmd === command) client.aliases.delete(alias);
			});
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.names.name);
			});
			resolve();
	   	} catch (e) {
			reject(e);
		};
	});
};

client.elevation = message => {
  if(!message.channel.guild) return undefined;
  let Suρρоrt = client.guilds.get(GUILD).roles.get('635227210969776169').members.map(m => m.id);
  let permlvl = 0;
  if(!blacklist.hasOwnProperty(message.author.id)) permlvl = 1;
  if(Suρρоrt.includes(message.author.id)) permlvl = 2;
  if(OWNER.includes(message.author.id)) permlvl = 3;
  return permlvl;
};

client.login(process.env.TK);