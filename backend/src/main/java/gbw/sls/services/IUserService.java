package gbw.sls.services;

import gbw.sls.models.User;

public interface IUserService {
    User getByName(String name);

    User getById(Long id);

    User saveNew(User user);

    Boolean deleteUser(Long id);

    void save(User user);
}
