package DanParking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FavoriteSlotResponseDTO {
    private Long id;
    private Long slotId;
    private Long parkingLotId;
    private Long slotNumber;
    private Boolean isAvailable;
}
