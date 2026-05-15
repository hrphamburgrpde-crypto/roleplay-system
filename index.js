require("dotenv").config();

const {
  Client,
  Collection,
  GatewayIntentBits
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection();

const commandFiles = [
  "./setup-notruf.js",
  "./setup-verify.js"
];

for (const file of commandFiles) {
  const command = require(file);
  client.commands.set(command.data.name, command);
}

const eventFiles = [
  "./interactionCreate.js"
];

for (const file of eventFiles) {
  const event = require(file);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.once("ready", () => {
  console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

client.login(process.env.TOKEN);