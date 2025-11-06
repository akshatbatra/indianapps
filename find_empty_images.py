import json
import re

# Read the file
with open('app/data/apps.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the apps array
match = re.search(r'export const apps = (\[.*?\])\s*;', content, re.DOTALL)
if match:
    apps_str = match.group(1)
    # Replace undefined with null for valid JSON
    apps_str = apps_str.replace('undefined', 'null')
    # Remove trailing commas
    apps_str = re.sub(r',(\s*[\]}])', r'\1', apps_str)
    
    try:
        apps = json.loads(apps_str)
        
        # Find apps with empty image
        empty_image_apps = [app for app in apps if not app.get('image') or app.get('image').strip() == '']
        
        print(f"Found {len(empty_image_apps)} apps with empty/missing image URLs:\n")
        for app in empty_image_apps:
            print(f"{app.get('name')} ({app.get('company')})")
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
