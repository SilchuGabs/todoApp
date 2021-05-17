const express = require('express');
const auth = require('../middleware/auth')
const router = new express.Router();
const Task = require('../models/task');

/* ----------------------------- Creating a task ---------------------------- */

router.post('/tasks', auth, async(req, res) => {
    //const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) { res.status(400).send(e) }

})


/* ------------------------- Read Requests for Tasks ------------------------ */
router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) { return res.status(500).send() }

})

router.get('/tasks/', auth, async(req, res) => {
    try {
        //const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) { return res.status(500).send() }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     return res.status(500).send()
    // })
})


/* --------------------------- Updating Endpoints for Tasks--------------------------- */

router.patch('/tasks/:id', auth, async(req, res) => {
    //Object.keys returns an array with element inside. Not the value ej age:45 -> returns age
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
        //The every method to an array, checks whether every element pass the test in the fUNCTION that is pass. 
        //Returns false or true. 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        //If what the person is trying to update is not valid, then send a 400 response. Otherwise try/catch block
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) { return res.status(400).send() }
})


/* ----------------------------- Deleting Task ----------------------------- */
router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()

    }
})

module.exports = router;