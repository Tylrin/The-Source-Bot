const Discord = require('discord.js');
const Permissions = require('../utilities/commandpermission.json');

module.exports.run = async (client, message, arguments) => {
    if (!message.member.hasPermission(Permissions.removerolePermission)) { // Check permission for the command.
        message.reply("You don't have the right to remove someones role.")
        return;
    };
    let roleUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0])); // Get mentioned user.
    if (!roleUser) { // Check if the user exist.
        message.reply("Couldn't find the user")
        return; 
    };
    await message.delete().catch(); // Delete your own command.

    let role = arguments.join('').slice(22); // Check for a specified role.
    if (!role) {
        message.reply("Specify a role!")
        return;
    }
    let guildRole = message.guild.roles.find(`name`, role); // Check if the role exists.
    if (!guildRole) {
        message.reply("Cound't find that role")
        return;
    } 

    if (!roleUser.roles.has(guildRole.id)) { // Check if the don't have the role.
        message.reply("They don't have that role.")
        return;
    } 
    await (roleUser.removeRole(guildRole.id)); // Remove the role.

    try {
        await roleUser.send(`${guildRole.name} lost the role ${guildRole.name}`);
    } catch(err) {
        message.channel.send(`The role ${guildRole.name} was taken from <@${roleUser.id}>`);
    }
}

module.exports.help = {
    name: 'removerole'
}