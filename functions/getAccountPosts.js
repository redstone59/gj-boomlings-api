module.exports = {
    getAccountPosts:
        async function(str, page = 1) {
            if(!str || str == "") throw new Error("Please provide a user ID or name!");
            const { decodeAccountPost } = require("../misc/decodeAccountPost.js");
            const axios = require("axios");
            const { headers, server } = require("../config.json");

            const data = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                str: str,
                secret: "Wmfd2893gb7"
            };

            let r = await axios.post(server + "getGJUsers20.php", data, {
                headers: headers
            }).catch(e => {
                if(e.response.data == -1) throw new Error("-1 This user is not found.");
                throw new Error(e.response.data);
            })

            let id = r.data.split(":16:")[1].split(":3:")[0];
            if(Number(id) < 71 || id.includes(":")) id = r.data.split(":16:")[2].split(":3:")[0];

            let ACdata = {
                gameVersion: 21,
                binaryVersion: 35,
                gdw: 0,
                accountID: id,
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

            let firstPost = res.data;
            let secondPost;
            let thirdPost;
            let fourthPost;
            let fifthPost;
            let sixthPost;
            let seventhPost;
            let eighthPost;
            let ninthPost;
            let tenthPost;

            let result = [decodeAccountPost(firstPost)]

            if(res.data.split("|").length - 1 == 1) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost)]
            }

            if(res.data.split("|").length - 1 == 2) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                thirdPost = res.data.split("|")[2].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost),decodeAccountPost(thirdPost)]
            }

            if(res.data.split("|").length - 1 == 3) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                thirdPost = res.data.split("|")[2].split("|")[0];
                fourthPost = res.data.split("|")[3].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost),decodeAccountPost(thirdPost),decodeAccountPost(fourthPost)]
            }

            if(res.data.split("|").length - 1 == 4) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                thirdPost = res.data.split("|")[2].split("|")[0];
                fourthPost = res.data.split("|")[3].split("|")[0];
                fifthPost = res.data.split("|")[4].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost),decodeAccountPost(thirdPost),decodeAccountPost(fourthPost),decodeAccountPost(fifthPost)]
            }

            if(res.data.split("|").length - 1 == 5) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                thirdPost = res.data.split("|")[2].split("|")[0];
                fourthPost = res.data.split("|")[3].split("|")[0];
                fifthPost = res.data.split("|")[4].split("|")[0];
                sixthPost = res.data.split("|")[5].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost),decodeAccountPost(thirdPost),decodeAccountPost(fourthPost),decodeAccountPost(fifthPost),decodeAccountPost(sixthPost)]
            }

            if(res.data.split("|").length - 1 == 6) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                thirdPost = res.data.split("|")[2].split("|")[0];
                fourthPost = res.data.split("|")[3].split("|")[0];
                fifthPost = res.data.split("|")[4].split("|")[0];
                sixthPost = res.data.split("|")[5].split("|")[0];
                seventhPost = res.data.split("|")[6].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost),decodeAccountPost(thirdPost),decodeAccountPost(fourthPost),decodeAccountPost(fifthPost),decodeAccountPost(sixthPost),decodeAccountPost(seventhPost)]
            }

            if(res.data.split("|").length - 1 == 7) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                thirdPost = res.data.split("|")[2].split("|")[0];
                fourthPost = res.data.split("|")[3].split("|")[0];
                fifthPost = res.data.split("|")[4].split("|")[0];
                sixthPost = res.data.split("|")[5].split("|")[0];
                seventhPost = res.data.split("|")[6].split("|")[0];
                eighthPost = res.data.split("|")[7].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost),decodeAccountPost(thirdPost),decodeAccountPost(fourthPost),decodeAccountPost(fifthPost),decodeAccountPost(sixthPost),decodeAccountPost(seventhPost),decodeAccountPost(eighthPost)]
            }

            if(res.data.split("|").length - 1 == 8) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                thirdPost = res.data.split("|")[2].split("|")[0];
                fourthPost = res.data.split("|")[3].split("|")[0];
                fifthPost = res.data.split("|")[4].split("|")[0];
                sixthPost = res.data.split("|")[5].split("|")[0];
                seventhPost = res.data.split("|")[6].split("|")[0];
                eighthPost = res.data.split("|")[7].split("|")[0];
                ninthPost = res.data.split("|")[8].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost),decodeAccountPost(thirdPost),decodeAccountPost(fourthPost),decodeAccountPost(fifthPost),decodeAccountPost(sixthPost),decodeAccountPost(seventhPost),decodeAccountPost(eighthPost),decodeAccountPost(ninthPost)]
            }

            if(res.data.split("|").length - 1 == 9) {
                firstPost = res.data.split("|")[0];
                secondPost = res.data.split("|")[1].split("|")[0];
                thirdPost = res.data.split("|")[2].split("|")[0];
                fourthPost = res.data.split("|")[3].split("|")[0];
                fifthPost = res.data.split("|")[4].split("|")[0];
                sixthPost = res.data.split("|")[5].split("|")[0];
                seventhPost = res.data.split("|")[6].split("|")[0];
                eighthPost = res.data.split("|")[7].split("|")[0];
                ninthPost = res.data.split("|")[8].split("|")[0];
                tenthPost = res.data.split("|")[9].split("|")[0];
                result = [decodeAccountPost(firstPost),decodeAccountPost(secondPost),decodeAccountPost(thirdPost),decodeAccountPost(fourthPost),decodeAccountPost(fifthPost),decodeAccountPost(sixthPost),decodeAccountPost(seventhPost),decodeAccountPost(eighthPost),decodeAccountPost(ninthPost),decodeAccountPost(tenthPost)]
            }

            return result;
        }
}