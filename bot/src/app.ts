import wppconnect from '@wppconnect-team/wppconnect';

let token = new wppconnect.tokenStore.MemoryTokenStore();
wppconnect.create({
    puppeteerOptions: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu'
        ]
    },
    session: "wp-routines",
    headless: true,
    whatsappVersion: "2.2119.6"
}).then(client => start(client)).catch((erro) => { console.log(erro); });

function start(client: wppconnect.Whatsapp) {
    console.log('Starting bot...');
    client.onMessage(async (msg) => {
        try {
            if (msg.body == '!ping') {
                // Send a new message to the same chat
                client.sendText(msg.from, 'pong');
            } else if (msg.body == '!ping reply') {
                // Send a new message as a reply to the current one
                client.reply(msg.from, 'pong', msg.id.toString());
            } else if (msg.body == '!chats') {
                const chats = await client.getAllChats();
                client.sendText(msg.from, `The bot has ${chats.flat()} chats open.`);
            } else if (msg.body == '!info') {
                let info = await client.getHostDevice();
                let message = `_*Connection info*_\n\n`;
                message += `*User name:* ${info.pushname}\n`;
                message += `*Number:* ${info.wid.user}\n`;
                message += `*Battery:* ${info.battery}\n`;
                message += `*Plugged:* ${info.plugged}\n`;
                message += `*Device Manufacturer:* ${info.phone.device_manufacturer}\n`;
                message += `*WhatsApp version:* ${info.phone.wa_version}\n`;
                client.sendText(msg.from, message);
            }
        } catch (e) {
            console.log(e);
        }
    });
}