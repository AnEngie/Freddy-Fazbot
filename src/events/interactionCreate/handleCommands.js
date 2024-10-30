const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if(!commandObject) return;

        if(commandObject.devOnly)
        {
            if(!devs.includes(interaction.member.id))
            {
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemeral: true,
                });
                return;
            }
        }

        if(commandObject.testOnly)
            {
                if(!interaction.guild.id === testServer)
                {
                    interaction.reply({
                        content: 'This command is still being tested.',
                        ephemeral: true,
                    });
                    return;
                }
            }
        
        await commandObject.callback(client, interaction)

    } catch (error) {
        console.log(`Error running command: ${error}`);
    }
};