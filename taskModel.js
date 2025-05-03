const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum:["Pending", "In-progress", "Completed"]
    },
    due_date: {
        type: Date
    }
})
const Task = new mongoose.model('task', taskSchema);
module.exports = Task;