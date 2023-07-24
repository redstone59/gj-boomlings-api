module.exports = {
    /**
     * Gets the basic level info by its ID.
     * 
     * It's the same as dlLevel(), but it works faster and doesn't provide the password, update date, upload date, the info about LDM and an accurate object counter.
     * 
     * By the way, GD uses this for search results.
     * @param {*} id - The level ID.
     */
    getLevelByID:
        async function (id) {
            if (!id) throw new Error("Please provide a level ID!");
            if (isNaN(id)) throw new Error("The level ID should be a number!");

            const { gjReq } = require("../misc/gjReq.js");
            const { gjWReq } = require("../misc/gjWReq.js");
            const { secret } = require("../config.json");
            const { decB64 } = require("../misc/decB64.js");

            const data = {
                secret: secret,
                str: id,
                type: 0
            }

            let res = await gjReq("getGJLevels21", data);
            if (res.data == -1) throw new Error("-1 Not found.");

            if (res.data == "error code: 1005") {
                res = await gjWReq("getLevelByID", id);
                if (res.status == 403) throw new Error(res.data.error);
                return res.data;
            }

            async function decodeLevel(l) {
                let spl = l.split(':');
                let lInfo = [];
                for (let i = 0; i < spl.length; i++) {
                    if (i % 2 != 0) {
                        lInfo.push(spl[i - 1] + `:` + spl[i]);
                    }
                }

                let id = lInfo[0].split("1:")[1];
                let name = lInfo[1].split("2:")[1];
                let version = lInfo[2].split("5:")[1];
                let difficulty = lInfo[5].split("9:")[1];
                let downloads = lInfo[6].split("10:")[1];
                let officialSong = lInfo[7].split("12:")[1];
                let gameVersion = lInfo[8].split("13:")[1];
                let likes = lInfo[9].split("14:")[1];
                let demonBool = lInfo[10].split("17:")[1];
                let stars = lInfo[13].split("18:")[1];
                let ftrd = lInfo[14].split("19:")[1];
                let epic = lInfo[15].split("42:")[1];
                let objs = lInfo[16].split("45:")[1];
                let desc = lInfo[17].split("3:")[1];
                let length = lInfo[18].split("15:")[1];
                let copiedID = lInfo[19].split("30:")[1];
                let twoPlayer = lInfo[20].split("31:")[1];
                let coins = lInfo[21].split("37:")[1];
                let verifiedCoins = lInfo[22].split("38:")[1];
                let starsRequested = lInfo[23].split("39:")[1];
                let customSong = lInfo[26].split("35:")[1].split("#")[0];
                let author = lInfo.length == 29 ? lInfo[27].split(":")[0] : "-";

                let disliked = likes.includes("-") ? true : false;

                if (desc.includes("/")) desc = desc.split("/")[0];
                if (decB64(desc) == '') desc = "KE5vIGRlc2NyaXB0aW9uIHByb3ZpZGVkKQ=="

                let featured = Boolean(Number(ftrd));

                let difficultyDecoding = {
                    "-10": "Auto",
                    "0": "Unrated",
                    "10": "Easy",
                    "20": "Normal",
                    "30": "Hard",
                    "40": "Harder",
                    "50": "Insane"
                }

                if (Boolean(Number(demonBool))) {
                    difficultyDecoding = {
                        "10": "Easy Demon",
                        "20": "Medium Demon",
                        "30": "Hard Demon",
                        "40": "Insane Demon",
                        "50": "Extreme Demon"
                    }
                }

                const lengthDecoding = {
                    "0": "Tiny",
                    "1": "Short",
                    "2": "Medium",
                    "3": "Long",
                    "4": "XL"
                }

                const decodeGameVersion = {
                    "10": "1.7",
                    "18": "1.8",
                    "19": "1.9",
                    "20": "2.0",
                    "21": "2.1",
                    undefined: "Pre-1.7"
                }

                const { getOfficialSongInfo } = require("../functions/getOfficialSongInfo.js");

                let song;
                if (Number(officialSong) > 0) song = getOfficialSongInfo(Number(officialSong) + 1);
                if (Number(officialSong) == 0 && Number(customSong) == 0) song = getOfficialSongInfo(1);
                if (Number(customSong) > 0) {
                    let songName = l.split("~|~2~|~")[1].split("~|~3~|~")[0]
                    let songId = Number(l.split("#1~|~")[1].split("~|~2~|~")[0])
                    let artist = l.split("~|~4~|~")[1].split("~|~5~|~")[0]
                    let artistId = Number(l.split("~|~3~|~")[1].split("~|~4~|~")[0])
                    let size = `${l.split("~|~5~|~")[1].split("~|~6~|~")[0]} MB`
                    let link = decodeURIComponent(l.split("~|~10~|~")[1].split("~|~7~|~")[0])

                    let songinfo = {
                        "name": songName,
                        "id": songId,
                        "artist": artist,
                        "artistId": artistId,
                        "fileSize": size,
                        "link": link
                    }

                    song = songinfo;
                }

                let result = {
                    id: Number(id),
                    name: name,
                    description: decB64(desc),
                    creator: author,
                    level_version: Number(version),
                    difficulty: difficultyDecoding[difficulty],
                    stars: Number(stars),
                    downloads: Number(downloads),
                    likes: Number(likes),
                    disliked: disliked,
                    length: lengthDecoding[length],
                    demon: Boolean(Number(demonBool)),
                    featured: featured,
                    epic: Boolean(Number(epic)),
                    objects: Number(objs),
                    stars_requested: Number(starsRequested),
                    game_version: decodeGameVersion[gameVersion],
                    copied: Number(copiedID),
                    large: Number(objs) > 40000 ? true : false,
                    two_p: Boolean(Number(twoPlayer)),
                    coins: Number(coins),
                    verified_coins: Boolean(Number(verifiedCoins)),
                    song: song
                }

                if (["Extreme Demon", "Insane Demon"].includes(difficultyDecoding[difficulty])) {
                    const { demonlist } = require("../misc/demonlist.js");
                    const dlist = await demonlist(name.trim());
                    if (dlist != null) result.pointercrate = dlist;
                }
                return result;
            }

            return await decodeLevel(res.data);
        }
}