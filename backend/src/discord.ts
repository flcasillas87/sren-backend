// Importamos clases y constantes necesarias de la librería Discord.js
import { Client, GatewayIntentBits } from 'discord.js';

// Cargamos las variables de entorno desde un archivo .env
import dotenv from 'dotenv';
dotenv.config(); //  Habilita el uso de process.env.DISCORD_TOKEN

// Creamos una instancia del cliente de Discord con los permisos necesarios (intents)
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Evento que se ejecuta cuando el bot se conecta correctamente a Discord
client.once('ready', () => {
  console.log(` Bot listo como ${client.user?.tag}`);
});

// Evento que se ejecuta cuando se recibe un nuevo mensaje en un canal
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignoramos mensajes de otros bots

  // Si el mensaje dice "!ping", respondemos con "pong!"
  if (message.content === '!ping') {
    message.channel.send('pong!');
  }
});

// Iniciamos sesión con el token del bot (asegúrate de tener DISCORD_TOKEN en tu .env)
client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error('Error al iniciar sesión:', error);
});
