module.exports = {
    getFriendsList:
        async function(str, pass) {
            if(!str || str == "") throw new Error("Please provide your player ID or username!");
            if(!pass || pass == "") throw new Error("Please provide your password!");

            const {gjReq} = require("../misc/gjReq.js");
            const {gjp} = require("../misc/gjp.js");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            const data = {
                accountID: user.accountID,
                gjp: gjp(pass),
                secret: "Wmfd2893gb7"
            }

            let res = await gjReq("getGJUserList20", data);
            let players = res.data.split("|");
            let result = [];

            let colors = require("../misc/colors.json");
            const { rgbToHEX } = require("../misc/rgbToHEX.js");

            players.forEach(p => {
                let username = p.split(":")[1];
                let playerID = p.split(":")[3];
                let p1 = p.split(":")[7];
                let p2 = p.split(":")[9];
                let accID = p.split(":")[15];
                let msg = p.split(":")[17];

                let msgState = {
                    "0": "all",
                    "1": "friends",
                    "2": "none"
                }

                result.push({
                    username: username,
                    playerID: Number(playerID),
                    accountID: Number(accID),
                    color1: rgbToHEX(colors[p1]),
                    color2: rgbToHEX(colors[p2]),
                    messages: msgState[msg]
                })
            })

            return result;
        }
}