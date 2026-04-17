const fs = require('fs');
const path = require('path');

function processComponent(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, '.ts'); // e.g. login.component
    
    let htmlContent = '';
    let cssContent = '';
    let modifiedTs = content;

    // Regex to match template: `...`
    // We use [\s\S]*? to match across newlines inside backticks.
    const templateRegex = /template\s*:\s*`([\s\S]*?)`\s*(,|(?=\n\s*(?:styles|styleUrl|providers|})))/g;
    const templateMatch = templateRegex.exec(content);
    
    if (templateMatch) {
        htmlContent = templateMatch[1].trim();
        // Replace with templateUrl
        modifiedTs = modifiedTs.replace(templateMatch[0], `templateUrl: './${baseName}.html'` + (templateMatch[2] === ',' ? ',' : ''));
    }

    // Regex to match styles: [`...`]
    const stylesRegex = /styles\s*:\s*\[\s*`([\s\S]*?)`\s*\]\s*(,|(?=\n\s*(?:providers|})))/g;
    const stylesMatch = stylesRegex.exec(content);

    if (stylesMatch) {
        cssContent = stylesMatch[1].trim();
        // Replace with styleUrls
        modifiedTs = modifiedTs.replace(stylesMatch[0], `styleUrl: './${baseName}.css'` + (stylesMatch[2] === ',' ? ',' : ''));
    }

    if (templateMatch || stylesMatch) {
        if (templateMatch) fs.writeFileSync(path.join(dir, `${baseName}.html`), htmlContent);
        if (stylesMatch) fs.writeFileSync(path.join(dir, `${baseName}.css`), cssContent);
        
        fs.writeFileSync(filePath, modifiedTs);
        console.log(`Processed ${baseName}`);
    } else {
        console.log(`No inline template/styles found in ${baseName}`);
    }

    // Generate spec file if it doesn't exist
    const specPath = path.join(dir, `${baseName}.spec.ts`);
    if (!fs.existsSync(specPath)) {
        // We will just create an empty spec or standard boilerplate
        const componentClassNameMatch = /export\s+class\s+([A-Za-z0-9_]+)/.exec(content);
        if (componentClassNameMatch) {
            const className = componentClassNameMatch[1];
            const specContent = `import { ComponentFixture, TestBed } from '@angular/core/testing';\n\nimport { ${className} } from './${baseName}';\n\ndescribe('${className}', () => {\n  let component: ${className};\n  let fixture: ComponentFixture<${className}>;\n\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      imports: [${className}]\n    })\n    .compileComponents();\n    \n    fixture = TestBed.createComponent(${className});\n    component = fixture.componentInstance;\n    fixture.detectChanges();\n  });\n\n  it('should create', () => {\n    expect(component).toBeTruthy();\n  });\n});\n`;
            fs.writeFileSync(specPath, specContent);
        }
    }
}

const files = [
    "src/app/core/layout/shell/shell.component.ts",
    "src/app/features/admin/admin-page/admin-page.component.ts",
    "src/app/features/auth/login/login.component.ts",
    "src/app/features/distribution/dc-dashboard-page/dc-dashboard-page.component.ts",
    "src/app/features/home/home.component.ts",
    "src/app/features/procurement/procurement-page/procurement-page.component.ts",
    "src/app/features/supplier/supplier-page/supplier-page.component.ts",
    "src/app/shared/components/modal/modal.component.ts",
    "src/app/shared/components/sidebar/sidebar.component.ts",
    "src/app/shared/components/stat-card/stat-card.component.ts",
    "src/app/shared/components/top-nav/top-nav.component.ts"
];

for (const file of files) {
    if (fs.existsSync(file)) {
        processComponent(file);
    }
}
