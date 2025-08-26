const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

// Step 1: Rename .js files with JSX to .jsx
function containsJSX(content) {
  return /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>/.test(content);
}

function renameJsToJsx(files) {
  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const content = fs.readFileSync(file, 'utf-8');
      if (containsJSX(content)) {
        const newPath = file.replace(/\.js$/, '.jsx');
        if (!fs.existsSync(newPath)) {
          fs.renameSync(file, newPath);
          console.log(`🔁 Renamed: ${file} → ${newPath}`);
        }
      }
    }
  });
}

// Step 2: Fix import paths to .jsx and correct casing
function resolveActualFile(dir, importPath) {
  const basePath = path.resolve(dir, importPath);

  const candidates = [
    `${basePath}.jsx`,
    path.join(basePath, 'index.jsx'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const realPath = fs.realpathSync(candidate);
      return './' + path.relative(dir, realPath).replace(/\\/g, '/');
    }
  }

  return null;
}

function fixImports(file) {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  const importRegex = /(import\s+[^'"]+['"])(\.\/[^'"]+)(['"])/g;

  content = content.replace(importRegex, (match, p1, p2, p3) => {
    const dir = path.dirname(file);
    const resolved = resolveActualFile(dir, p2);
    if (resolved) {
      changed = true;
      return `${p1}${resolved}${p3}`;
    }
    return match; // leave unchanged if can't resolve
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`✅ Fixed imports in: ${file}`);
  }
}

// Main execution
const allFiles = getAllFiles(SRC_DIR);
renameJsToJsx(allFiles);

const updatedFiles = getAllFiles(SRC_DIR); // get updated .jsx files
updatedFiles.forEach(fixImports);
