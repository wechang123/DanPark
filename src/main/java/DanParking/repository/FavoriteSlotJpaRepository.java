package DanParking.repository;

import DanParking.entity.FavoriteSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface FavoriteSlotJpaRepository extends JpaRepository<FavoriteSlot, Long> {
    List<FavoriteSlot> findByUserId(Long userId);

    Optional<FavoriteSlot> findByUserIdAndId(Long userId, Long id);

    Optional<FavoriteSlot> findByUserIdAndSlotId(Long userId, Long slotId);
}
