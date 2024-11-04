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
        },
        {
            name: 'picture',
            description: 'WHO',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Guus',
                    value: 'guus',
                },
                {
                    name: 'Man',
                    value: 'man',
                }
            ],
        }
    ],
    // devOnly: Boolean,
    // testOnly: Boolean,
    // deleted: true,

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const day = interaction.options.get('day');
        let chosenCategory = interaction.options.getString('picture') ?? 'notchosen';
        const fs = require('fs');
        let dir;

        if (chosenCategory === 'notchosen') {
            randomNum = Math.floor(Math.random() * 2);
            console.log(randomNum)

            switch (randomNum) {
                case 0:
                    chosenCategory = 'guus';
                    break;
                case 1:
                    chosenCategory = 'man';
                    break;
            }
        }

        dir = `src/\\/pictures/\\/${chosenCategory}`;

        sparkle_array = fs.readdirSync(dir)

        let selectedImage = sparkle_array[Math.floor(Math.random() * sparkle_array.length)];

        if (lastImage == selectedImage) {
            selectedImage = sparkle_array[Math.floor(Math.random() * sparkle_array.length)];
        }
        lastImage = selectedImage;

        const sparkleOnGif = await loadImage(`src/\\/sparkleOnGif/\\/sparkleOn.png`)

        const guusImage = await loadImage(`src/\\/pictures/\\/${chosenCategory}/\\/${selectedImage}`)

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