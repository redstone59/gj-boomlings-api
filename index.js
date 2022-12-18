const { dlLevel } = require("./functions/dlLevel.js");
const { getLevelData } = require("./functions/getLevelData.js");
const { getSongInfo } = require("./functions/getSongInfo.js");
const { getOfficialSongInfo } = require("./functions/getOfficialSongInfo.js");
const { decURLSafeBase64 } = require("./functions/decURLSafeBase64.js");
const { encURLSafeBase64 } = require("./functions/encURLSafeBase64.js");
const { getDailyLevel } = require("./functions/getDailyLevel.js");
const { getWeeklyDemon } = require("./functions/getWeeklyDemon.js");

module.exports.dlLevel = dlLevel;
module.exports.getLevelData = getLevelData;
module.exports.getSongInfo = getSongInfo;
module.exports.getOfficialSongInfo = getOfficialSongInfo;
module.exports.decURLSafeBase64 = decURLSafeBase64;
module.exports.encURLSafeBase64 = encURLSafeBase64;
module.exports.getDailyLevel = getDailyLevel;
module.exports.getWeeklyDemon = getWeeklyDemon;