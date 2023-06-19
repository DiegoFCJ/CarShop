package com.contrader.carShop.mapper;

import com.contrader.carShop.dto.AcquistiDTO;
import com.contrader.carShop.model.Acquisti;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface AcquistiMapper {
    AcquistiMapper INSTANCE = Mappers.getMapper(AcquistiMapper.class);

    Acquisti mapToAcquisti(AcquistiDTO utenza);
    AcquistiDTO mapToAcquistiDTO(Acquisti utenza);
    List<AcquistiDTO> mapToAcquistiDTOList(Iterable<Acquisti> acquisti);

}
