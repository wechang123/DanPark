package DanParking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ParkingHistoryResponseDTO {
    private Long id;
    private Long parkingLotId;
    private LocalDateTime parkedAt;
}
