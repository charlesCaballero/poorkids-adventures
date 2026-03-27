const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function findZipFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findZipFiles(file));
    } else if (file.endsWith('.zip')) {
      results.push(file);
    }
  });
  return results;
}

const zipFiles = findZipFiles('.');
console.log('Found zip files:', zipFiles);

if (zipFiles.length > 0) {
  zipFiles.forEach(zipFile => {
    const targetDir = path.dirname(zipFile);
    console.log(`Extracting ${zipFile} to ${targetDir}`);
    try {
      // Use npx to run extract-zip or similar if available, or just try to use node-stream-zip if it's there.
      // Since I can't easily install new packages and use them in the same script without a package.json update,
      // I'll try to use a simple approach if possible.
      // Actually, I can use npx -y extract-zip
      execSync(`npx -y extract-zip "${zipFile}" "${targetDir}"`, { stdio: 'inherit' });
      console.log(`Extracted ${zipFile}`);
    } catch (err) {
      console.error(`Failed to extract ${zipFile}:`, err.message);
    }
  });
} else {
  console.log('No zip files found.');
}
