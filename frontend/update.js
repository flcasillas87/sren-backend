// migrate-angular20-advanced.js
import fs from "fs";
import path from "path";

const rootDir = path.join(".", "src", "app");

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".spec.ts")) {
      processFile(fullPath);
    }
  });
}

function sortImports(content) {
  const importRegex = /^import\s.+from\s.+;$/gm;
  const imports = content.match(importRegex);
  if (!imports) return content;

  const sortedImports = imports.sort((a, b) => a.localeCompare(b));
  return content.replace(importRegex, "").trimStart() + "\n" + sortedImports.join("\n") + "\n";
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  if (!content.includes("@Injectable") && !content.includes("@Component")) return;

  // --- Eliminar ComputedSignal y Signal de imports ---
  if (content.match(/\bComputedSignal\b|\bSignal\b/)) {
    content = content.replace(/\b(ComputedSignal|Signal)\b/g, "");
    modified = true;
  }

  // --- Ajustar imports de Angular ---
  const angularMatch = content.match(/import\s*{([^}]*)}\s*from\s*['"]@angular\/core['"]/);
  if (angularMatch) {
    let imports = angularMatch[1].split(",").map(i => i.trim()).filter(i => i.length > 0);
    imports = imports.filter(i => i !== "ComputedSignal" && i !== "Signal");
    imports.sort((a, b) => a.localeCompare(b));
    content = content.replace(angularMatch[0], `import { ${imports.join(", ")} } from '@angular/core'`);
    modified = true;
  }

  // --- Detectar DestroyRef + effect en servicios singleton ---
  if (content.includes("DestroyRef") && content.includes("effect")) {
    if (!content.includes("// TODO: revisar DestroyRef + effect en servicio singleton")) {
      content = content.replace(/(export\s+class\s+[A-Za-z0-9_]+\s*{)/, "$1\n  // TODO: revisar DestroyRef + effect en servicio singleton");
      modified = true;
    }
  }

  // --- Ordenar todos los imports alfabéticamente ---
  const sortedContent = sortImports(content);
  if (sortedContent !== content) {
    content = sortedContent;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Actualizado: ${filePath}`);
  }
}

console.log("🔧 Migración Angular 20 avanzada iniciada...");
walkDir(rootDir);
console.log("✅ Migración completada.");
