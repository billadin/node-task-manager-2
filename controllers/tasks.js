const { createCustomError } = require('../errors/custom-error');
const asyncWrap = require('../middleware/async-wrapper');
const Task = require('../models/Task');

const getAllTasks = asyncWrap(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({ task });
});


const getTask = asyncWrap(async (req, res, next) => {

        const {id:taskID} = req.params;
        console.log(taskID);
        const task = await Task.findOne({_id:taskID});
        if (!task) {
            return next(createCustomError('No task found', 404))
        }
        res.status(200).json({task});
})


const createTask = asyncWrap(async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({task});
})


const updateTask = asyncWrap(async (req, res, next) => {

        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return next(createCustomError('No task found', 404))
        }
        res.status(200).json({task});
})



const deleteTask = asyncWrap(async (req, res, next) => {
        const {id:taskID} = req.params;
        console.log(taskID);
        const task = await Task.findOneAndDelete({_id:taskID});
        if (!task) {
            return next(createCustomError('No task found', 404))
        }
        res.status(200).json({task});
})


module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}