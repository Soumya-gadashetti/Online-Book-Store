module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            category: String,
            bookTitle: String,
            price: Number,
            author: String,
            publisher: String,
            description: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Tutorial = mongoose.model("tutorial", schema);
    return Tutorial;
};