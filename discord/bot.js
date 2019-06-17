const onMessage = require("./onMessage.js");
const controller = require("./controller.js");

const Discord = require("discord.js");
const client = new Discord.Client();

//Client ID https://discordapp.com/oauth2/authorize?client_id=514097295420030977&scope=bot&permissions=0
client.login(process.env.DISCORD_TOKEN);

client.on("ready", () => {
  console.log("DISCORD > Logged in successful!");
  setPresence();
});

client.on("guildCreate", () => {
  setPresence();
});

client.on("guildDelete", () => {
  setPresence();
});

client.on("resume", () => {
  setPresence();
});

client.on("message", msg => onMessage(msg));

client.on("error", error =>
  console.log(error.message ? error.message : "DISCORD.JS ERROR", "\n", error)
);

controller.setClient(client);

function setPresence() {
  client.user.setPresence({
    game: { name: `bb help me in ${client.guilds.size} servers!` },
    status: "online"
  });
}

module.exports = {
  bot: client,
  setDb: db => {
    controller.setDb(db);
  }
};
