<p align="center">
  <a href="https://veez.cl">
    <img src="https://firebasestorage.googleapis.com/v0/b/veezdelivery.firebasestorage.app/o/veez-icon-for-light-background-client.png?alt=media&token=bc6717fc-122c-49f0-a4b4-bbf17d99ced3" alt="VeezDelivery Logo" width="180" />
  </a>
</p>

<h1 align="center">@veez/react ⚛️</h1>

<p align="center">
  <b>SDK React & React Native para VeezDelivery con Provider y Hooks listos para usar</b><br>
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
- 📍 **Seguimiento GPS en Tiempo Real**: Rastreo en directo de la posición del repartidor y estado del paquete mediante Hooks reactivos con polling automático.
- ⚛️ **Componentes & Context Provider**: `<VeezProvider>` para conectar la API Key en toda la jerarquía de React.
- 🏬 **Integración e-Commerce**: Compatible con Next.js, Vite, Create React App, React Native y Expo.

---

## 📦 Instalación

```bash
npm install @veez/react @veez/core
# o con yarn / pnpm / bun
yarn add @veez/react @veez/core
```

---

## 🚀 Uso Rápido

### 1. Configurar el Provider en la raíz de tu aplicación

```tsx
import React from 'react';
import { VeezProvider } from '@veez/react';

export default function App() {
  return (
    <VeezProvider apiKey="TU_PUBLIC_API_KEY">
      <MainApp />
    </VeezProvider>
  );
}
```

### 2. Hook de Seguimiento GPS en Tiempo Real (`useDeliveryTracking`)

```tsx
import React from 'react';
import { useDeliveryTracking } from '@veez/react';

function TrackingWidget({ bookingId }: { bookingId: string }) {
  // Polling automático configurable (ej. cada 10 segundos)
  const { data, loading, error } = useDeliveryTracking(bookingId, 10000);

  if (loading && !data) return <p>Cargando información del envío...</p>;
  if (error) return <p>Error al cargar el seguimiento: {error.message}</p>;

  return (
    <div className="tracking-card">
      <h3>Estado del Pedido: {data?.status}</h3>
      {data?.driver && (
        <div>
          <p>Repartidor: {data.driver.name}</p>
          <p>Teléfono: {data.driver.phone}</p>
        </div>
      )}
    </div>
  );
}
```

### 3. Hook de Cotización Instantánea (`useShippingQuote`)

```tsx
import React from 'react';
import { useShippingQuote } from '@veez/react';

function QuoteCalculator() {
  const { getQuote, data, loading } = useShippingQuote();

  const handleCalculate = async () => {
    await getQuote({
      origin: { address: "Av. Providencia 1234, Santiago, Chile" },
      destination: { address: "Av. Apoquindo 4500, Las Condes, Chile" },
      total_weight_kg: 2.5
    });
  };

  return (
    <div>
      <button onClick={handleCalculate} disabled={loading}>
        {loading ? 'Calculando...' : 'Cotizar Envío'}
      </button>

      {data && (
        <p>Precio Estimado: ${data.price} {data.currency} ({data.estimated_time_mins} mins)</p>
      )}
    </div>
  );
}
```

---

## ⚙️ Hooks Disponibles

- `useDeliveryTracking(bookingId, pollIntervalMs)`: Hook reactivo para obtener telemetría y ubicación del repartidor en vivo.
- `useShippingQuote()`: Hook para ejecutar cotizaciones de envíos express bajo demanda.
- `useVeezClient()`: Acceso directo al cliente instanciado de VeezDelivery.

---

## 🔗 Recursos & Enlaces Útiles

- 🌐 **Sitio Web Oficial**: [https://veez.cl](https://veez.cl)
- 📚 **Portal de Documentación**: [https://docs.veez.cl](https://docs.veez.cl)
- ✉️ **Soporte & Consultas**: [soporte@veez.cl](mailto:soporte@veez.cl)

---

## 📄 Licencia

Propiedad exclusiva de **VeezDelivery**. Todos los derechos reservados.
