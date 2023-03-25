package gbw.suss.models;


import jakarta.persistence.*;
import org.hibernate.annotations.Table;

import java.util.List;
import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToMany
    @Column(name="following")
    private Set<Stock> following;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private String email;
    private String password;


    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @Column(name="first_name")
    private String firstname;
    @Column(name="last_name")
    private String lastname;

    public Set<Stock> getFollowing()
    {
        return following;
    }
    public void setFollowing(Set<Stock> following)
    {
        this.following = following;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
