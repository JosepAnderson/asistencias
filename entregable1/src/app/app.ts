import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Asistencia } from './asistencia/asistencia';
import { Grupos } from './grupos/grupos';
import { CommonModule } from '@angular/common';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Asistencia, Grupos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('entregable1');

  vista: 'grupos' | 'asistencia' = 'asistencia';

  grupos: any[] = [];
  grupoSeleccionado: any = null;

  constructor(private api: Api) {}

  ngOnInit() {
    this.cargarGrupos();
  }

  // 🔥 AHORA DESDE API
  cargarGrupos() {
    this.api.getGrupos().subscribe((data: any) => {
      this.grupos = data;
    });
  }


  seleccionarGrupo(g: any) {
    this.grupoSeleccionado = g;
  }
}