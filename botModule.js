const config = require('./config.json');
const builder = require('botbuilder');
const restify = require('restify');
const path = require('path')
const http = require('http');
const server = restify.createServer();

class BotMessageHandler {
    constructor() {

    }
    init(client) {
      this.connector = new builder.ChatConnector({
        appId: 'c3802aa6-60f5-4d70-ae94-86cb0738610c',
        appPassword: 'x24$%rjbsudYYBEZQE352@('
      });

      this.bot = new builder.UniversalBot(this.connector);

      server.listen(process.env.port || process.env.PORT || 3978, function () {
        console.log('listening to %s', server.url);
      });

      server.post('/api/messages', (req, res) => {
        console.log(req);
        var message = new http.IncomingMessage();
        
        this.connector.listen()(req, res);
        console.log('Here');
      });

      this.bot.dialog('/', (session, args) => {
        session.send('Hi');
        console.log(session.message.text);
      });
    }

    handleMessage(msg) {
        if (msg.channel.name === 'testing') {
          console.log(msg.content);
        }
    }
}

module.exports = BotMessageHandler;
