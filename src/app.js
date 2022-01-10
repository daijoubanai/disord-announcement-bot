const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const config = require('../config.json');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]});

const USER = config.userID;
const TOKEN = config.token;
const annChanID = config.announcementChannelID;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
  
client.on("messageCreate", msg => {
    if (/[\u{1F7E9}]/gu.test(msg.content)) {
        msg.reply(":green_square: oh no no no");
    }
})

client.on("presenceUpdate", (oldPresense, newPresence) => {
    let streamer = newPresence.member.id;
    if (streamer === USER) {

        if (newPresence != oldPresense) {
            let newStatus = newPresence.member.presence.status;
            if (newStatus == "streaming") {

                client.channels.fetch(annChanID)
                .then( (channel) => channel.send("@everyone streamer is now streaming on twitch.tv") )
                .catch( err => console.log(err))
            }
        }

    }
})
  
client.login(TOKEN);
