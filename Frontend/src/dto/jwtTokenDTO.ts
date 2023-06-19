export class JwtTokenDTO {
    id: number;
    email: string;
    password: string;
    usertype: string;
    token: string;

    constructor(id: number, email: string, password: string, usertype: string, token: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.usertype = usertype;
        this.token = token;
    }


}
