const request = require("request");
const User = require("../data_models/user.js");

// SETS WALLET PASSWORD
const password = "G6ez5TgUQcnxag9jxwayeYdEm53SUGphtDPWt4D4QJxtBP4tGP4p8yf7MN3LKuNe6QEG6bEEQd2JhBH9d9e7yKjF3Et8MrtUSQXbCHXvVTqcqm7NCzYPxRprtTUQFHrAZmUEr8hF9dspgPxLcSFEEnwF9YJFCJz7NvEP5esvbzGft5Qrpb4GHARKcwYkZJbuGyNRxfM6JrybjddLTDQp7ebZMRHhCrEHtYsw9FnUHk7pYHkpXkQLLxmZzQhJMary";


// EXPORTS FUNCTION
module.exports = function balance(message){
    User.findOne({ discordId: message.author }, function (error, user) {
            if (error) {
                message.channel.send("Something went wrong");
            } else if (user && user.address) {
                const headers = {
                    "accept": "application/json",
                    "Authorization": "N7C7aYXrQVrjz#CA",
                    "Content-Type": "application/json",
                };
                const options = {
                    url: "http://41.185.26.184:8081/actor/wallet/balance",
                    method: 'POST',
                    headers: headers,
                    form: { identifier: user.walletId, password: password, address: user.address }
                };
                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 201) {
                        body = JSON.parse(body);
                        message.channel.send(user.discordId + " your balance is: " + body.balance + " $TGM");
                    } else {
                        console.log(error);
                        message.channel.send("Something went wrong, please try again");
                    }
                });
            } else {
                return message.channel.send(message.author + " please generate your address first");
            }
        });
};