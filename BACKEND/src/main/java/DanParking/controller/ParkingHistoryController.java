package DanParking.controller;

import DanParking.dto.request.ParkingHistoryCreateDTO;
import DanParking.dto.response.ApiResponseDTO;
import DanParking.dto.response.ParkingHistoryResponseDTO;
import DanParking.security.service.CustomUserDetails;
import DanParking.service.ParkingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ParkingHistoryController {
    @Autowired
    private ParkingHistoryService parkingHistoryService;

    @PostMapping("/parking-histories")
    public ApiResponseDTO<ParkingHistoryResponseDTO> createParkingHistory(
            @RequestBody ParkingHistoryCreateDTO parkingHistoryCreateDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails
            ){
        return ApiResponseDTO.success(parkingHistoryService.saveParkingHistory(userDetails.getUserId(), parkingHistoryCreateDTO.getParkingLotId()));
    }

    @GetMapping("/parking-histories")
    public ApiResponseDTO<List<ParkingHistoryResponseDTO>> getMyParkingHistories(@AuthenticationPrincipal CustomUserDetails userDetails){
        return ApiResponseDTO.success(parkingHistoryService.findMyParkingHistories(userDetails.getUserId()));
    }
}
