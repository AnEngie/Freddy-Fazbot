const { AttachmentBuilder, ApplicationCommandOptionType, ApplicationCommand, SlashCommandBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');

let lastImage = 0;


module.exports = {
    name: 'sparkle',
    description: 'don\'t forget to be yourself',
    options: [
        {
            name: 'day',
            description: 'day of the week',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: true,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const day = interaction.options.get('day');

        let selectedImage = image_array[Math.floor(Math.random() * image_array.length)];

        if (lastImage == selectedImage) {
            selectedImage = image_array[Math.floor(Math.random() * image_array.length)];
        }
        lastImage = selectedImage;

        const sparkleOnGif = await loadImage(`src/\\/sparkleOnGif/\\/sparkleOn.png`)

        const guusImage = await loadImage(`src/\\/pictures/\\/${selectedImage}`)

        const canvas = createCanvas(sparkleOnGif.width, sparkleOnGif.height);
        const context = canvas.getContext('2d');

        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(guusImage, 0, 0, canvas.width, canvas.height);

        context.drawImage(sparkleOnGif, 0, 0, canvas.width, canvas.height)

        let fontSize = 75;
        let resizedTimes = 0;
        
        do {
            // Assign the font to the context and decrement it so it can be measured again
            context.font = `${fontSize -= 10}px Script MT Bold`;
            resizedTimes++
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (context.measureText(day.value).width > canvas.width - 300 && resizedTimes < 3);

        context.fillStyle = '#eb02b4'
        context.fillText(day.value, 225, 555)

        // Use the helpful Attachment class structure to process the file for you
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'sparkle-on.png' });

        interaction.editReply({ files: [attachment] });
    },
};