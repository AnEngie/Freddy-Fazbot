module.exports = {
    name: 'hor',
    description: 'Hor',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: true,

    callback: (client, interaction) => {
        random = ["Hor", "Hor Hor", "Hor 🫵"]
        interaction.reply(`${random[Math.floor(Math.random() * random.length)]}`)
        console.log(`Ping: ${client.ws.ping} ms`)
    },
};