package it.contrader.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;

    private final String id;
    private final String email;
    private final String password;
    private final String usertype;



    public JwtResponse(String jwttoken, String id, String email, String password, String usertype) {
        this.jwttoken = jwttoken;
        this.id = id;
        this.email = email;
        this.password = password;
        this.usertype = usertype;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getUsertype() {
        return this.usertype;
    }

    public String getId () {
        return this.id;
    }
}