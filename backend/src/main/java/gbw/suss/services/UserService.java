package gbw.suss.services;

import gbw.suss.models.User;
import gbw.suss.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UserService implements IUserService{

    @Autowired
    private UserRepository repo;

    @Override
    public User getByName(String name) {

        User found = null;
        for(User user : repo.findAll()) {
            if ((user.getFirstname() + " " + user.getLastname()).equals(name))
                found = user;
        }

        return found;
    }

    @Override
    public User getById(Long id) {
        Optional<User> found = repo.findById(id);
        return found.orElse(null);

    }

    @Override
    public User saveNew(User user) {
        return repo.save(user);
    }

    @Override
    public Boolean deleteUser(Long id) {
        User found = getById(id);
        if(found == null)
            return false;
        repo.delete(found);
        return true;
    }

    @Override
    public void save(User user) {
        repo.save(user);
    }
}
