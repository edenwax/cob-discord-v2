const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, Partials, GatewayIntentBits } = require('discord.js');
const { DISCORD_TOKEN } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const string_prefix = "cob";
const prefix = string_prefix.toLowerCase();

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('ready', () => {
	console.log('Cob online');
});

client.on('messageCreate', async (message) => {
	if(message.author.bot) return;

	const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);

	if(message.content.startsWith(prefix)) {
		console.log("args: " + args);

		if(args.includes("love") && args.includes("you")) {
			message.channel.send("I love you too!");
		}

		if(args.includes("how") && args.includes("do") && args.includes("feel") && args.includes("about") && args.includes("neil")) {
			message.channel.send("His bot doesnt even exist yet. **+1 for Cob**")
				.then(function (message) { message.react('🏆')});
		}
	}

})

client.login(DISCORD_TOKEN);
