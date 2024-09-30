import { Client, GatewayIntentBits } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice'; // Import getVoiceConnection
import dotenv from 'dotenv';

// Memuat file .env
dotenv.config();

const token = process.env.TOKEN;

// Inisialisasi client bot dengan intents yang benar
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates, // Tambahkan intent untuk suara
  ],
});

// Ketika bot berhasil login dan siap
client.once('ready', () => {
  console.log('Bot is online!');
});

// Event untuk mendeteksi pesan baru
client.on('messageCreate', (message) => {
  // Cek apakah pesan dimulai dengan '!' dan bukan dari bot itu sendiri
  if (message.content.startsWith('!') && !message.author.bot) {
    const command = message.content.slice(1).toLowerCase(); // Mengambil command tanpa '!'
    if (command === 'emuach') {
      // Ganti URL di bawah ini dengan URL gambar yang ingin dikirim
      const imageUrl = 'https://i.pinimg.com/564x/30/be/f2/30bef29276e3f6415876969b13a6c15a.jpg'; 

      message.channel.send({
        content: '',
        files: [imageUrl],
      });
    }

    if (command === 'mw') {
      // Ganti URL di bawah ini dengan URL gambar yang ingin dikirim
      const imageUrl = 'https://cdn.discordapp.com/attachments/1280821518854651964/1290253396174966784/raf360x360075tfafafaca443f4786.png?ex=66fbc99d&is=66fa781d&hm=7350dc8888f5771a51cb3916c87eb068344764cf46748e7998a93ed8d73526cd&'; 

      message.channel.send({
        content: `${message.author}`,
        files: [imageUrl],
      });
    }

    if (command === 'hbd') {
      // Ganti URL di bawah ini dengan URL gambar yang ingin dikirim
      const imageUrl = 'https://media.discordapp.net/attachments/1280821518854651964/1290256708047732828/415298064_1060410848417468_7294109233551544200_n.png?ex=66fbccb3&is=66fa7b33&hm=ec6885ef33426351513169529c7b7542009a39633503d15a3add7625e2cfe4bf&=&format=webp&quality=lossless&width=297&height=350'; 

      message.channel.send({
        content: `hbd asep`,
        files: [imageUrl],
      });
    }

    if (command === 'pale-pale') {
      message.channel.send('terimakasih 100 kentangnya pale pale');
    } 
    if (command === 'hai') {
      message.channel.send('Hai! Ada yang bisa saya bantu?');
    } else if (command === 'ping') {
      message.channel.send('Pong!');
    } else if (command === 'hay') {
      message.channel.send('awor awor mantap');
    } else if (command === 'join') { // Perintah untuk bergabung ke voice channel
      const { member } = message;
      const voiceChannel = member.voice.channel;
      
      if (voiceChannel) {
        joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: message.guild.id,
          adapterCreator: message.guild.voiceAdapterCreator,
        });
        message.channel.send(`Bot telah bergabung ke voice channel: ${voiceChannel.name}`);
      } else {
        message.channel.send('Kamu harus berada di voice channel untuk menggunakan perintah ini!');
      }
    } else if (command === 'leave') { // Perintah untuk keluar dari voice channel
      const connection = getVoiceConnection(message.guild.id);
      
      if (connection) {
        connection.destroy(); // Hancurkan koneksi untuk keluar dari voice channel
        message.channel.send('Bot telah keluar dari voice channel.');
      } else {
        message.channel.send('Bot tidak sedang berada di voice channel!');
      }
    } else {
      console.log(`Command tidak dikenal: ${command}`); // Log untuk command yang tidak dikenal
    }
  }
});

// Login bot dengan token
client.login(token).catch(console.error); // Menangani kesalahan login
