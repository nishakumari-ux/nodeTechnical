const express = require("express");
const app = express();
app.use(express.json());

const Task = require("../models/taskModel");
const jwt = require("jsonwebtoken");
const config = require("../controllers/config");

exports.taskCreate = async function (req, res) {
    try {

        const createTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        })
        console.log(createTask)

        const token = jwt.sign({ id: createTask.id }, config.secret,
            { expiresIn: "2h" });
        console.log("token---", token)

        res.status(200).json({ message: "Task created successfully", createTask })
    } catch (error) {
        console.log(error)
    }
}

exports.taskList = async function (req, res) {
    try {
        const taskList = await Task.find({ status: req.body.status })

        res.status(200).json({ message: "List is getting successfylly", taskList })

    } catch (error) {
        console.log(error)
    }
}

exports.updateTask = async function (req, res) {
    try {
        const taskUpdate = await Task.findByIdAndUpdate(req.taskId, {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }, { new: true })

        res.status(200).json({ message: "Task updated successfylly", taskUpdate })

    } catch (error) {
        console.log(error)
    }
}

exports.deleteTask = async function (req, res) {
    try {

        const findTask = await Task.findById(req.params.id)

        if (findTask) {
            const taskDelete = await Task.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "Task deleted successfylly", taskDelete })
        } else {
            res.status(400).json({ message: "Task not found." })
        }

    } catch (error) {
        console.log(error)
    }
}

// COMPLETE TASK LIST FOR AUDIT
exports.completeTaskList = async function(req, res){
    try {

        const completeTaskList = await Task.find({status: "Completed"})

        res.status(200).json({ message: "fetching complete task successfylly", completeTaskList })
        
    } catch (error) {
        console.log(error)
    }
}

