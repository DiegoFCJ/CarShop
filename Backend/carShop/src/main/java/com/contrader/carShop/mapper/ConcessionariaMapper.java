package com.contrader.carShop.mapper;

import com.contrader.carShop.dto.ConcessionariaDTO;
import com.contrader.carShop.model.Concessionaria;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ConcessionariaMapper {
    ConcessionariaMapper INSTANCE = Mappers.getMapper(ConcessionariaMapper.class);

    Concessionaria mapToConcessionaria(ConcessionariaDTO concessionaria);
    ConcessionariaDTO mapToConcessionariaDTO(Concessionaria utenza);
    List<ConcessionariaDTO> mapToConcessionariaDTOList(Iterable<Concessionaria> concessionaria);
}
