module.exports = {
    getAccountPosts:
        async function(str, page = 1) {
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            const { decodeAccountPost } = require("../misc/decodeAccountPost.js");
            const axios = require("axios");
            const { headers, server } = require("../config.json");
            const { searchUsers } = require("./searchUsers.js");

            let user = await searchUsers(str);

            let ACdata = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                accountID: user.accountID,
                secret: "Wmfd2893gb7",
                page: page - 1
            };

            let res = await axios.post(server + "getGJAccountComments20.php", ACdata, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 Not found.");
                if(e.response.data.startsWith("#")) throw new Error("Whoops! Couldn't find anything!");
                throw new Error(e.response.data);
            })
            
            let accPosts = res.data.split("|");
            let result = [];
            accPosts.forEach(p => {
                result.push(decodeAccountPost(p));
            })

            return result;
        }
}