export class HashManagerMock {
    createHash = (plainText: string): string => {
        return "hash"
    }

    compareHash = (plainText: string, cypherText: string): boolean => {
        return plainText === cypherText
    }
}