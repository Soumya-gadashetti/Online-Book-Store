
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            category: String,
            price: Number,
            quantity: Number,
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

    const Book = mongoose.model("book", schema);
    return Book;
};