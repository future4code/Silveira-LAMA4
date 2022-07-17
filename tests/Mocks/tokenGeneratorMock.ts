import { UserRole } from "../../src/model/User"
import { authenticationData } from "../../src/types/authenticationData"

export class TokenGeneratorMock {
    public generateToken = (input: authenticationData): string => {
        return "token"
    }

    public getData(token: string) {
        return {
            id: "id_mock",
            role: UserRole.NORMAL
        }
    }
}