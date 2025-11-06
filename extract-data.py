import json
import os
from pathlib import Path

apps = []
categories_dir = Path("apps-data/categories")

for category_folder in sorted(categories_dir.iterdir()):
    if category_folder.is_dir():
        category = category_folder.name
        for json_file in sorted(category_folder.glob("*.json")):
            with open(json_file, 'r', encoding='utf-8') as f:
                app_data = json.load(f)
                apps.append({
                    "name": app_data.get("name", ""),
                    "slug": app_data.get("slug", ""),
                    "description": app_data.get("description", ""),
                    "category": app_data.get("category", category),
                    "website": app_data.get("website", ""),
                    "alternatives": app_data.get("alternatives", []),
                    "pricing": app_data.get("pricing", ""),
                    "company": app_data.get("company", ""),
                    "location": app_data.get("location", ""),
                    "image": app_data.get("opengraph", {}).get("image", ""),
                    "description_long": app_data.get("opengraph", {}).get("description", ""),
                })

# Generate TypeScript file
output = "export const apps = " + json.dumps(apps, indent=2) + ";\n"

with open("app/data/apps.ts", "w", encoding='utf-8') as f:
    f.write(output)

print(f"Extracted {len(apps)} apps into app/data/apps.ts")
