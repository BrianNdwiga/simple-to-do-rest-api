const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

// Add a virtual 'id' field
todoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are included when converting to JSON
todoSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Todo', todoSchema);
