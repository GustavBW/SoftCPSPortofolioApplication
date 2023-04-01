package gbw.sls.controllers;

import gbw.sls.models.User;
import gbw.sls.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(path="/users")
    public ResponseEntity<User> getUser(@RequestParam(required = false) String name, @RequestParam(required = false) Long id)
    {
        User user = id == null ? userService.getByName(name) : userService.getById(id) ;
        return new ResponseEntity<>(
                user,
                user == null ? HttpStatusCode.valueOf(404) : HttpStatusCode.valueOf(200)
        );
    }

    @PostMapping(path="/users")
    public ResponseEntity<User> createUser(@RequestBody User user)
    {
        if(user == null){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));
        }
        User asSaved = userService.saveNew(user);
        return new ResponseEntity<>(asSaved, HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("/users")
    public ResponseEntity<String> deleteUser(@RequestParam Long id)
    {
        Boolean worked = userService.deleteUser(id);
        return new ResponseEntity<>(
                worked ? "user deleted" : "user couldn't be deleted",
                worked ? HttpStatusCode.valueOf(200) : HttpStatusCode.valueOf(400)
        );
    }



}
