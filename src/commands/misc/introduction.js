const { AttachmentBuilder } = require('discord.js');
const fazBot = (`src/\\/pictures/\\/intro/\\/fazbot.gif`)

const attachment = new AttachmentBuilder( fazBot, { name: 'fazBot.gif' });

module.exports = {
    name: 'introduction',
    description: 'introduction',
    devOnly: true,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: true,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        await interaction.editReply({ content: `*Ladies and gentlemen, boys and girls, \n\nFazbear Entertainment would like you to put your hands together for the one, the only, **Freddy Fazbot!***`, files: [attachment] })
    },
};