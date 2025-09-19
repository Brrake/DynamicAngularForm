import json
from pathlib import Path

lib_name='dynamic-form'

tools_dir = Path(__file__).resolve().parent
main_dir = tools_dir.parent
project_dir = main_dir / 'projects' / lib_name
def update_version():
    # Read the file content
    try:
        with open(project_dir / 'package.json', 'r', encoding='utf8') as file:
            data = file.read()
    except IOError as e:
        print(f"Error reading the file: {e}")
        exit()

    # Parse the JSON data
    try:
        json_data = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        exit()

    # Get the version string
    version = json_data.get('version')
    if not version:
        print("Version string not found in JSON")
        exit()

    # Split the version string into major, minor, and patch
    major, minor, patch = map(int, version.split('.'))

    # Increment the version
    patch += 1
    if patch > 99:
        patch = 0
        minor += 1
    if minor > 9:
        minor = 0
        major += 1

    # Create the new version string
    new_version = f"{major}.{minor}.{patch}"

    # Update the JSON with the new version
    json_data['version'] = new_version

    # Write the updated JSON back to the file
    try:
        with open(project_dir / 'package.json', 'w', encoding='utf8') as file:
            json.dump(json_data, file, indent=2)
        print("Version updated successfully:")
        print(f"Old Version: {version}")
        print(f"New Version: {new_version}")
    except IOError as e:
        print(f"Error writing to the file: {e}")
