const request = require("request");
const User = require("../data_models/user.js");

// SETS WALLET PASSWORD
const password = "";


// EXPORTS FUNCTION
module.exports = function withdraw(message){
    const messageArr = message.content.split(" ");
        User.findOne({discordId: message.author}, function (error, user){
            if (error){
                return console.log(error);
            } else if (user && user.address){
                const headers = {
                            "accept": "application/json",
                            "Authorization": "N7C7aYXrQVrjz#CA",
                            "Content-Type": "application/json",
                        };
                        const options = {
                            url: "http://41.185.26.184:8081/actor/wallet/transfer/funds",
                            method: 'POST',
                            headers: headers,
                            form: { "identifier": user.walletId, "password": password, "account": user.address, "change": user.address, "link": messageArr[2], "amount": messageArr[1].replace(" ", "") }
                        };
                request(options, function (err, response, body) {
                    if (!err && response.statusCode == 201) {
                        body = JSON.parse(body);
                        message.channel.send(user.discordId + " transaction sent!");
                    } else if (response.statusCode == 500 || response.statusCode == 411 || response.statusCode == 406) {
                                return message.channel.send("Insufficient funds or invalid address");
                            } else {
                                return message.channel.send("Bad request");
                            }
                });
            }
        });
};