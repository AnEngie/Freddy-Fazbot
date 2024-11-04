const { AttachmentBuilder, ApplicationCommandOptionType } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const GIFEncoder = require('gif-encoder-2')
const fs = require('fs');

const dirPic = 'src/\\/pictures/\\/';
let lastImage = 0;

module.exports = {
    name: 'sparkle',
    description: 'don\'t forget to be yourself!',
    options: [
        {
            name: 'its',
            description: 'why do you sparkle',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'category',
            description: 'which category you want as a background. Leave blank for random',
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

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const fontSize = 62;

        const amountOfFrames = 10; // Set to the amount of pictures in the gif folder
        const gifSpeed = 125;

        const userText = interaction.options.get('its');
        chosenCategory = interaction.options.getString('category') ?? 'randomCategory'; // If the user does not choose a category, set category to randomCategory

        
        if (chosenCategory === 'randomCategory') { // Choose a random category if the user didn't pick one
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

        const dir = `${dirPic}${chosenCategory}`;

        const image_array = fs.readdirSync(dir) // Return how many images are in the chosen folder

        let selectedImage = image_array[Math.floor(Math.random() * image_array.length)];

        if (lastImage == selectedImage) { // Make sure the bot doesn't choose the same pictures every time
            selectedImage = image_array[Math.floor(Math.random() * image_array.length)];
        }
        lastImage = selectedImage;

        const sparkleOnGif = await loadImage(`${dirPic}sparkleOnGif/\\/sparkleOn1.png`)

        const width = sparkleOnGif.width
        const height = sparkleOnGif.height

        const canvas = createCanvas(sparkleOnGif.width, sparkleOnGif.height);
        const ctx = canvas.getContext('2d')

        const guusImage = await loadImage(`${dirPic}${chosenCategory}/\\/${selectedImage}`)

        function drawBackground() {
            ctx.drawImage(guusImage, 0, 0, width, height);
        }

        const encoder = new GIFEncoder(width, height)
        encoder.setDelay(gifSpeed)
        encoder.start() // Start making the gif

        let frame = 1;

        do {
            drawBackground() // Add the background to the frame
            let sparkleFrame = await loadImage(`${dirPic}sparkleOnGif/\\/sparkleOn${frame}.png`) // Add the frame of the gif on top of the background
            ctx.drawImage(sparkleFrame, 0, 0, width, height)

            ctx.font = `${fontSize}px Script MT Bold`;
            ctx.fillStyle = '#eb02b4'
            ctx.fillText(userText.value, 220, 550) // Add the text the user requested

            encoder.addFrame(ctx)
            frame++ // Count to the next frame
        } while (frame < amountOfFrames);

        encoder.finish()

        const buffer = encoder.out.getData()

        const attachment = new AttachmentBuilder(await buffer, { name: 'sparkle-on.gif' });

        interaction.editReply({ files: [attachment] });
    },
};