const Router = require('express');
const auth = require('../middleware/auth-middleware');
const Todo = require('../models/Todo');

const router = Router();

router.get('/', auth, async (req, res) => {
    try{
        const data = await Todo.find({id: req.user.userId});
        res.status(200).json({todos: data});
    }
    catch(err) {
        console.log("Server error", err.message);
        res.status(500).json({message: "Server error, please try again"});
    }
});

router.post('/delete', auth, async (req, res) => {
    try{
        const {id} = req.body;
        await Todo.deleteOne({_id: id});
        res.status(200).json({message: "Todos successfully deleted"});
    }
    catch(err){
        console.log("Server error", err.message);
        res.status(500).json({message: "Server error, please try again"});
    }
});

router.post('/update', auth, async (req, res) => {
    try{
        const {id, completed, text} = req.body;
        await Todo.updateOne({_id: id}, {completed, text});
        res.status(200).json({message: "Todos successfully updated"});
    }
    catch(err){
        console.log("Server error", err.message);
        res.status(500).json({message: "Server error, please try again"});
    }
});

router.post('/add', auth, async (req, res) => {
    try{
        const {text} = req.body;
        const id = req.user.userId;
        const todo = new Todo({text, id, date: Date.now(), completed: false});
        await todo.save();
        res.status(200).json({message: "Todo saved"});
    }
    catch(err) {
        console.log("Server error", err.message);
        res.status(500).json({message: "Server error, please try again"});
    }
});

module.exports = router;