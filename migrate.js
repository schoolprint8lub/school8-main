
const fs = require('fs');
const path = require('path');

// Use relative path from the script execution location
const srcDir = path.join(__dirname, 'src');
const pagesDir = path.join(srcDir, 'pages');

console.log('Source directory:', srcDir);
console.log('Pages directory:', pagesDir);

if (!fs.existsSync(srcDir)) {
    console.error('Error: Source directory does not exist!');
    process.exit(1);
}

if (!fs.existsSync(pagesDir)) {
    console.log('Creating pages directory...');
    fs.mkdirSync(pagesDir, { recursive: true });
}

// Simple frontmatter parser/stringifier
function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (match) {
        const fmLines = match[1].split(/\r?\n/);
        const data = {};
        fmLines.forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                let value = parts.slice(1).join(':').trim();
                // Remove quotes if present
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                data[key] = value;
            }
        });
        return { data, content: match[2] };
    }
    return { data: {}, content: content };
}

function stringifyFrontmatter(content, data) {
    let fm = '---\n';
    for (const [key, value] of Object.entries(data)) {
        fm += `${key}: "${value}"\n`;
    }
    fm += '---\n\n';
    fm += content;
    return fm;
}

try {
    const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.njk'));
    console.log(`Found ${files.length} .njk files.`);

    files.forEach(file => {
        if (file === 'index.njk') return; // Skip homepage

        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Check if file has frontmatter
        if (!content.trim().startsWith('---')) {
            console.log(`Skipping ${file} (no frontmatter)`);
            return;
        }

        const parsed = parseFrontmatter(content);

        // Update frontmatter
        parsed.data.layout = 'layouts/page.njk';
        parsed.data.permalink = `/${path.basename(file, '.njk')}/`;

        // Ensure bodyClass exists
        if (!parsed.data.bodyClass) {
            parsed.data.bodyClass = 'inner-page';
        }

        const newContent = stringifyFrontmatter(parsed.content, parsed.data);
        const newFilePath = path.join(pagesDir, file.replace('.njk', '.md'));

        fs.writeFileSync(newFilePath, newContent);
        console.log(`Converted ${file} to ${newFilePath}`);
    });
    console.log("Migration completed successfully.");
} catch (err) {
    console.error("An error occurred:", err);
    process.exit(1);
}
