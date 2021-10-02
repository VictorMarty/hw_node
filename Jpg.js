


module.exports = class Jpg {
    // TODO: можно как-то присваивать объкту поля деструктуризацией?
    constructor(id, size, createdAt) {
        this.id = id;
        this.size = size;
        this.createdAt = createdAt
    }

    toJSON() {
        return {
            id: this.id,
            size: this.size,
            createdAt: this.createdAt,
        }

    }
}