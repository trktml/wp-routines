import qrcode from 'qrcode-terminal';
import wpweb from "whatsapp-web.js";

const { Client, LocalAuth } = wpweb;

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    },
    authStrategy: new LocalAuth(),
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
});

client.on("authenticated", () => {
    console.log("Client is authenticated!");
})

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
});

client.on("disconnected", () => {
    console.log("Client is disconnected!");
});

client.on("loading_screen", () => {
    console.log("Loading screen!");
});

client.on("auth_failure", () => {
    console.log("Authentication failed!");
})

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', (msg) => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
