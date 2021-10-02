module.exports = class Jpg {
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