const kanji_db = {
    "一": {
        "kanji-name": "一",
        "rtk-num": 1,
        "rtk-kw": "One",
        "grade": "1",
        "readings": "いち、いっ、ひと",
        "words": [
            "一緒（に）",
            "一人",
            "一切",
            "一瞬",
            "唯一",
            "一体",
            "一生",
            "一応",
            "一般",
            "一斉に",
            "一言",
            "一気（に）",
            "一部",
            "一生懸命"
        ]
    },
    "二": {
        "kanji-name": "二",
        "rtk-num": 2,
        "rtk-kw": "Two",
        "grade": "1",
        "readings": "に、ふた",
        "words": [
            "二人（とも、して、分）",
            "二度と",
            "二重",
            "二の腕",
            "真っ二つ（に）",
            "二人組",
            "二倍",
            "唯一無二",
            "二次元",
            "二足歩行"
        ]
    },
    "三": {
        "kanji-name": "三",
        "rtk-num": 3,
        "rtk-kw": "Three",
        "grade": "1",
        "readings": "さん、み",
        "words": [
            "三人",
            "第三者",
            "三角",
            "三人組",
            "三段",
            "三流",
            "三次元",
        ]
    },
    "四": {
        "kanji-name": "四",
        "rtk-num": 4,
        "rtk-kw": "Four",
        "grade": "1",
        "readings": "さん、み",
        "words": [
            "四肢",
            "四方八方",
            "四六時中",
            "四つん這い",
            "四季",
            "四苦八苦",
            "四隅",
            "四辺",
            "四面楚歌",
        ]
    },
    "五": {
        "kanji-name": "五",
        "rtk-num": 5,
        "rtk-kw": "Five",
        "grade": "1",
        "readings": "ご、い、いつ",
        "words": [
            "五感",
            "五体満足",
            "五指",
            "四の五の言う",
            "@hr",
            "語",
            "悟",
            "吾",
        ]
    },
}

const rtk_kanji_map = {};
for ([k,v] of Object.entries(kanji_db)) rtk_kanji_map[v["rtk-num"]] = k;

const format_words = v => {
    word_string = v.words.join("、");
    res = "";
    for (const i of [...Array(word_string.length).keys()]){
        char = word_string[i];
        if(word_string.charCodeAt(i)>=0x4e00 && word_string.charCodeAt(i)<=0x9faf){
            res+=`<a href="?=${char}"><ruby> ${char} <rp>[</rp><rt>${(char in kanji_db)?kanji_db[char]["rtk-num"]: "?"}</rt><rp>]</rp></ruby></a>`;
        }
        else res += word_string[i];
    }
    return res.replace("@hr、", "<hr>");
}
const nav = (v, dir) => {
    console.log("hit3");
    cur = v["rtk-num"];
    console.log(cur);
    nxt = cur+dir;
    if(nxt in rtk_kanji_map){
        nxt_e = rtk_kanji_map[nxt];
        window.location.href = `?=${kanji_db[nxt_e]["kanji-name"]}`;
    }
}
