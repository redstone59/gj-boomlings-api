module.exports = {
    updateLevelDesc: 
        async function(level, d, user, password) {
            let desc = d;

            if(!level || level == "") throw new Error("Please provide a level ID!");
            if(Number(level) == NaN) throw new Error("A level ID must be a number!");
            if(!desc) desc = "(No description provided)";
            if(!user || user == "") throw new Error("Please provide a user ID or name!");
            if(!password || password == "") throw new Error("Please provide a password!");

            const {gjReq} = require("../misc/gjReq.js");
            const { secret } = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");

            let userObj = await searchUsers(user);

            const { gjp } = require("../misc/gjp.js");
            const { encB64 } = require("../misc/encB64.js");

            const uLDdata = {
                accountID: userObj.accountID,
                gjp: gjp(password),
                levelID: level,
                levelDesc: encB64(desc),
                secret: secret
            }

            let res = await gjReq("updateGJDesc20", uLDdata);
            if(res.data == -1) throw new Error("-1 Failed to update the description.");

            return 1;
        }
}