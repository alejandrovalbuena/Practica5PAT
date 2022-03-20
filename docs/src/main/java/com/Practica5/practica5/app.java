package com.Practica5.practica5;

import java.io.Serializable;

import org.springframework.scheduling.config.Task;

public class app implements Serializable {
    private int id ;
    private String sug;

    public app(int id, String sug) {
        this.id = id;
        this.sug = sug;
    }

    
    public String getSug() {
        return sug;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setSug(String sug) {
        this.sug = sug;
    }

}
