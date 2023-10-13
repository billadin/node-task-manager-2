const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({message: error})
    }
}
const getTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
        console.log(taskID);
        const task = await Task.findOne({_id:taskID});
        if (!task) {
            return res.status(500).json({message: 'No task found'})
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({message: error})
    }
}


const updateTask = (req, res) => {
    res.send('Update task');
}
const deleteTask = (req, res) => {
    res.send('Delete task');
}


module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}