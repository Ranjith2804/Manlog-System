# ManLog — Manufacturing Logistics Platform

A collaborative Angular 17+ app developed as a team. Each module lives in its own feature branch.

---

## Quick Start

```bash
npm install
ng serve 
```

Open → Localhost

Soon gonna Deploy and I'll Update

# Login with:

`admin@manlog.com` / `123`

`Procurement@manlog.com` / `123`

`DC@manlog.com` / `123`

`Supplier@manlog.com` / `123`

---

## Folder Structure

```
src/app/
├── core/layout/shell/          ← sidebar + topbar wrapper
├── features/
│   ├── auth/login/             ← login page  (TL)
│   ├── home/                   ← dashboard   (TL)
│   ├── admin/                  ← 🔒 admin team
│   ├── procurement/            ← 🔒 Procurement team
│   ├── supplier/               ← 🔒 Supplier team
│   └── distribution/           ← 🔒 Distribution team
├── shared/components/sidebar/  ← shared nav sidebar
├── app.routes.ts               ← all routes
└── app.ts                      ← router-outlet entry
```

---

## Team Workflow — Git Branching

### Your feature branch

```bash
# 1. Pull latest main
git checkout main
git pull origin main

# 2. Create your feature branch
git checkout -b feature/procurement-module   # or supplier / distribution

# 3. Work ONLY inside features/<your-module>/
# 4. Commit your changes
git add .
git commit -m "feat: add procurement order list page"

# 5. Push
git push -u origin feature/procurement-module

# 6. Open a Pull Request → main on GitHub
```

### Rules
- ✅ Work only inside `features/<your-module>/`
- ✅ Raise PR to `main` when done — don't push directly to `main`
- ✅ Use `app-shell` for your page layout
- ❌ Don't touch `app.routes.ts`, `app.ts`, `shell.component.ts`, or `sidebar.component.ts` without checking with the TL

---

## Angular Concept Map 
| Concept | File |
|---|---|
| `@Component`, selector, standalone | Every component |
| RouterOutlet | `app.ts` |
| Routes, redirectTo, wildcard | `app.routes.ts` |
| `[(ngModel)]` two-way binding | `login.component.ts` |
| `(ngSubmit)` event binding | `login.component.ts` |
| `*ngIf` | `login.component.ts` |
| `*ngFor` | `sidebar.component.ts`, `home.component.ts` |
| `@Input` | `sidebar.component.ts`, `shell.component.ts` |
| `routerLink`, `routerLinkActive` | `sidebar.component.ts` |
| `ng-content` (content projection) | `shell.component.ts` |
| `Router.navigate` | `login.component.ts` |
