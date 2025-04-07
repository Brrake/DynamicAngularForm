const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
// Set the file path
const filePath = path.join(__dirname,'../projects','dynamic-form','package.json');

// Read the file content
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    let json;
    try {
        json = JSON.parse(data);
    } catch (e) {
        console.error('Error parsing JSON:', e);
        return;
    }

    // Get the version string
    let version = json.version;
    if (!version) {
        console.error('Version string not found in JSON');
        return;
    }

    // Split the version string into major, minor, and patch
    let [major, minor, patch] = version.split('.').map(Number);

    // Increment the version
    patch += 1;
    if (patch > 99) {
        patch = 0;
        minor += 1;
    }
    if (minor > 9) {
        minor = 0;
        major += 1;
    }

    // Create the new version string
    const newVersion = `${major}.${minor}.${patch}`;

    // Update the JSON with the new version
    json.version = newVersion;

    // Write the updated JSON back to the file
    fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', err => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }
        console.log('Version updated successfully:');
        console.log(`Old Version: ${version}`);
        console.log(`New Version: ${newVersion}`);
    });
});
