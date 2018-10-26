const Discord = require("discord.js");
const bot = new Discord.Client();
const mongoose = require("mongoose");
const claim = require ("./functions/claim.js");
const balance = require ("./functions/balance.js");
const help = require ("./functions/help.js");
const tip = require ("./functions/tip.js");
const withdraw = require ("./functions/withdraw.js");
const deposit = require ("./functions/deposit.js");
const register = require ("./functions/register.js");
// CONNECT TO DATABASE
mongoose.connect("path");

bot.on("ready", () => {
    console.log("Bot up!");
});

bot.on("message", message => {
    //   DISPLAY COMMANDS
    if (message.content == ".help") {
        help(message);
    }
    // CREATES ACCOUNT
    if (message.content == ".register") {
        register(message);
    }
    //  DISPLAY BALANCE
    if (message.content == ".balance") {
        balance(message);
    }
    // RETURN DEPOSIT ADDRESS
    if (message.content == ".deposit") {
        deposit(message);   
    }
    // TIP COMMAND
    if (message.content == ".tip " + message.content.slice(5, message.content.length)) {
        tip(message);
    }
    //  CLAIM COMMAND
    if (message.content == ".claim") {
        claim(message);
    }
    if (message.content == ".withdraw"+ message.content.slice(9, message.content.length)){
        withdraw(message);
    }
});

// ADD BOT TOKEN
bot.login("");
