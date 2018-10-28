const request = require("request");
const User = require("../data_models/user.js");

// SETS WALLET PASSWORD
const password = "G6ez5TgUQcnxag9jxwayeYdEm53SUGphtDPWt4D4QJxtBP4tGP4p8yf7MN3LKuNe6QEG6bEEQd2JhBH9d9e7yKjF3Et8MrtUSQXbCHXvVTqcqm7NCzYPxRprtTUQFHrAZmUEr8hF9dspgPxLcSFEEnwF9YJFCJz7NvEP5esvbzGft5Qrpb4GHARKcwYkZJbuGyNRxfM6JrybjddLTDQp7ebZMRHhCrEHtYsw9FnUHk7pYHkpXkQLLxmZzQhJMary";


// EXPORTS FUNCTION
module.exports = function register (message){
    User.findOne({ discordId: message.author }, function (error, foundUser) {
            if (error) {
                console.log(error);
            } else if (foundUser) {
                message.channel.send("You already are registered " + foundUser.discordId);
            } else {
                message.channel.send("Loading...");
                const headers = {
                    "accept": "application/json",
                    "Authorization": "N7C7aYXrQVrjz#CA",
                    "Content-Type": "application/json",
                };
                const options = {
                    url: "http://41.185.26.184:8081/actor/wallet/create",
                    method: 'POST',
                    headers: headers,
                    form: { "password": password }
                };

                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 201) {
                        body = JSON.parse(body);
                        User.create({ discordId: message.author, walletId: body.id }, function (err, newUser) {
                            if (err) {
                                console.log(err);
                                message.channel.send("Error, please try again");
                            } else {
                                User.findOne({ discordId: message.author }, function (xer, user) {
                                    if (xer) {
                                        console.log(xer);
                                    } else if (user && user.address == undefined) {
                                        const headers = {
                                            "accept": "application/json",
                                            "Authorization": "N7C7aYXrQVrjz#CA",
                                            "Content-Type": "application/json",
                                        };
                                        const options = {
                                            url: "http://41.185.26.184:8081/actor/wallet/address",
                                            method: 'POST',
                                            headers: headers,
                                            form: { "identifier": user.walletId, "password": password }
                                        };
                                        request(options, function (er, rresponse, bbody) {
                                            if (!er && rresponse.statusCode == 201) {
                                                bbody = JSON.parse(bbody);
                                                user.address = bbody.address;
                                                user.save();
                                                message.channel.send( newUser.discordId + " registered! now type '.claim' to receive 100 $TGM ");
                                            } else {
                                                message.channel.send("Error, please try again");
                                            }
                                        });
                                    }
                                });
                            }
                        });



                    } else {
                        message.channel.send("Error, please try again");
                    }


                });
            }
        });
};