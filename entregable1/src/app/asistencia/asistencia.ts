import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asistencia.html',
  styleUrls: ['./asistencia.css'],
})
export class Asistencia {

  @Input() grupos: any[] = [];

  @Output() seleccionarGrupo = new EventEmitter<any>();

  private _grupoSeleccionado: any;

  @Input()
  set grupoSeleccionado(val: any) {
    this._grupoSeleccionado = val;
    this.cargarAlumnos();
  }

  get grupoSeleccionado() {
    return this._grupoSeleccionado;
  }

  alumnos: any[] = [];
  nuevoAlumno: string = '';

  constructor(private api: Api) {}

  // 🔥 TRAER ALUMNOS DESDE BD
  cargarAlumnos() {
    if (!this.grupoSeleccionado) return;

    this.api.getAlumnos().subscribe((data: any) => {
      this.alumnos = data;
    });
  }

  // ➕ AGREGAR ALUMNO
  agregarAlumno() {
    if (!this.nuevoAlumno.trim() || !this.grupoSeleccionado) return;

    const ahora = new Date();

    const data = {
      nombre: this.nuevoAlumno,
      grupo: {
        id: this.grupoSeleccionado.id
      }
    };

    // 🔥 MOSTRAR INSTANTÁNEO EN TABLA
    this.alumnos.push({
      ...data,
      id: Date.now(),
      estado: '',
      fecha: ahora.toISOString().split('T')[0],
      hora: ahora.toTimeString().split(' ')[0],
      editando: false
    });

    // 🔥 GUARDAR EN BD
    this.api.crearAlumno(data).subscribe({
      next: () => {
        this.cargarAlumnos();
      },
      error: (err) => {
        console.error("ERROR AL GUARDAR ALUMNO:", err);
      }
    });

    this.nuevoAlumno = '';
  }

  // 🗑️ ELIMINAR (si luego tienes endpoint correcto)
  eliminarAlumno(id: number) {
    console.log("Eliminar alumno:", id);
  }

  // ✔️ MARCAR ASISTENCIA + GUARDAR EN BD
  marcar(alumno: any, estado: string) {
    alumno.estado = estado;

    const ahora = new Date();

    alumno.fecha = ahora.toISOString().split('T')[0];
    alumno.hora = ahora.toTimeString().split(' ')[0];

    // 🔥 ENVIAR A /api/asistencia
    const data = {
      estado: estado, // ✅ CORREGIDO (SIN toUpperCase)
      fecha: alumno.fecha,
      hora: alumno.hora,
      alumno: {
        id: alumno.id
      }
    };

    this.api.crearAsistencia(data).subscribe({
      next: () => console.log("ASISTENCIA GUARDADA ✅"),
      error: (err) => console.error("ERROR ASISTENCIA ❌", err)
    });
  }

  editarAlumno(a: any) {
    a.editando = true;
  }

  guardarEdicion(a: any) {
    a.editando = false;
  }

  guardarRegistro() {
    alert('Guardado en BD automáticamente ✅');
  }

  // 📊 ESTADÍSTICAS
  get total() { return this.alumnos.length; }
  get presentes() { return this.alumnos.filter(a => a.estado === 'Presente').length; }
  get tardanzas() { return this.alumnos.filter(a => a.estado === 'Tardanza').length; }
  get ausentes() { return this.alumnos.filter(a => a.estado === 'Ausente').length; }
  get justificados() { return this.alumnos.filter(a => a.estado === 'Justificado').length; }
}