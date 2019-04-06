module.exports = client => { // Initialize Bot
    const botConfig = client.botConfig;

    // Change status activity
    let statuses = [
        `${botConfig.prefix}help`,
        `over ${client.guilds.size} users!`,
        `connected to ${client.users.size} users`
    ]

    setInterval(function() {
        // Calculate status
        let status = statuses[Math.floor(Math.random() * statuses.length)];

        // Change activity
        client.user.setActivity(status, {type: "WATCHING"});
    }, 10000);

    console.log(`${client.user.username} is online!`);
}