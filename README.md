# 🏥 COT Gestión - Módulo Quirófano

Live Demo: [AppWeb](https://stock-quirofano.netlify.app/)
## 📋 Sobre el Proyecto
COT Gestión es una solución integral para la administración de clínicas oftalmológicas. Este repositorio contiene el prototipo funcional del Módulo de Quirófano, diseñado específicamente para resolver la falta de trazabilidad y control de stock en entornos quirúrgicos de alta rotación.

El objetivo de este MVP es validar el flujo de UX/UI para ser utilizado en Tablets montadas en pared dentro del área estéril, priorizando la velocidad, la legibilidad y la minimización de errores humanos.

## 💡 El Problema

En un quirófano, el personal médico opera bajo estrés y con tiempos limitados. Los sistemas administrativos tradicionales (ERP de escritorio) fallan porque:

    
* Requieren teclado y mouse (inviable con guantes).

* Tienen interfaces densas y letras pequeñas.

## ✅ La Solución Propuesta

Una Web App Progresiva (SPA) optimizada para tablets que actúa como "punto de venta" del insumo médico.

*  Zero-Click Interface: El sistema está siempre "escuchando" al lector de códigos de barras.

* Feedback Visual: Alertas de color (Verde/Rojo) a pantalla completa para confirmar acciones sin necesidad de leer textos pequeños.

* Lógica Híbrida: Soporta tanto trazabilidad avanzada (DataMatrix GS1) para elementos específicos, como consumo masivo (FIFO) para descartables genéricos.

## 🚀 Stack Tecnológico

Este prototipo fue construido utilizando Angular 18+:

* Framework: Angular (Standalone Components).

* State Management: Angular Signals (signal, computed, effect) para reactividad granular y sin Zone.js overhead.

* Styling: Tailwind CSS para un diseño utility-first, limpio y mantenible.

## ✨ Características Clave del Prototipo
1. Simulación de Escaneo Inteligente

Como no se dispone de lectores físicos en una demo web, el prototipo incluye una "Botonera de Demo" que simula la entrada de datos de una pistola lectora Zebra 2D.

* Simulación DataMatrix: Inyecta un objeto complejo (Producto + Lote + Vencimiento).

* Simulación EAN-13: Inyecta un producto genérico y simula la lógica de descuento FIFO.

2. Integración Legacy (Simulada)

Demostración de cómo el sistema convive con bases de datos antiguas (Legacy).

   * Buscador Predictivo: Permite buscar pacientes por Apellido o Historia Clínica (HC) simulando una API REST contra un sistema PHP antiguo.

3. UX "Quirófano-First"

* Botones de alto contraste y gran tamaño (Touch targets > 48px).

* Modo "Listening" automático (Foco en inputs invisibles).

* Prevención de errores mediante confirmaciones modales personalizadas.
