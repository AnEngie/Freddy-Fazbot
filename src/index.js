require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require ('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

eventHandler(client);

client.on('ready', (client) => {
    client.user.setActivity({
        name: 'Have you ever heard of among us, Gregory?',
        type: ActivityType.Custom,
    })
})

client.login(process.env.TOKEN);