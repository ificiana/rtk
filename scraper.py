from concurrent.futures import ThreadPoolExecutor
import json
import pandas
import mechanicalsoup

heisig_df = pandas.read_csv("heisig-kanjis/heisig-kanjis.csv")

# we're working with 6th edition only need the mapping
heisig_df["id_6th_ed"] = heisig_df["id_6th_ed"].fillna(heisig_df["id_5th_ed"])
heisig_df["id_6th_ed"] = heisig_df["id_6th_ed"].astype(int)
heisig_df = heisig_df.drop(["id_5th_ed", "keyword_5th_ed", "components", "on_reading", "kun_reading"], axis=1)

def get_kanji_data(kanji):
    # mechanicalsoup stuff
    browser = mechanicalsoup.StatefulBrowser(
    soup_config={'features': 'html5lib'},
)
    data = browser.open(f"https://jpdb.io/kanji/{kanji}?expand=v#a")
    soup = data.soup

    data = []
    table = soup.find('table', attrs={'class': 'cross-table'})
    table_body = table.find('tbody')

    rows = table_body.find_all('tr')
    for row in rows:
        cols = row.find_all('td')
        cols = [ele.text.strip() for ele in cols]
        data.append([ele for ele in cols if ele])  # Get rid of empty values

    data = {
        "freq": data[0][1],
        "type": data[1][1][:-2],
        "kanken": data[2][1],
        "heisig": int(data[3][1]),
        "readings": {k:int(v[1:-2]) for k,v in [(reading.replace("(", " (")).split() for reading in (data[4][1].replace(")", ") ")).split()]}
    }

    keyword = soup.find('div', attrs={'class': 'subsection'}).text
    data["keyword"] = keyword

    words = [_w["href"].split("/")[3] for _w in soup.select("div.subsection>.used-in>.jp>.plain")[:20]]
    data["words"] = words

    print(kanji, data)
    return kanji, data


# print(heisig_df.head(5))
data = {}
def write(e, i):
    print(heisig_df.iloc[e].values)
    k, _data = get_kanji_data(i)
    # two way
    d = {
        "kanji": k,
        "no": _data["heisig"],
        "kw": _data["keyword"],
        "type": _data["type"],
        "readings": _data["readings"],
        "words": _data["words"],
    }
    data[k] = d
    data[_data["heisig"]] = d
    with open("kanji_db.json", "w") as f:
        json.dump(data, f)        

with ThreadPoolExecutor(1000) as exe:
    for e, i in enumerate(heisig_df["kanji"][:5]):
        exe.submit(write, e, i)
