const fs = require("fs");
const path = require("path");

const rootDir = path.join(".", "src", "app");

// Ordenar imports dentro del decorador
function sortImportsArray(content) {
  return content.replace(
    /(imports\s*:\s*\[)([\s\S]*?)(\])/m,
    (_, start, middle, end) => {
      const items = middle
        .split(",")
        .map(i => i.trim())
        .filter(i => i.length > 0);
      items.sort((a, b) => a.localeCompare(b));
      return `${start}\n    ${items.join(",\n    ")}\n  ${end}`;
    }
  );
}

// Extraer servicios inyectados con inject()
function extractInjectedServices(content) {
  const services = [];
  const serviceRegex = /private\s+([a-zA-Z0-9_]+)\s*=\s*inject\(([^)]+)\)/g;
  let match;
  while ((match = serviceRegex.exec(content)) !== null) {
    services.push(match[1]);
  }
  return services;
}

// Agregar readonly a signals y computed
function addReadonlyToSignals(content) {
  return content.replace(
    /(private|public|protected)?\s*(\w+)\s*=\s*(signal|computed)<([^>]+)>/g,
    (_, modifier, name, type, generic) => {
      const mod = modifier ? modifier : "private";
      return `${mod} readonly ${name} = ${type}<${generic}>`;
    }
  );
}

// Procesar archivo .ts
function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("@Component({") || !content.includes("standalone: true")) return;

  // ---- IMPORTS @angular/core ----
  const angularImportMatch = content.match(/import\s*{([^}]*)}\s*from\s*['"]@angular\/core['"]/);
  const needed = ["ChangeDetectionStrategy", "Component", "DestroyRef", "effect", "inject", "signal", "computed"];
  if (angularImportMatch) {
    let imports = angularImportMatch[1].split(",").map(i => i.trim());
    needed.forEach(i => { if (!imports.includes(i)) imports.push(i); });
    imports.sort((a, b) => a.localeCompare(b));
    content = content.replace(
      angularImportMatch[0],
      `import { ${imports.join(", ")} } from '@angular/core'`
    );
  } else {
    content = `import { ${needed.join(", ")} } from '@angular/core';\n` + content;
  }

  // ---- COMPONENT DECORATOR: agregar OnPush ----
  if (!content.includes("changeDetection: ChangeDetectionStrategy.OnPush")) {
    content = content.replace(
      /@Component\s*\(\s*{/,
      "@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,"
    );
  }

  // ---- ELIMINAR lifecycle hooks antiguos ----
  content = content.replace(/implements\s+OnInit\s*[, ]*OnDestroy?|OnInit\s*[, ]*OnDestroy|implements\s+OnDestroy|implements\s+OnInit/g, "");
  content = content.replace(/ngOnInit\s*\(\)\s*{[\s\S]*?}/g, "");
  content = content.replace(/ngOnDestroy\s*\(\)\s*{[\s\S]*?}/g, "");

  // ---- AGREGAR DestroyRef si no existe ----
  if (!content.includes("private destroyRef = inject(DestroyRef)")) {
    content = content.replace(
      /export\s+class\s+[A-Za-z0-9_]+\s*{/,
      match => match + `\n  private destroyRef = inject(DestroyRef);`
    );
  }

  // ---- DETECTAR SERVICIOS INYECTADOS ----
  const services = extractInjectedServices(content);

  // ---- DETECTAR CONSTRUCTOR EXISTENTE ----
  const hasConstructor = /constructor\s*\(/.test(content);

  // ---- AGREGAR EFECTO AUTOMÁTICO ----
  if (services.length > 0) {
    const effectCode = `\n    effect(() => {\n      ${services.map(s => `${s};`).join("\n      ")}\n    }, { inject: this.destroyRef });\n`;

    if (hasConstructor) {
      content = content.replace(/constructor\s*\([^\)]*\)\s*{/, match => match + effectCode);
    } else {
      content = content.replace(/export\s+class\s+[A-Za-z0-9_]+\s*{/, match => match + `\n  constructor() {${effectCode}  }\n`);
    }
  }

  // ---- AGREGAR readonly a signals y computed ----
  content = addReadonlyToSignals(content);

  // ---- ORDENAR imports: [] ----
  content = sortImportsArray(content);

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Actualizado: ${filePath}`);
}

// Recorrer directorios
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

// Ejecutar
walkDir(rootDir);
console.log("🚀 Todos los componentes standalone actualizados a Angular 20 con Signals, computed, readonly y efectos automáticos.");
