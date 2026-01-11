import requests
from bs4 import BeautifulSoup
import json
import time

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

def resolve_amzn(short_url):
    r = requests.get(short_url, allow_redirects=True, headers=headers)
    return r.url

def scrape_amazon(dp_url):
    r = requests.get(dp_url, headers=headers)
    soup = BeautifulSoup(r.text, "lxml")

    data = {}

    # Price
    price = soup.select_one("span.a-price-whole")
    if price:
        data["price"] = "₹" + price.text.strip().replace(",", "") + price.find_next("span").text.strip()
    else:
        data["price"] = None

    # MRP / Strikethrough price
    mrp = soup.select_one("span.a-text-price span.a-offscreen")
    data["mrp"] = mrp.text.strip() if mrp else None

    # Discount %
    off = soup.select_one("span.a-size-medium.a-color-success")
    data["discount"] = off.text.strip() if off else None

    # Rating
    rating = soup.select_one("span.a-icon-alt")
    data["rating"] = rating.text.split()[0] if rating else None

    # Reviews count
    reviews = soup.select_one("#acrCustomerReviewText")
    data["reviews"] = reviews.text.strip().split()[0] if reviews else None

    # Image URL
    img = soup.select_one("#landingImage")
    data["image"] = img['src'] if img else None

    return data


with open("products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

for p in products:
    print(f"\nChecking: {p['name']}")

    # Step 1: Resolve short URL once
    dp_url = resolve_amzn(p["link"])
    print(f"Resolved to: {dp_url}")

    # Step 2: Scrape details
    new_data = scrape_amazon(dp_url)

    # Step 3: Log comparison
    if new_data.get("price") and new_data["price"] != p.get("price"):
        print(f"✔ Price updated: {p.get('price')} → {new_data['price']}")
        p["price"] = new_data["price"]
    else:
        print("= Price same")

    if new_data.get("mrp") and new_data["mrp"] != p.get("mrp"):
        print(f"✔ MRP updated: {p.get('mrp')} → {new_data['mrp']}")
        p["mrp"] = new_data["mrp"]

    if new_data.get("discount") and new_data["discount"] != p.get("discount"):
        print(f"✔ Discount updated: {p.get('discount')} → {new_data['discount']}")
        p["discount"] = new_data["discount"]

    if new_data.get("rating"):
        p["rating"] = new_data["rating"]

    if new_data.get("reviews"):
        p["reviews"] = new_data["reviews"]

    if new_data.get("image"):
        p["image"] = new_data["image"]

    time.sleep(1.5)  # prevent blocking

with open("products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("\nAll products updated!")