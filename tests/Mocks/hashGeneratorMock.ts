export class HashManagerMock {
    public createHash = async (s: string) => {
        return "hash"
    }

    public compareHash = async (s: string, hash: string) => {
        return s === hash
    }
}