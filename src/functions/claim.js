const request = require("request");
const User = require("../data_models/user.js");

// SETS WALLET PASSWORD
const password = "";


// EXPORTS FUNCTION
module.exports = function claim (message){
    User.findOne({ discordId: message.author }, function (error, user) {
            if (error) {
                return console.log(error);
            } else if (user && user.address) {
                const headers = {
                    "accept": "application/json",
                    "Authorization": "N7C7aYXrQVrjz#CA",
                    "Content-Type": "application/json",
                };
                const options = {
                    url: "http://41.185.26.184:8081/actor/wallet/reward",
                    method: 'POST',
                    headers: headers,
                    form: { "identifier": user.walletId, "password": password, "address": user.address, "amount": 100 }
                };
                request(options, function (err, response, body) {
                    if (!err && response.statusCode == 201) {
                        body = JSON.parse(body);
                        message.channel.send(user.discordId + " you claimed 100 $TGM");
                    } else {
                        message.channel.send("Bad request");
                    }
                });
            } else {
                message.channel.send (message.author + " please generate your address first");
            }
        });
};