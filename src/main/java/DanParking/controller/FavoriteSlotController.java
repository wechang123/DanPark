package DanParking.controller;

import DanParking.dto.request.FavoriteSlotRequestDTO;
import DanParking.dto.response.ApiResponseDTO;
import DanParking.dto.response.FavoriteSlotResponseDTO;
import DanParking.security.service.CustomUserDetails;
import DanParking.service.FavoriteSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FavoriteSlotController {
    @Autowired
    private FavoriteSlotService favoriteSlotService;

    @PostMapping("favorite-slots")
    public ApiResponseDTO<FavoriteSlotResponseDTO> createFavoriteSlot(
            @RequestBody FavoriteSlotRequestDTO favoriteSlotRequestDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails
            ){
        return ApiResponseDTO.success(favoriteSlotService.saveFavoriteSlot(userDetails.getUserId(), favoriteSlotRequestDTO));
    }

    @GetMapping("favorite-slots")
    public ApiResponseDTO<List<FavoriteSlotResponseDTO>> getMyFavoriteSlots(@AuthenticationPrincipal CustomUserDetails userDetails){
        return ApiResponseDTO.success(favoriteSlotService.findMyFavoriteSlots(userDetails.getUserId()));
    }

    @DeleteMapping("favorite-slots/{favoriteSlotId}")
    public ApiResponseDTO<String> deleteFavoriteSlot(
            @PathVariable Long favoriteSlotId,
            @AuthenticationPrincipal CustomUserDetails userDetails
            ){
        favoriteSlotService.deleteFavoriteSlot(userDetails.getUserId(), favoriteSlotId);
        return ApiResponseDTO.success("즐겨찾는 주차자리 삭제 완료");
    }
}
