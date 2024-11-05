const { AttachmentBuilder } = require('discord.js');
const horSound = (`src/\\/sounds/\\/hor.mp3`)

const hor = new AttachmentBuilder(horSound, { name: 'hor.mp3' });

module.exports = {
    name: 'hor',
    description: 'Hor',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: true,

    callback: (client, interaction) => {
        console.log(`Ping: ${client.ws.ping} ms`)

        random = ["Hor", "Hor Hor", "Hor 🫵"]
        let chosenReply = Math.floor(Math.random() * (random.length + 1))

        if (chosenReply >= random.length) {
            interaction.reply({ files: [hor] });
        }
        else {
            interaction.reply(`${random[chosenReply]}`)
        }
    },
};