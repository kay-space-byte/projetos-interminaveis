# Portfólio — Gustavo Reis Ferreira

Portfólio pessoal feito em **HTML/CSS/JS** (estático), pensado para ser publicado no **GitHub Pages**.

## Páginas

- **Home**: `index.html`
- **Sobre**: `paginas/sobre/sobre.html`
- **Projetos**: `paginas/projetos/projetos.html`
- **Currículo**: `paginas/curriculo/curriculo.html`
- **Contato**: `paginas/contato/contato.html`

## Como publicar no GitHub Pages

1. No GitHub, vá em **Settings → Pages**
2. Em **Build and deployment**
   - **Source**: Deploy from a branch
   - **Branch**: `main` (ou a branch que você usa) e a pasta `/root`
3. Aguarde o deploy e abra a URL do Pages.

## Personalização rápida (meus dados)

- **Foto do currículo**
  - Substitua o arquivo `paginas/curriculo/sua-foto.jpg` pela sua foto (mantendo o mesmo nome).
- **Contato**
  - Edite `paginas/contato/contato.html` e troque os placeholders:
    - `SEU-LINKEDIN`
    - `SEU-USER` (Instagram)

## Performance

- O site evita mídia pesada no fundo: em vez de vídeo, usa **animações leves em `canvas`** (logo/planeta e “feixes” no fundo).
- Se o usuário tiver **redução de movimento** ativada, as animações ficam estáticas.
