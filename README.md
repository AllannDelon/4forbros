# 4forBros — Site Next.js

Site premium de catálogo automotivo com tema dark/glassmorphism.

## Como rodar

```bash
# 1. Entre na pasta do projeto
cd apex-velocity

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

## Build para produção

```bash
npm run build
npm start
```

## Estrutura

```
apex-velocity/
├── app/
│   ├── globals.css       # Estilos globais + classes utilitárias
│   ├── layout.tsx        # Root layout com fontes Rajdhani + Inter
│   └── page.tsx          # Página principal
├── components/
│   ├── Navbar.tsx        # Navbar fixa com scroll effect
│   ├── Hero.tsx          # Hero com busca e filtros
│   ├── FeaturedCars.tsx  # Grid de veículos em destaque
│   ├── About.tsx         # Seção sobre a empresa
│   ├── WhyChoose.tsx     # Diferenciais (3 cards)
│   ├── Testimonials.tsx  # Depoimentos de clientes
│   ├── SellCar.tsx       # Formulário venda com WhatsApp
│   └── Footer.tsx        # Rodapé completo
└── public/cars/          # Fotos do BMW M3 (18 imagens)
```

## Personalizações

- **WhatsApp:** Substitua `5511999999999` pelo número real em `Navbar.tsx`, `Hero.tsx`, `FeaturedCars.tsx`, `About.tsx` e `SellCar.tsx`
- **Preços e specs:** Edite o array `cars` em `FeaturedCars.tsx`
- **Cores:** Definidas em `tailwind.config.ts` e `globals.css`
