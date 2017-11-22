const config = require('./config.json');
const Discord = require('discord.js');
const messageHandler = require('./messageHandler.js');
const Persistance = require('./persistance');
const BotMessageHandler = require('./botModule');

const p = new Persistance();
const client = new Discord.Client();
const botHandler = new BotMessageHandler();

client.on('ready', () => {
    p.init('wombot-config').then(() => {
        const wombot = client.channels.find('name', 'wombot-testing');
        if (wombot) {
            wombot.send('*wombat noises* [wombot started]');
        }
        messageHandler.init(client, p);
        botHandler.init(client);
    });
});

client.on('error', (err) => {
    console.log(err);
});

client.on('message', (msg) => {
    messageHandler.handle(msg);
    botHandler.handleMessage(msg);
});

client.login(config.auth.token);
