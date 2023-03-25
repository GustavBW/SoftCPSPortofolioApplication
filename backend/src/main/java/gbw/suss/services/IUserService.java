package gbw.suss.services;

import gbw.suss.models.User;

public interface IUserService {
    User getByName(String name);

    User getById(Long id);

    User saveNew(User user);

    Boolean deleteUser(Long id);

    void save(User user);
}
