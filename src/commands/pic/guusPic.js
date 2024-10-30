const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas')
let allGuusPics = require('../../utils/getAllGuusPics');
const image_array = allGuusPics.getAllPics();


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

        let selectedImage = image_array[Math.floor(Math.random() * image_array.length)];

        if(lastImage == selectedImage)
        {
            selectedImage = image_array[Math.floor(Math.random() * image_array.length)];
        }
        lastImage = selectedImage;

        const guusImage = await loadImage(`src/\\/pictures/\\/${selectedImage}`)

        const canvas = createCanvas(guusImage.width, guusImage.height);
        const context = canvas.getContext('2d');

        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(guusImage, 0, 0, canvas.width, canvas.height);

        // Use the helpful Attachment class structure to process the file for you
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'guus-image.png' });

        interaction.editReply({ files: [attachment] });
    },
};