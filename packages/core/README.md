<p align="center">
  <a href="https://veez.cl">
    <img src="https://firebasestorage.googleapis.com/v0/b/veezdelivery.firebasestorage.app/o/veez-icon-for-light-background-client.png?alt=media&token=bc6717fc-122c-49f0-a4b4-bbf17d99ced3" alt="VeezDelivery Logo" width="180" />
  </a>
</p>

<h1 align="center">@veez/core 🚚</h1>

<p align="center">
  <b>SDK Core en TypeScript/JavaScript para la API REST de VeezDelivery</b><br>
  <i>La plataforma de logística express, entregas en el mismo día y última milla en Chile 🇨🇱</i>
</p>

<p align="center">
  <a href="https://veez.cl">🌐 Sitio Web Oficial (veez.cl)</a> •
  <a href="https://docs.veez.cl">📚 Documentación de API (docs.veez.cl)</a>
</p>

---

## 🏢 Sobre VeezDelivery

**[VeezDelivery](https://veez.cl)** es la plataforma tecnológica de logística de última milla e intradiaria en Chile. Conecta e-commerce, comercios, pymes y restaurantes con nuestra flota de repartidores para realizar entregas ultra-rápidas con seguimiento GPS en vivo, confirmación de entrega (POD) y algoritmos inteligentes de cotización.

---

## ✨ Características Destacadas

- ⚡ **Cotización de Tarifas Instantánea**: Calcula precios exactos y tiempos estimados de llegada usando geocoordenadas (Latitud/Longitud).
- 📦 **Gestión de Pedidos Express**: Creación, consulta y cancelación de solicitudes de reparto.
- 📍 **Seguimiento GPS en Tiempo Real**: Rastreo en directo de la posición del repartidor y estado del paquete.
- 🔒 **Soporte de Idempotencia**: Previene la duplicación accidental de pedidos con `idempotency_key`.
- 🏬 **Integración e-Commerce**: Compatible con WooCommerce, Shopify, Odoo y desarrollos a medida.

---

## 📦 Instalación

```bash
npm install @veez/core
# o con yarn / pnpm / bun
yarn add @veez/core
```

---

## 🚀 Uso Rápido

```typescript
import { VeezClient } from '@veez/core';

// Inicializar el cliente con tu API Key de Veez
const veez = new VeezClient({
  apiKey: "TU_API_KEY_AQUI"
});

// 1. Cotizar un envío express en Santiago / Chile
const quote = await veez.getShippingQuote({
  origin: {
    address: "Av. Providencia 1234, Santiago, Chile",
    coords: { lat: -33.4262, lng: -70.6121 }
  },
  destination: {
    address: "Av. Apoquindo 4500, Las Condes, Chile",
    coords: { lat: -33.4115, lng: -70.5781 }
  },
  total_weight_kg: 2.5
});

console.log(`Tarifa: ${quote.price} ${quote.currency} - Tiempo estimado: ${quote.estimated_time_mins} mins`);

// 2. Crear un pedido de delivery
const order = await veez.createOrder({
  pickup: {
    address: "Av. Providencia 1234, Santiago",
    instructions: "Retirar en recepción"
  },
  dropoff: {
    address: "Av. Apoquindo 4500, Las Condes",
    instructions: "Entregar en depto 502"
  },
  customer_name: "Juan Pérez",
  customer_phone: "+56912345678",
  customer_rut: "12345678-9",
  reference_id: "ORD-9921",
  items: [
    { name: "Hamburguesa Doble", quantity: 2, price: 8900 }
  ],
  idempotency_key: "idemp_9921_abc"
});

console.log(`Pedido Creado - Booking ID: ${order.booking_id}`);
console.log(`URL de Seguimiento: ${order.tracking_url}`);

// 3. Consultar el estado y seguimiento en tiempo real
const tracking = await veez.getTrackingDetails(order.booking_id);
console.log(`Estado actual: ${tracking.status}`);
```

---

## 🔗 Recursos & Enlaces Útiles

- 🌐 **Sitio Web Oficial**: [https://veez.cl](https://veez.cl)
- 📚 **Portal de Documentación**: [https://docs.veez.cl](https://docs.veez.cl)
- ✉️ **Soporte & Consultas**: [soporte@veez.cl](mailto:soporte@veez.cl)

---

## 📄 Licencia

Propiedad exclusiva de **VeezDelivery**. Todos los derechos reservados.
