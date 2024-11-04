const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas')
const fs = require('fs');
const dir = 'src/\\/pictures/\\/guus';
guus_array = fs.readdirSync(dir) 

let lastImage = 0;

module.exports = {
    name: 'guus',
    description: 'get a random picture of Guus',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: true,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        let selectedImage = guus_array[Math.floor(Math.random() * guus_array.length)];

        if(lastImage == selectedImage)
        {
            selectedImage = guus_array[Math.floor(Math.random() * guus_array.length)];
        }
        lastImage = selectedImage;

        const guusImage = await loadImage(`${dir}/${selectedImage}`)

        const canvas = createCanvas(guusImage.width, guusImage.height);
        const context = canvas.getContext('2d');

        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(guusImage, 0, 0, canvas.width, canvas.height);

        // Use the helpful Attachment class structure to process the file for you
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'guus-image.png' });

        interaction.editReply({ files: [attachment] });
    },
};