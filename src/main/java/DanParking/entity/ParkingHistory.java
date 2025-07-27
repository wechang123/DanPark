package DanParking.entity;

import DanParking.dto.response.ParkingHistoryResponseDTO;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ParkingHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_lot_id")
    private ParkingLot parkingLot;

    private final LocalDateTime parkedAt = LocalDateTime.now();

    @Builder
    public ParkingHistory(User user, ParkingLot parkingLot){
        this.user = user;
        this.parkingLot = parkingLot;
    }

    public static ParkingHistoryResponseDTO fromEntity(ParkingHistory parkingHistory) {
        return new ParkingHistoryResponseDTO(parkingHistory.getId(), parkingHistory.getParkingLot().getId(), parkingHistory.getParkedAt());
    }

    public static List<ParkingHistoryResponseDTO> fromEntityList(List<ParkingHistory> parkingHistoryList) {
        List<ParkingHistoryResponseDTO> parkingHistoryResponseDTOList = new ArrayList<>();
        for(ParkingHistory parkingHistory : parkingHistoryList){
            parkingHistoryResponseDTOList.add(ParkingHistory.fromEntity(parkingHistory));
        }
        return parkingHistoryResponseDTOList;
    }
}
