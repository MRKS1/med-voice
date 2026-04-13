# MedVoiceAI

Jednoducha `React + Vite` prezentacna stranka pre MedVoiceAI.

## Lokalny start

```bash
npm install
npm run dev
```

Potom otvor:

```text
http://localhost:3000
```

## Formspree email odosielanie

1. Vytvor formular vo `https://formspree.io`
2. Ziskaj svoj endpoint vo formate:

```text
https://formspree.io/f/xxxxx
```

3. Vytvor lokalny subor `.env` alebo skopiruj `.env.example` na `.env` a vloz:

```bash
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxx
```

Pre Render nastav rovnaku premennu v dashboarde:

```text
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxx
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
Build Command: npm install && npm run build
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

- Po zmene `.env` alebo Render environment variables treba spravit novy deploy.
- `serve -s dist` zabezpeci aj SPA fallback pre priame URL adresy.
