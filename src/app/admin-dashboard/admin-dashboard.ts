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
  // Simulación de Usuario Logueado (Cambia esto para ver los efectos)
  usuarioRol: 'DIRECTOR' | 'OPERADOR' = 'OPERADOR'; 

  currentSection: string = 'dashboard'; // 'dashboard', 'ingresos', 'productos'

  // --- DATOS PARA DASHBOARD (DIRECTORES) ---
  kpis = [
    { titulo: 'Cirugías (Mes)', valor: '42', cambio: '+12%', color: 'blue' },
    { titulo: 'Items Críticos', valor: '5', cambio: 'Reponer ya', color: 'red' },
    { titulo: 'Stock Valorizado', valor: '---', cambio: '(Próximamente)', color: 'gray' }, // Placeholder Costos
  ];

  alertasVencimiento = [
    { producto: 'Viscoat 0.75ml', lote: 'VT719', dias: 15 },
    { producto: 'Vicryl 7-0', lote: 'B552', dias: 28 },
  ];

  // --- DATOS PARA INGRESOS (OPERADORES) ---
  // Esta lista simula lo que el usuario está cargando ahora mismo
  listaIngreso: any[] = [];
  nuevoItem: any = { codigo: '', cantidad: 1, esCaja: false };

  // Diccionario simulado para reconocer productos al escribir el código
  catalogo = [
    { ean: '7791234', nombre: 'Sutura Vicryl 7-0', unidadesPorCaja: 12 },
    { ean: '030065', nombre: 'Viscoelástico Viscoat', unidadesPorCaja: 1 },
  ];

  cambiarSeccion(seccion: string) {
    this.currentSection = seccion;
  }

  // Lógica: Al apretar ENTER en el código de barras
  escanearProducto() {
    const prod = this.catalogo.find(p => p.ean === this.nuevoItem.codigo);
    
    if (prod) {
      // Si existe, lo agregamos a la tabla de pre-ingreso
      this.listaIngreso.push({
        nombre: prod.nombre,
        lote: '', // A completar manual
        vencimiento: '', // A completar manual
        cantidad: this.nuevoItem.cantidad,
        esCaja: false, // Checkbox para multiplicar
        factor: prod.unidadesPorCaja,
        editando: true // Para que aparezca input abierto
      });
      this.nuevoItem.codigo = ''; // Limpiar para el siguiente
    } else {
      alert('Producto nuevo. Se abriría modal de Alta de Producto.');
    }
  }

  guardarIngreso() {
    // Aquí iría la llamada al Backend Java
    alert('Stock actualizado correctamente.');
    this.listaIngreso = [];
  }

  calcularTotalUnidades(item: any): number {
    return item.esCaja ? (item.cantidad * item.factor) : item.cantidad;
  }
}