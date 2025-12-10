import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Tipos de datos simulados
interface Insumo {
  id: number;
  nombre: string;
  detalle: string; // Lote o info extra
  tipo: 'trazable' | 'generico';
  hora: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html', // Usaremos el archivo separado para limpieza
})
export class AppComponent {
  // --- ESTADO DE LA APP ---
  step: number = 1; // 1: Config, 2: CheckIn, 3: Cirugía, 4: Resumen
  quirofanoId: string = '';
  
  // --- DATOS DE LA CIRUGÍA ---
  pacienteSeleccionado: any = null;
  cirujanoSeleccionado: string = '';
  ojoSeleccionado: string = '';
  insumosConsumidos: Insumo[] = [];
  
  // --- SIMULACIÓN DE DB ---
  pacientesDB = [
    { nombre: 'Redolatti, Tomás', hc: '79933', os: 'OSDE 310' },
    { nombre: 'Tunesi, María Emilia', hc: '14753', os: 'IOMA' },
    { nombre: 'Roig, Christian', hc: '9460', os: 'PARTICULAR' },
  ];
  
  busquedaPaciente: string = '';
  pacientesFiltrados: any[] = [];
  
  // --- VISUAL EFFECTS ---
  ultimoEscaneo: Insumo | null = null;
  flashExito: boolean = false;
  flashError: boolean = false;

  // VARIABLES PARA EL MODAL
  modalVisible: boolean = false;
  itemParaBorrar: number | null = null;

  // 1. Cuando tocan el tacho de basura, SOLO mostramos el modal
  eliminarInsumo(id: number) {
    this.itemParaBorrar = id;
    this.modalVisible = true;
  }

  // 2. Si el usuario confirma en el modal
  confirmarDevolucion() {
    if (this.itemParaBorrar) {
      this.insumosConsumidos = this.insumosConsumidos.filter(i => i.id !== this.itemParaBorrar);
      // Feedback visual opcional (toastr)
      // this.triggerFlash('error'); 
    }
    this.cerrarModal();
  }

  // 3. Si cancela
  cerrarModal() {
    this.modalVisible = false;
    this.itemParaBorrar = null;
  }

  // ------------------------------------------------
  // MÉTODOS DE FLUJO
  // ------------------------------------------------

  setConfig(q: string) {
    this.quirofanoId = q;
    this.step = 2; // Pasar a CheckIn
  }

  buscarPaciente() {
    if (this.busquedaPaciente.length > 1) {
      this.pacientesFiltrados = this.pacientesDB.filter(p => 
        p.nombre.toLowerCase().includes(this.busquedaPaciente.toLowerCase()) || p.hc.includes(this.busquedaPaciente)
      );
    } else {
      this.pacientesFiltrados = [];
    }
  }

  seleccionarPaciente(p: any) {
    this.pacienteSeleccionado = p;
    this.pacientesFiltrados = [];
    this.busquedaPaciente = '';
  }

  iniciarCirugia() {
    if (this.pacienteSeleccionado && this.cirujanoSeleccionado) {
      this.step = 3; // Pasar a la acción
    }
  }

  // --- EL CEREBRO DE LA DEMO: SIMULADOR DE ESCANEO ---
  simularEscaneo(tipo: 'viscoat' | 'lente' | 'gasa') {
    let nuevoInsumo: Insumo;
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (tipo === 'viscoat') {
      nuevoInsumo = { 
        id: Date.now(), 
        nombre: 'Viscoelástico VISCOAT 0.75ml', 
        detalle: 'Lote: VT719 (Vence: 03/26) - DataMatrix Validado', 
        tipo: 'trazable', 
        hora 
      };
    } else if (tipo === 'lente') {
      nuevoInsumo = { 
        id: Date.now(), 
        nombre: 'Lente Intraocular ALCON SN60WF', 
        detalle: 'Dioptría: 22.0D - Lote: 559021', 
        tipo: 'trazable', 
        hora 
      };
    } else {
      nuevoInsumo = { 
        id: Date.now(), 
        nombre: 'Gasa Estéril 10x10', 
        detalle: 'Descuento FIFO (Lote Automático)', 
        tipo: 'generico', 
        hora 
      };
    }

    // Efecto visual
    this.insumosConsumidos.unshift(nuevoInsumo);
    this.ultimoEscaneo = nuevoInsumo;
    this.triggerFlash('exito');
  }

  triggerFlash(tipo: 'exito' | 'error') {
    if (tipo === 'exito') {
      this.flashExito = true;
      setTimeout(() => this.flashExito = false, 800);
    } else {
      this.flashError = true;
      setTimeout(() => this.flashError = false, 800);
    }
  }

  finalizarCirugia() {
    this.step = 4; // Resumen final
  }

  reiniciar() {
    // Resetear todo para la siguiente demo
    this.step = 2;
    this.pacienteSeleccionado = null;
    this.cirujanoSeleccionado = '';
    this.ojoSeleccionado = '';
    this.insumosConsumidos = [];
    this.ultimoEscaneo = null;
  }
}
//export class App {
//  protected readonly title = signal('proto-stock-cx');
//}
