
# Serious Broker Frontend

Frontend pro bakalářskou práci (React, Vite, TypeScript)



## Instalace

Stáhnout (klonovat) repozitář

```bash
  git clone https://github.com/janprikryl1/bakalarka_frontend.git
```

Instalace knihoven

```bash
  npm install
```
    
## Spuštění

Spuštění lokálního serveru (poběží localhost:5173)

```bash
  npm run start
```
To ale většina IDEček (napřklad Webstorm) umí přes nějaké tlačítko

Pokud budeš chtít vyvíjet s loálně spuštěným backendem, tak v souboru `src/env.ts` změň `backendUrl` z  `"https://api.serious.broker/"` na `"https://localhost/bakalarska_prace_backend"`

Sestavení pro produkci

```bash
  npm run build
```
Po sestavení je možné obsah adresáře `dist` nahrát na hosting do adresáře `www`
