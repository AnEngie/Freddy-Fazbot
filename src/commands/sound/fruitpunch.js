const { AttachmentBuilder } = require('discord.js');

module.exports = {
    name: 'fruitpunch',
    description: 'fruitpunch for everyone',

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const guusImage = await (`src/\\/sounds/\\/fruitpunch.mp3`)

        const attachment = new AttachmentBuilder(await guusImage, { name: 'fruitpunch.mp3' });

        interaction.editReply({ files: [attachment] });
    },
};