package com.contrader.carShop.mapper;

import com.contrader.carShop.dto.FotoDTO;
import com.contrader.carShop.model.Foto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface FotoMapper {
    FotoMapper INSTANCE = Mappers.getMapper(FotoMapper.class);

    Foto mapToFoto(FotoDTO foto);
    FotoDTO mapToFotoDTO(Foto foto);
    List<FotoDTO> mapToFotoDTOList(Iterable<Foto> foto);
}
