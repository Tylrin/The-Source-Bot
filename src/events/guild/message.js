const {prefix} = require("../../../config.bot.json");

module.exports = async (client, message) => {
	// On all messages
	if (message.author == client.user) {
		// Prevent bot from responding to its own messages.
		return;
	}

	if (message.content.startsWith(client.botConfig.prefix)) {
		// It will listen for messages that will start with the set prefix.
		processCommand(message);
		return;
	}

	processMessage(message);

	function processMessage(message) {
		let messageContent = message.content; // Get message content.
		let lowerCaseMessage = messageContent.toLowerCase(); // Set the message to lowercase.
		let splitMessage = messageContent.split(" "); // Split the message up in to pieces for each space.
	}

	function processCommand(message) {
		let messageContent = message.content; // Get message content.
		let fullCommand = messageContent.substr(client.botConfig.prefix.length); // Remove the leading prefix mark.
		let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space.
		let command = splitCommand[0].toLowerCase(); // The first word directly after the prefix is the command.
		let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command.

		console.log(`[cmd] Command: ${command}`);
		console.log(`[cmd] Arguments: ${arguments}`);

		let commandfile =
			client.commands.get(command) || client.commands.get(client.aliases.get(command)); // Get the command file.
		if (commandfile) {
			commandfile.run(client, message, arguments); // If the file exists, call it.
		} else {
			message.channel.send(`The command ${command} doesn´t exist`); // Notify if the command doesn't exist.
		}
	}
};
