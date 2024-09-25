export class UserObject {
    constructor(public username: string,
        public password: string,
        public role: string,
        public id:string) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.id=id;
    }

}