package com.Practica5.practica5;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
    private ArrayList<app> sugerencias = new ArrayList<app>();

    @GetMapping("/app")
    public ResponseEntity<ArrayList<app>> getTasks() {
        return new ResponseEntity<ArrayList<app>>(sugerencias, HttpStatus.OK);
    }



    @PostMapping("/app")
    public ResponseEntity<app> postTask(@RequestBody app sugerencia) {
        int id = sugerencias.size();
        sugerencia.setId(id);
        sugerencias.add(sugerencia);

        return new ResponseEntity<app>(sugerencia, HttpStatus.OK);
    }

    @DeleteMapping("/app/{idString}")
    public ResponseEntity<ArrayList<app>> deleteTask(@PathVariable String idString) throws Exception {
        int id = Integer.parseInt(idString);
        app elim = new app(id, "");
        sugerencias.remove(elim);
        throw new Exception();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exceptionHandler() {
        return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
    }
}
