const { execSync } = require('child_process');
const fs = require('fs');

const screenId = "c6f9f328eec14a7ca9cda70afea82a9c";
const params = JSON.stringify({ screenId });
fs.writeFileSync('params.json', params);

try {
    const output = execSync('npx @_davideast/stitch-mcp tool get_screen_code -f params.json', { encoding: 'utf8' });
    console.log(output);
} catch (error) {
    console.error('Error:', error.message);
    console.error('Stdout:', error.stdout);
    console.error('Stderr:', error.stderr);
}
