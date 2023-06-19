import {Usertype} from './usertype';

/**
 * Classe DTO di User. DEVE essere uguale (stesso nome classe, stessi attributi e stessi nomi) a
 * quello nel backend. 
 * 
 * @see Usertype
 * 
 * @author Vittorio Valent
 */
export class UserDTO {

   id: number;

   email: string;

   password: string;

   usertype: Usertype;

   constructor(id: number,
      email: string,
      password: string,
      usertype: Usertype) {
         this.id = id;
         this.email = email;
         this.password = password;
         this.usertype = usertype;
      }
}

