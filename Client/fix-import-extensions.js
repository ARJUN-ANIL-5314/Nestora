const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

function fixImports(file) {
  let content = fs.readFileSync(file, 'utf-8');

  const importRegex = /(import\s+.*?from\s+['"])(\.\/.*?)(?:\.js|\.jsx)?(['"])/g;

  content = content.replace(importRegex, (match, p1, p2, p3) => {
    const dir = path.dirname(file);
    const filePathJs = path.resolve(dir, p2 + '.js');
    const filePathJsx = path.resolve(dir, p2 + '.jsx');

    if (fs.existsSync(filePathJs)) {
      return `${p1}${p2}.js${p3}`;
    } else if (fs.existsSync(filePathJsx)) {
      return `${p1}${p2}.jsx${p3}`;
    } else {
      return match; // leave it unchanged if file not found
    }
  });

  fs.writeFileSync(file, content, 'utf-8');
  console.log(`✅ Fixed: ${file}`);
}

const files = getAllFiles(SRC_DIR);
files.forEach(fixImports);
