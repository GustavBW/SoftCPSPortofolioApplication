package gbw.suss.controllers;

import gbw.suss.models.Stock;
import gbw.suss.models.User;
import gbw.suss.services.StockService;
import gbw.suss.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private StockService stockService;

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

    @PostMapping("/users/{userId}/follow/{stockId}")
    public ResponseEntity<String> followStock(@PathVariable Long userId, @PathVariable Long stockId)
    {
        User user = userService.getById(userId);
        if(user == null)
            return new ResponseEntity<>("user not found", HttpStatusCode.valueOf(400));

        Stock stock = stockService.getById(stockId);
        if(stock == null)
            return new ResponseEntity<>("stock not found", HttpStatusCode.valueOf(400));

        user.getFollowing().add(stock);
        userService.save(user);

        return new ResponseEntity<>("user " + user.getFirstname() + " now follows " + stock.getTicker(), HttpStatusCode.valueOf(200));
    }

}
