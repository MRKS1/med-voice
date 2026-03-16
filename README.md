# MedVoiceAI

Jednoducha `Node.js + Express + EJS` prezentacna stranka pre MedVoiceAI.

## Lokalny start

```bash
npm install
npm run dev
```

Potom otvor:

```text
http://localhost:3000
```

## Deploy na Render

Projekt je pripraveny na nasadenie na `Render`.

### 1. Nahraj projekt na GitHub

Ak este nemas Git repository:

```bash
git init
git add .
git commit -m "Initial MedVoiceAI site"
```

Potom vytvor repository na GitHub a prepoj ho:

```bash
git remote add origin https://github.com/TVOJ-UCET/TVOJ-REPO.git
git branch -M main
git push -u origin main
```

### 2. Nasadenie cez Render dashboard

1. Prihlas sa na `https://render.com`
2. Klikni na `New +`
3. Vyber `Web Service`
4. Prepoj svoj GitHub repository
5. Skontroluj tieto hodnoty:

```text
Environment: Node
Build Command: npm install
Start Command: npm start
```

6. Klikni `Create Web Service`

### 3. Alternativa cez render.yaml

V projekte uz mas subor `render.yaml`, takze Render vie nastavenia nacitat automaticky z repozitara.

### 4. Po deployi

Render ti vygeneruje verejnu adresu vo formate napr.:

```text
https://medvoiceai.onrender.com
```

## Dolezite poznamky

- Aplikacia uz pouziva `process.env.PORT || 3000`, takze je pripravena na hosting.
- Pre kontrolu bezi aj health endpoint:

```text
/health
```

Priklad:

```text
https://tvoja-adresa.onrender.com/health
```
