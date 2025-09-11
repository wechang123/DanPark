package DanParking.repository;

import DanParking.entity.ParkingHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingHistoryJpaRepository extends JpaRepository<ParkingHistory, Long> {
}
