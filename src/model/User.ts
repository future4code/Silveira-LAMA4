export class User {

    constructor(
        private id: string, 
        private name: string,
        private email: string,
        private password: string,
        private role: UserRole
    ) {}

    getId = () => {
        return this.id
    }

    getName = () => {
        return this.name
    }

    getEmail = () => {
        return this.email
    }

    getPassword = () => {
        return this.password
    }
    getRole = () => {
        return this.role
    }

    static toUserModel(user: any): User {
        return new User(
            user.id,
            user.nome,
            user.email,
            user.senha,
            user.role
        )
    }
}


export enum UserRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}