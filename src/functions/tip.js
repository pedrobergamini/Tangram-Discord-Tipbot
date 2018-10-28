const request = require("request");
const User = require("../data_models/user.js");

// SETS WALLET PASSWORD
const password = "G6ez5TgUQcnxag9jxwayeYdEm53SUGphtDPWt4D4QJxtBP4tGP4p8yf7MN3LKuNe6QEG6bEEQd2JhBH9d9e7yKjF3Et8MrtUSQXbCHXvVTqcqm7NCzYPxRprtTUQFHrAZmUEr8hF9dspgPxLcSFEEnwF9YJFCJz7NvEP5esvbzGft5Qrpb4GHARKcwYkZJbuGyNRxfM6JrybjddLTDQp7ebZMRHhCrEHtYsw9FnUHk7pYHkpXkQLLxmZzQhJMary";


// EXPORTS FUNCTION
module.exports = function tip(message){
    const messageArr= message.content.split(" ");
        User.findOne({ discordId:messageArr[2].replace("!", "") }, function (error, receiverUser) {
            if (error) {
                message.channel.send("Something went wrong");
                return console.log(error);
            }else if (!receiverUser) {
                       
                    } else if (receiverUser && receiverUser.address) {
                User.findOne({ discordId: message.author }, function (err, senderUser) {
                    if (err) {
                        message.channel.send("Something went wrong");
                    }  else if (!senderUser || !senderUser.address) {
                        return message.channel.send(message.author + " you don't have an address please generate one first");
                    } else if (senderUser.discordId == receiverUser.discordId) {
                        message.channel.send(senderUser.discordId + " you can't send $TGM to yourself :p");
                    } else if (senderUser && senderUser.address) {
                        const headers = {
                            "accept": "application/json",
                            "Authorization": "N7C7aYXrQVrjz#CA",
                            "Content-Type": "application/json",
                        };
                        const options = {
                            url: "http://41.185.26.184:8081/actor/wallet/transfer/funds",
                            method: 'POST',
                            headers: headers,
                            form: { "identifier": senderUser.walletId, "password": password, "account": senderUser.address, "change": senderUser.address, "link": receiverUser.address, "amount": messageArr[1].replace(" ", "") }
                        };
                        message.channel.send("Sending...");
                        request(options, function (er, response, body) {
                            if (!er && response.statusCode == 201) {
                                body = JSON.parse(body);
                                return message.channel.send(senderUser.discordId + " you sent " + messageArr[1] + " $TGM to " + receiverUser.discordId);
                            } else if (response.statusCode == 500 || response.statusCode == 411 || response.statusCode == 406) {
                                return message.channel.send("Insufficient funds or invalid user");
                            } else {
                                return message.channel.send("Bad request");
                            }
                        });
                    } 
                });
            }
        });
};