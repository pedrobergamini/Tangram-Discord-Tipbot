const Discord = require("discord.js");
const request = require("request");
const User = require("../data_models/user.js");

// SETS WALLET PASSWORD
const password = "G6ez5TgUQcnxag9jxwayeYdEm53SUGphtDPWt4D4QJxtBP4tGP4p8yf7MN3LKuNe6QEG6bEEQd2JhBH9d9e7yKjF3Et8MrtUSQXbCHXvVTqcqm7NCzYPxRprtTUQFHrAZmUEr8hF9dspgPxLcSFEEnwF9YJFCJz7NvEP5esvbzGft5Qrpb4GHARKcwYkZJbuGyNRxfM6JrybjddLTDQp7ebZMRHhCrEHtYsw9FnUHk7pYHkpXkQLLxmZzQhJMary";


// EXPORTS FUNCTION
module.exports = function help(message){
    const embed = new Discord.RichEmbed();
        embed.setTitle("Welcome to TangramBot (TESTNET ONLY, COINS HAVE NO VALUE)! Those are the commands:");
        embed.addField(".register", "Registers your account");
        embed.addField(".balance", "Returns your account's balance");
        embed.addField(".deposit", "Returns your deposit address");
        embed.addField(".withdraw [amount] [tgm_address]", "Withdraws x amount to an address");
        embed.addField(".claim", "Claims 100 testnet $TGM (Overwrites your current balance)");
        embed.addField(".tip [amount] [discordUser]", "Tips a discord user $TGMs (e.g.    .tip 100 @PedroLark)");
        message.channel.send(embed);
};