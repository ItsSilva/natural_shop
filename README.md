# Natural Shop Colombia 🏋️

Tienda de suplementos deportivos - Proyecto React para pruebas de usuario.

## Estructura del proyecto

```
natural-shop/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegación con logo, links, buscador
│   │   ├── Footer.jsx          # Pie de página con columnas informativas
│   │   ├── ProductCard.jsx     # Tarjeta de producto reutilizable
│   │   ├── CategoryCard.jsx    # Tarjeta de categoría
│   │   ├── BrandCard.jsx       # Tarjeta de marca
│   │   └── SectionHeader.jsx   # Encabezado de sección (título + "Ver más")
│   ├── context/
│   │   └── CartContext.jsx     # Estado global del carrito
│   ├── data/
│   │   └── products.js         # Datos quemados: productos, categorías, marcas, tiendas
│   ├── pages/
│   │   ├── HomePage.jsx        # Página principal con hero, secciones
│   │   ├── CatalogPage.jsx     # Catálogo con filtros laterales
│   │   ├── ProductDetailPage.jsx # Detalle de producto
│   │   ├── CartPage.jsx        # Carrito de compras
│   │   ├── CheckoutPage.jsx    # Pantalla de pago (placeholder — se conectará a Supabase)
│   │   └── QuienesSomosPage.jsx # Página informativa
│   ├── App.jsx                 # Router principal
│   ├── index.js               # Entry point
│   └── index.css              # Estilos globales
└── package.json
```

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm start

# Build para producción
npm run build
```

## Tokens de diseño

| Token | Valor |
|---|---|
| Background principal | `#FAFAFA` |
| Navbar / dark | `#1F1F21` |
| Amarillo primario | `#FDC700` / `#FFEB3B` |
| Texto principal | `#0A0A0A` |
| Texto secundario | `#6A7282` |
| Texto muted | `#99A1AF` |
| Border radius cards | `10px` |
| Font | `Inter` |

## Páginas disponibles

- `/` — Home
- `/catalogo` — Catálogo con filtros (categoría, marca, precio)
- `/producto/:id` — Detalle del producto
- `/carrito` — Carrito de compras
- `/checkout` — Proceso de compra (placeholder)
- `/quienes-somos` — Quiénes somos

## Próximos pasos

- [ ] Integración con Supabase para gestión de productos
- [ ] Sistema de compras funcional con persistencia
- [ ] Pantallas de confirmación de pedido
- [ ] Panel de administración de productos
