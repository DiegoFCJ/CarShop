package com.contrader.carShop.mapper;

import com.contrader.carShop.dto.AutoDTO;
import com.contrader.carShop.model.Auto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface AutoMapper {
    AutoMapper INSTANCE = Mappers.getMapper(AutoMapper.class);

    Auto mapToAuto(AutoDTO auto);
    AutoDTO mapToAutoDTO(Auto auto);
    List<AutoDTO> mapToAutoDTOList(Iterable<Auto> auto);
}