package DanParking.service;

import DanParking.dto.response.ParkingHistoryResponseDTO;
import DanParking.entity.ParkingHistory;
import DanParking.entity.ParkingLot;
import DanParking.entity.User;
import DanParking.repository.ParkingHistoryJpaRepository;
import DanParking.repository.ParkingLotJpaRepository;
import DanParking.repository.UserJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ParkingHistoryService {
    @Autowired
    private ParkingHistoryJpaRepository parkingHistoryJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private ParkingLotJpaRepository parkingLotJpaRepository;

    @Transactional
    public ParkingHistoryResponseDTO saveParkingHistory(Long userId, Long parkingLotId) {
        User user = userJpaRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("userId: "+userId+" 에 해당하는 user 없음."));
        ParkingLot parkingLot = parkingLotJpaRepository.findById(parkingLotId)
                .orElseThrow(()-> new IllegalArgumentException("parkingLotId: "+parkingLotId+" 에 해당하는 parkingLot 없음"));

        ParkingHistory parkingHistory = new ParkingHistory(user, parkingLot);
        user.getParkingHistoryList().add(parkingHistory);

        return ParkingHistory.fromEntity(parkingHistoryJpaRepository.save(parkingHistory));
    }

    public List<ParkingHistoryResponseDTO> findMyParkingHistories(Long userId) {
        User user = userJpaRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("userId: "+userId+" 에 해당하는 user 없음."));
        List<ParkingHistory> parkingHistoryList = user.getParkingHistoryList();

        return ParkingHistory.fromEntityList(parkingHistoryList);
    }
}
