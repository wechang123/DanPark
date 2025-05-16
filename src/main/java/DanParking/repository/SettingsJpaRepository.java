package DanParking.repository;

import DanParking.domain.Settings;
import DanParking.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsJpaRepository extends JpaRepository<Settings, Long> {
    void deleteByUser(User user);
}
