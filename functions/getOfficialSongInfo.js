module.exports = {
    getOfficialSongInfo:
        function(song) {
            if(!song) throw new Error("Please provide a song ID.");
            if(isNaN(song)) throw new Error("A song ID must be a number.");
                const {
                    sm,
                    bot,
                    pg,
                    dout,
                    bab,
                    clg,
                    j,
                    tm,
                    c,
                    xs,
                    cf,
                    toe,
                    ea,
                    cs,
                    ed,
                    hf,
                    bp,
                    toeii,
                    gd,
                    d,
                    fd,
                    tss,
                    va,
                    ar,
                    tc,
                    p,
                    bm,
                    m,
                    y,
                    f,
                    sp,
                    s,
                    e,
                    round,
                    mdo,
                    ps,
                    ne,
                    pt,
                    unknown
                } = require("../misc/officialsongs.json");
                const jsons = {
                    1: sm,
                    2: bot,
                    3: pg,
                    4: dout,
                    5: bab,
                    6: clg,
                    7: j,
                    8: tm,
                    9: c,
                    10: xs,
                    11: cf,
                    12: toe,
                    13: ea,
                    14: cs,
                    15: ed,
                    16: hf,
                    17: bp,
                    18: toeii,
                    19: gd,
                    20: d,
                    21: fd,
                    22: tss,
                    23: va,
                    24: ar,
                    25: tc,
                    26: p,
                    27: bm,
                    28: m,
                    29: y,
                    30: f,
                    31: sp,
                    32: s,
                    33: e,
                    34: round,
                    35: mdo,
                    36: ps,
                    37: ne,
                    38: pt
                }
                let result = jsons[Number(song)];
                if(result == undefined) result = unknown;
                return result;
        }
}