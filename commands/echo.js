const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input')
        .addStringOption(option =>
            option.setName('input')
                  .setDescription('The input to echo back')
                  .setRequired(true))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                  .setDescription('Whether or not you want this to be public (true/false)')),
    async execute(interaction) {
        const input     = interaction.options.getString('input');
        const public    = interaction.options.getBoolean('ephemeral');
        
        await interaction.reply({content: input, ephemeral: public});
    }         
}