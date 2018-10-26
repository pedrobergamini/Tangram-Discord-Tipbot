const request = require("request");
const User = require("../data_models/user.js");

// SETS WALLET PASSWORD
const password = "";


// EXPORTS FUNCTION
module.exports = function deposit(message){
  User.findOne({ discordId: message.author }, function (error, user) {
            if (error) {
                console.log(error);
                message.channel.send("Something went wrong");
            } else if (user && user.address) {
                const headers = {
                    "accept": "application/json",
                    "Authorization": "N7C7aYXrQVrjz#CA",
                    "Content-Type": "application/json",
                };
                const options = {
                    url: "http://41.185.26.184:8081/actor/wallet",
                    method: 'POST',
                    headers: headers,
                    form: { "identifier": user.walletId, "password": password }
                };
                request(options, function (err, response, body) {
                    if (!err && response.statusCode == 201) {
                        body = JSON.parse(body);
                        message.channel.send( user.discordId + " your deposit address is: " + body.addresses[0].base58);
                    } else {
                        message.channel.send("Bad request, please try again");
                    }
                });
            } else {
                message.channel.send(message.author + " please generate your address first");
            }
        });  
};