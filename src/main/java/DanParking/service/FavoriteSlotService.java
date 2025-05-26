package DanParking.service;

import DanParking.dto.request.FavoriteSlotRequestDTO;
import DanParking.dto.response.FavoriteSlotResponseDTO;
import DanParking.entity.FavoriteSlot;
import DanParking.entity.ParkingSlot;
import DanParking.entity.User;
import DanParking.repository.FavoriteSlotJpaRepository;
import DanParking.repository.ParkingSlotJpaRepository;
import DanParking.repository.UserJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoriteSlotService {
    @Autowired
    private FavoriteSlotJpaRepository favoriteSlotJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private ParkingSlotJpaRepository parkingSlotJpaRepository;

    @Transactional
    public FavoriteSlotResponseDTO saveFavoriteSlot(Long userId, FavoriteSlotRequestDTO favoriteSlotRequestDTO) {
        User user = userJpaRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("userId "+userId+"에 해당하는 user 없음"));
        ParkingSlot parkingSlot = parkingSlotJpaRepository.findById(favoriteSlotRequestDTO.getSlotId())
                .orElseThrow(()-> new IllegalArgumentException("parkingSlotId "+favoriteSlotRequestDTO.getSlotId()+"에 해당하는 parkingSlot 없음"));
        if(favoriteSlotJpaRepository.findByUserIdAndSlotId(userId, parkingSlot.getId()).isPresent()){
            throw new IllegalArgumentException("사용자가 이미 parkingSlotId "+parkingSlot.getId()+" 에 해당하는 주차자리를 즐겨찾기중임");
        }
        FavoriteSlot favoriteSlot = favoriteSlotJpaRepository.save(new FavoriteSlot(user.getId(), favoriteSlotRequestDTO.getSlotId()));
        return new FavoriteSlotResponseDTO(
                favoriteSlot.getId(),
                parkingSlot.getId(),
                parkingSlot.getParkingLotId(),
                parkingSlot.getSlotNumber(),
                parkingSlot.getIsAvailable()
        );
    }

    public List<FavoriteSlotResponseDTO> findMyFavoriteSlots(Long userId) {
        User user = userJpaRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("userId "+userId+"에 해당하는 user 없음"));
        List<FavoriteSlot> favoriteSlotList = favoriteSlotJpaRepository.findByUserId(user.getId());

        List<FavoriteSlotResponseDTO> favoriteSlotResponseDTOList = new ArrayList<>();
        for(FavoriteSlot favoriteSlot : favoriteSlotList){
            ParkingSlot parkingSlot = parkingSlotJpaRepository.findById(favoriteSlot.getSlotId())
                    .orElseThrow(()-> new IllegalArgumentException("parkingSlotId "+favoriteSlot.getSlotId()+"에 해당하는 parkingSlot 없음"));
            favoriteSlotResponseDTOList.add(new FavoriteSlotResponseDTO(
                    favoriteSlot.getId(),
                    parkingSlot.getId(),
                    parkingSlot.getParkingLotId(),
                    parkingSlot.getSlotNumber(),
                    parkingSlot.getIsAvailable()
            ));
        }
        return favoriteSlotResponseDTOList;
    }

    @Transactional
    public void deleteFavoriteSlot(Long userId, Long favoriteSlotId) {
        User user = userJpaRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("userId "+userId+" 에 해당하는 user 없음"));
        FavoriteSlot favoriteSlot = favoriteSlotJpaRepository.findByUserIdAndId(userId, favoriteSlotId)
                .orElseThrow(()-> new IllegalArgumentException("userId "+userId+", id "+favoriteSlotId+" 에 해당하는 favoriteSlot 없음"));
        favoriteSlotJpaRepository.delete(favoriteSlot);
    }
}
