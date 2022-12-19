const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Returns a pleasant greeting'),
    async execute(interaction) {
        await interaction.reply('sup cunt');
    }
}