const e = require('express');
const Task = require('../models/Task');
const { createCustomError } = require('../error/custom-error');
const asyncWrapper = require('../middle_ware/async-wrapper')

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks }); 
})

const createTasks = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
})

const getTasks = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if(!task)
    { 
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // return res.status(404).json({ msg: `No task with id : ${taskID}` }); 
    }
        
    res.status(200).json({ task }); 
})

const updateTasks = asyncWrapper( async (req, res, next) => {
    
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID} , req.body ,
        {
            new: true,
            runValidators: true
        }
    );
        
    if(!task)
    { 
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // return res.status(404).json({ msg: `No task with id : ${taskID}` }); 
    }

    res.status(200).json({ task });
})

const deleteTasks = asyncWrapper( async (req, res, next) => 
{
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
        
    if(!task)
    { 
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // return res.status(404).json({ msg: `No task with id : ${taskID}` }); 
    }

    res.status(200).json({ task });
})

// const getAllTasks = async (req, res) => {
//     try 
//     {
//         const tasks = await Task.find({});
//         res.status(200).json({ tasks }); 

//         // res.status(200).json({ tasks , amount: tasks.length });
//         // res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length}});
//     } 
//     catch (error) 
//     {
//         res.status(500).json({ msg: error});
//     }
// }

// const createTasks = async (req, res) => {
//     try 
//     {
//         const task = await Task.create(req.body);
//         res.status(201).json({task});
//     }
//     catch( error )
//     {
//         res.status(500).json({ msg: error});
//     }
// }

// const getTasks = async (req, res) => {
//     try 
//     {
//         const { id: taskID } = req.params;
//         const task = await Task.findOne({ _id: taskID });

//         if(!task)
//         { return res.status(404).json({ msg: `No task with id : ${taskID}` }); }
        
//         res.status(200).json({ task }); 
//     } 
//     catch (error) 
//     {
//         res.status(500).json({ msg: error});
//     }
// }

// const updateTasks = async (req, res) => {
//     try 
//     {
//         const { id: taskID } = req.params;
//         const task = await Task.findOneAndUpdate({ _id: taskID} , req.body ,
//             {
//                 new: true,
//                 runValidators: true
//             }
//         );
        
//         if(!task)
//         {   res.status(404).json({ msg: `No task with id : ${taskID}`});    }

//         res.status(200).json({ task });
//     } 
//     catch (error) 
//     {
//         res.status(500).json({msg : error});
//     }
// }

// const deleteTasks = async (req, res) => 
// {
//     try 
//     {
//         const { id: taskID } = req.params;
//         const task = await Task.findOneAndDelete({ _id: taskID });
        
//         if(!task){ return res.status(404).json({ msg: `No task With id : ${taskID}`}); }

//         res.status(200).json({ task });
//     } 
//     catch (error) 
//     {
//         res.status(500).json({ msg: error });    
//     }
// }

module.exports = {
    getAllTasks,
    createTasks,
    updateTasks,
    deleteTasks,
    getTasks
}

