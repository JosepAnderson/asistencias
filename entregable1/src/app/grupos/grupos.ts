import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grupos.html',
  styleUrls: ['./grupos.css'],
})
export class Grupos implements OnInit {

  grupos: any[] = [];
  nuevoGrupo: string = '';

  @Output() crearGrupo = new EventEmitter<string>();

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargarGrupos();
  }

  cargarGrupos() {
    this.api.getGrupos().subscribe((data: any) => {
      this.grupos = data;
    });
  }

  agregarGrupo() {
    if (!this.nuevoGrupo.trim()) return;

    const data = { nombre: this.nuevoGrupo };

    this.api.crearGrupo(data).subscribe(() => {
      this.cargarGrupos();
    });

    this.crearGrupo.emit(this.nuevoGrupo);
    this.nuevoGrupo = '';
  }

  eliminarGrupo(id: number) {
    this.api.eliminarGrupo(id).subscribe(() => {
      this.cargarGrupos();
    });
  }

  editarGrupo(grupo: any) {
    grupo.editando = true;
  }

  guardarGrupo(grupo: any) {
    grupo.editando = false;
    // 🔥 aquí luego puedes poner update API
  }
}