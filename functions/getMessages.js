module.exports = {
    getMessages: 
        async function(user, pass, page = 1) {
            if(!user || user == "") throw new Error("Please provide your player ID or username!");
            if(!pass || pass == "") throw new Error("Please provide your password!");
            if(Number(page) == NaN) throw new Error("The page should be a number!");
            
            const {gjReq} = require("../misc/gjReq.js");
            const {secret} = require("../config.json");
            const {gjp} = require("../misc/gjp.js");
            const {decMsg} = require("../misc/decMsg.js");
            const { searchUsers } = require("./searchUsers.js");

            let userObj = await searchUsers(user);

            const data = {
                accountID: userObj.accountID,
                gjp: gjp(pass),
                secret: secret,
                page: Number(page) - 1
            }

            let res = await gjReq("getGJMessages20", data);
            if(res.data == -1) throw new Error(-1);

            let msgs = res.data.split("|");
            let result = [];
            msgs.forEach(m => {
                result.push(decMsg(m));
            })

            return result;
        }
}