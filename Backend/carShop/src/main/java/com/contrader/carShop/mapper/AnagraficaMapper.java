package com.contrader.carShop.mapper;

import com.contrader.carShop.dto.AnagraficaDTO;
import com.contrader.carShop.model.Anagrafica;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper
public interface AnagraficaMapper {
    AnagraficaMapper INSTANCE = Mappers.getMapper(AnagraficaMapper.class);

    Anagrafica mapToAnagrafica(AnagraficaDTO anagraficaDTO);
    AnagraficaDTO mapToAnagraficaDTO(Anagrafica anagrafica);
    List<AnagraficaDTO> mapToAnagraficaDTOList(Iterable<Anagrafica> anagrafica);
}
