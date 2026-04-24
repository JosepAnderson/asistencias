package com.example.sabado.controller;

import com.example.sabado.model.Alumno;
import com.example.sabado.model.Asistencia;
import com.example.sabado.repository.AlumnoRepository;
import com.example.sabado.repository.AsistenciaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/asistencia")
public class AsistenciaController {

    private final AsistenciaRepository asistenciaRepository;
    private final AlumnoRepository alumnoRepository;

    public AsistenciaController(AsistenciaRepository asistenciaRepository, AlumnoRepository alumnoRepository) {
        this.asistenciaRepository = asistenciaRepository;
        this.alumnoRepository = alumnoRepository;
    }

    @GetMapping
    public List<Asistencia> listar() {
        return asistenciaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Asistencia> crear(@RequestBody Asistencia asistencia) {
        if (asistencia.getAlumno() == null || asistencia.getAlumno().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Alumno alumno = alumnoRepository.findById(asistencia.getAlumno().getId()).orElse(null);
        if (alumno == null) {
            return ResponseEntity.notFound().build();
        }

        asistencia.setAlumno(alumno);
        return ResponseEntity.ok(asistenciaRepository.save(asistencia));
    }
}
