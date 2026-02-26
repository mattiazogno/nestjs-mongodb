Ti faccio una **guida breve, pulita e funzionante** per fare debug di una app con NestJS in VS Code (Node 18/20 LTS, Nest 10+).

---

# ✅ Metodo consigliato (CLI ufficiale)

## 1️⃣ Avvia Nest in modalità debug

Nel progetto:

```bash
npm run start:debug
```

Se non esiste lo script, aggiungi nel `package.json`:

```json
"start:debug": "nest start --debug --watch"
```

Quando parte correttamente, nel terminale vedrai:

```
Debugger listening on ws://127.0.0.1:9229/...
```

👉 La porta del debugger è **9229** (non 3000).

---

## 2️⃣ Configura VS Code

Crea `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach NestJS",
      "port": 9229,
      "restart": true,
      "sourceMaps": true,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

---

## 3️⃣ Avvia il debugger

1. Esegui `npm run start:debug`
2. Vai su **Run & Debug**
3. Seleziona **Attach NestJS**
4. Premi ▶

Ora puoi mettere breakpoint nei controller/service oppure usare:

```ts
debugger;
```

---

# 🔎 Verifica importante

Nel `tsconfig.json` assicurati di avere:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSources": true
  }
}
```

Senza questo i breakpoint potrebbero non agganciarsi correttamente.

---

# ⚠️ Problemi comuni

| Problema                | Causa                                   |
| ----------------------- | --------------------------------------- |
| Breakpoint non colpisce | `sourceMap` disabilitato                |
| Non si connette         | Porta 9229 occupata                     |
| Si chiude subito        | Stai usando `launch` invece di `attach` |

---

# TL;DR

* Avvia con `nest start --debug`
* Attacca VS Code alla porta **9229**
* Abilita `sourceMap`

---
