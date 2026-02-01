const fs = require('fs');

// Paths
const backupPath = 'c:/Users/Brain/Downloads/school8-main/school8-main/assets/css/style.css';
const currentPath = 'c:/Users/Brain/Downloads/school8-main/src/assets/css/style.css';

// Simple regex to capture selectors (before {)
// This is not a perfect parser but good enough for finding missing blocks
// It captures text followed by {
const selectorRegex = /([^{}]+)\{/g;

function getSelectors(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Remove comments
    const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    const selectors = new Set();
    let match;
    while ((match = selectorRegex.exec(cleanContent)) !== null) {
        // Clean up selector: remove newlines, multiple spaces, trim
        const selector = match[1].replace(/\s+/g, ' ').trim();
        // Split by comma for grouped selectors
        const parts = selector.split(',').map(s => s.trim());
        parts.forEach(p => {
            if (p.length > 0 && !p.startsWith('@media')) {
                selectors.add(p);
            }
        });
    }
    return selectors;
}

try {
    const backupSelectors = getSelectors(backupPath);
    const currentSelectors = getSelectors(currentPath);

    console.log(`Backup selectors: ${backupSelectors.size}`);
    console.log(`Current selectors: ${currentSelectors.size}`);

    const missing = [];
    backupSelectors.forEach(s => {
        if (!currentSelectors.has(s)) {
            missing.push(s);
        }
    });

    console.log('\n--- MISSING SELECTORS (Present in backup, missing in current) ---');
    console.log(JSON.stringify(missing, null, 2));

} catch (err) {
    console.error('Error:', err.message);
}
