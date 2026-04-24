import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ======================
  // 🔥 GRUPOS
  // ======================

  getGrupos(): Observable<any> {
    return this.http.get(`${this.URL}/grupos`);
  }

  crearGrupo(grupo: any): Observable<any> {
    return this.http.post(`${this.URL}/grupos`, grupo);
  }

  eliminarGrupo(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/grupos/${id}`);
  }

 // ======================
// 🔥 ALUMNOS
// ======================

getAlumnos(): Observable<any> {
  return this.http.get(`${this.URL}/alumnos`);
}

crearAlumno(alumno: any): Observable<any> {
  return this.http.post(`${this.URL}/alumnos`, alumno);
}

eliminarAlumno(id: number): Observable<any> {
  return this.http.delete(`${this.URL}/alumnos/${id}`);
}

// ✅ AÑADIR ESTO (TE FALTABA)
actualizarAlumno(id: number, alumno: any): Observable<any> {
  return this.http.put(`${this.URL}/alumnos/${id}`, alumno);
}
  // ======================
// 🔥 ASISTENCIA
// ======================

crearAsistencia(data: any): Observable<any> {
  return this.http.post(`${this.URL}/asistencia`, data);
}
}
