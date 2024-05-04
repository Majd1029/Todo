const express = require('express')
const router = express.Router();
const Task = require('../models/task')

router.get('/tasks',async(request,response)=>{
    try{
        const tasks = await Task.find()
        response.status(200).json(tasks)
    } catch(err){
        response.status(500).json({error: err.message})
    }    
})

router.post('/tasks', async(request, response)=>{
    try{
        const task = new Task(request.body)
        console.log(request.body)
        await task.save()
        response.status(200).json({message: "added successfully!",task});  
    } catch(err){
        response.status(400).json({error: err.message});
    }
});

router.put('/tasks/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { completed } = request.body; // Extract the completed field from the request body
        const task = await Task.findByIdAndUpdate(id, { completed }, { new: true }); // Update only the completed field
        response.status(200).json({ message: "Updated successfully!", task });
    } catch (err) {
        response.status(400).json({ error: err.message });
    }
});


router.delete('/tasks/:id', async(request, response)=>{
    try{
        const{id} = request.params
        await Task.findByIdAndDelete(id)
        response.status(200).json({message:"Deleted successfully!"});
    }catch(err){
        response.status(400).json({error: err.message});
    }
})

module.exports = router;