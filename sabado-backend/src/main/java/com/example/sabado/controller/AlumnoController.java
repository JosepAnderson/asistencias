package com.example.sabado.controller;

import com.example.sabado.model.Alumno;
import com.example.sabado.model.Grupo;
import com.example.sabado.repository.AlumnoRepository;
import com.example.sabado.repository.GrupoRepository;
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
@RequestMapping("/api/alumnos")
public class AlumnoController {

    private final AlumnoRepository alumnoRepository;
    private final GrupoRepository grupoRepository;

    public AlumnoController(AlumnoRepository alumnoRepository, GrupoRepository grupoRepository) {
        this.alumnoRepository = alumnoRepository;
        this.grupoRepository = grupoRepository;
    }

    @GetMapping
    public List<Alumno> listar() {
        return alumnoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Alumno> crear(@RequestBody Alumno alumno) {
        if (alumno.getGrupo() == null || alumno.getGrupo().getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Grupo grupo = grupoRepository.findById(alumno.getGrupo().getId()).orElse(null);
        if (grupo == null) {
            return ResponseEntity.notFound().build();
        }

        alumno.setGrupo(grupo);
        return ResponseEntity.ok(alumnoRepository.save(alumno));
    }
}
