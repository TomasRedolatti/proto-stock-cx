import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
})
export class AdminComponent {
  usuarioRol: 'DIRECTOR' | 'OPERADOR' = 'OPERADOR'; 
  currentSection: string = 'dashboard'; 

  // --- CONFIGURACIÓN DE MOVIMIENTOS ---
  // 'ingreso' = Sumar Stock | 'salida' = Restar Stock (Consumo Manual)
  tipoMovimiento: 'ingreso' | 'salida' = 'ingreso'; 
  destinoSalida: string = 'Farmacia Central'; // Para indicar a dónde se fue el insumo

  // --- DATOS MOCKUP ---
  kpis = [
    { titulo: 'Cirugías (Mes)', valor: '42', cambio: '+12%', color: 'blue' },
    { titulo: 'Items Críticos', valor: '5', cambio: 'Reponer ya', color: 'red' },
    { titulo: 'Valor Stock', valor: '$ 4.2M', cambio: 'Estable', color: 'gray' },
  ];

  alertasVencimiento = [
    { producto: 'Viscoat 0.75ml', lote: 'VT719', dias: 15 },
    { producto: 'Vicryl 7-0', lote: 'B552', dias: 28 },
  ];

  // --- BITÁCORA DE AUDITORÍA (NUEVO) ---
  auditoriaLogs = [
    { fecha: '10/12 14:30', usuario: 'Farmacia', accion: 'INGRESO', detalle: '10 Cajas Viscoat (Lote VT719)', impacto: '+10' },
    { fecha: '10/12 15:45', usuario: 'Dr. López', accion: 'CONSUMO_QX', detalle: 'Lente Alcon 22.0D en Q1', impacto: '-1' },
    { fecha: '10/12 16:10', usuario: 'Instrumentación', accion: 'AJUSTE_MANUAL', detalle: 'Reposición Guantes M en Q2', impacto: '-100' },
    { fecha: '10/12 09:00', usuario: 'Admin', accion: 'ALTA_PRODUCTO', detalle: 'Nuevo: IOL Master Kit', impacto: 'INFO' },
  ];

  listaMovimiento: any[] = [];
  nuevoItem: any = { codigo: '', cantidad: 1 };

  catalogo = [
    { ean: '7791234', nombre: 'Sutura Vicryl 7-0', unidadesPorCaja: 12 },
    { ean: '030065', nombre: 'Viscoelástico Viscoat', unidadesPorCaja: 1 },
    { ean: '112233', nombre: 'Guantes Latex M (Caja x100)', unidadesPorCaja: 100 },
  ];

  cambiarSeccion(seccion: string) {
    this.currentSection = seccion;
  }

  toggleTipoMovimiento() {
    this.tipoMovimiento = this.tipoMovimiento === 'ingreso' ? 'salida' : 'ingreso';
    this.listaMovimiento = []; // Limpiar lista al cambiar de modo para evitar confusiones
  }

  escanearProducto() {
    const prod = this.catalogo.find(p => p.ean === this.nuevoItem.codigo);
    
    if (prod) {
      this.listaMovimiento.push({
        nombre: prod.nombre,
        cantidad: this.nuevoItem.cantidad,
        esCaja: false, 
        factor: prod.unidadesPorCaja,
        lote: '', 
        vencimiento: '' 
      });
      this.nuevoItem.codigo = ''; 
    } else {
      alert('Producto no encontrado en catálogo.');
    }
  }

  guardarMovimiento() {
    // Simulación de guardar
    const accion = this.tipoMovimiento === 'ingreso' ? 'INGRESO' : 'AJUSTE_MANUAL';
    const impacto = this.tipoMovimiento === 'ingreso' ? '+' : '-';
    
    // Agregamos a la auditoría visualmente para la demo
    this.listaMovimiento.forEach(item => {
      const total = item.esCaja ? item.cantidad * item.factor : item.cantidad;
      this.auditoriaLogs.unshift({
        fecha: 'Ahora',
        usuario: this.usuarioRol,
        accion: accion,
        detalle: `${item.nombre} (${this.destinoSalida})`,
        impacto: `${impacto}${total}`
      });
    });

    alert(`Movimiento de ${this.tipoMovimiento.toUpperCase()} registrado con éxito.`);
    this.listaMovimiento = [];
  }

  calcularTotalUnidades(item: any): number {
    return item.esCaja ? (item.cantidad * item.factor) : item.cantidad;
  }
}