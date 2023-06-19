import { UserDTO } from "./userdto";
import { AutoDTO } from "./auto";
export class FotoDTO {
    id: number;
    url: string;
    auto: AutoDTO;
    user: UserDTO;

    constructor (id: number,
                url: string,
                auto: AutoDTO,
                user: UserDTO) {
                    this.id = id;
                    this.url = url;
                    this.auto = auto;
                    this.user = user;
                }
}