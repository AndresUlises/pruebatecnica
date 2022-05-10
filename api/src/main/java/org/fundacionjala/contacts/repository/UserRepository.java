package org.fundacionjala.contacts.repository;

import org.fundacionjala.contacts.db.entities.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserData, Long> {

    @Query("select u from UserData u where lower(u.username) = lower(?1) and lower(u.password) = lower(?2)")
    List<UserData> findByUsernameAndPassword(String username, String password);

    @Query("select u from UserData u where u.temporalCode = ?1")
    List<UserData> findByCode(String code);
    
}
