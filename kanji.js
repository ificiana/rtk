import kanji_db from './kanji_db.json' assert { type: 'json' };


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
    const cur = v["no"];
    const nxt = cur+dir;
    if(nxt in kanji_db){
        window.location.href = `?=${kanji_db[nxt]["kanji"]}`;
    }
}

export default {format_words, nav, kanji_db} 
