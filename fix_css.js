const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/assets/css/style.css');

try {
    // Read the file as a buffer to handle any encoding
    const buffer = fs.readFileSync(filePath);

    // Check if we can just convert to string and filter
    // If it's UTF-16 LE mixed with UTF-8, null bytes will be present
    let content = buffer.toString('utf8');

    // Check for null bytes
    if (content.includes('\u0000')) {
        console.log('Detected null bytes (likely UTF-16 corruption). Fixing...');
        // Remove all null bytes
        content = content.replace(/\u0000/g, '');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed style.css encoding issues.');
    } else {
        console.log('No null bytes found. File seems okay, but saving ensuring UTF-8 just in case.');
        // Just to be sure, write back as utf8
        fs.writeFileSync(filePath, content, 'utf8');
    }

} catch (err) {
    console.error('Error processing file:', err);
}
