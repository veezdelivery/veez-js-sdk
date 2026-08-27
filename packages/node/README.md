<p align="center">
  <a href="https://veez.cl">
    <img src="https://firebasestorage.googleapis.com/v0/b/veezdelivery.firebasestorage.app/o/veez-icon-for-light-background-client.png?alt=media&token=bc6717fc-122c-49f0-a4b4-bbf17d99ced3" alt="VeezDelivery Logo" width="180" />
  </a>
</p>

<h1 align="center">@veez/node 🟢</h1>

<p align="center">
  <b>SDK optimizado para servidores Node.js (Express, Next.js, NestJS) de VeezDelivery</b><br>
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
- 🔑 **Auto-detección de Credenciales**: Detecta automáticamente las variables de entorno `VEEZ_API_KEY` o `VEEZ_SECRET_KEY` de tu servidor.
- 🏬 **Integración e-Commerce**: Compatible con WooCommerce, Shopify, Odoo y desarrollos a medida.

---

## 📦 Instalación

```bash
npm install @veez/node @veez/core
# o con yarn / pnpm / bun
yarn add @veez/node @veez/core
```

---

## 🚀 Uso Rápido en Node.js / Next.js / Express

```typescript
import { VeezNodeClient } from '@veez/node';

// Inicialización automática desde process.env.VEEZ_API_KEY o VEEZ_SECRET_KEY:
const veez = new VeezNodeClient();

// O pasando la API Key explícitamente:
// const veez = new VeezNodeClient("pk_live_xxxx");

// 1. Cotizar un envío express desde el servidor
export async function POST(req: Request) {
  const body = await req.json();

  const quote = await veez.getShippingQuote({
    origin: { address: "Av. Providencia 1234, Santiago, Chile" },
    destination: { address: "Av. Apoquindo 4500, Las Condes, Chile" },
    total_weight_kg: 2.5
  });

  return Response.json(quote);
}

// 2. Crear pedido de delivery
export async function createOrderHandler(req: Request) {
  const order = await veez.createOrder({
    pickup: { address: "Av. Providencia 1234, Santiago" },
    dropoff: { address: "Av. Apoquindo 4500, Las Condes" },
    customer_name: "Juan Pérez",
    customer_phone: "+56912345678",
    customer_rut: "12345678-9"
  });

  return Response.json(order);
}
```

---

## ⚙️ Métodos Disponibles

- `getShippingQuote(params: QuoteRequest)`: Cotización de envíos y tarifas express.
- `createOrder(params: CreateOrderRequest)`: Registro e ingreso de órdenes de reparto.
- `getOrder(id: string)`: Obtención de detalles e historial de un pedido.
- `cancelOrder(id: string, reason?: string)`: Cancelación previa a retiro.
- `getTrackingDetails(reference: string)`: Telemetría y posición en vivo del repartidor.

---

## 🔗 Recursos & Enlaces Útiles

- 🌐 **Sitio Web Oficial**: [https://veez.cl](https://veez.cl)
- 📚 **Portal de Documentación**: [https://docs.veez.cl](https://docs.veez.cl)
- ✉️ **Soporte & Consultas**: [soporte@veez.cl](mailto:soporte@veez.cl)

---

## 📄 Licencia

Propiedad exclusiva de **VeezDelivery**. Todos los derechos reservados.
