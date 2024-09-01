from bs4 import BeautifulSoup
import requests
for page in range(1, 11):
    url = "https://www.azquotes.com/top_quotes.html?p="+str(page)
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    list_items = soup.select("#content > div > div:nth-of-type(1) > div > ul > li")
    for item in list_items:
        quote = item.select_one("a.title").text.replace("\"", "")
        author = item.select_one("div.author > a").text
        print(f"\"{author}\",\"{quote}\"")
