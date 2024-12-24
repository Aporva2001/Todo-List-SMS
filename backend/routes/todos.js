const express= require('express');
const todoController= require('../controllers/todo');
const {check}= require('express-validator');
const isAuth = require('../middleware/is-auth');

const router= express.Router();

router.post('/add-todo',isAuth,[
    check('title').trim().isLength({min: 3}).withMessage('Title should have minimum length of 3 characters'),
    check('description').trim().isLength({min: 5}).withMessage('Description should have minimmum 5 characters')
], todoController.addTodo);

router.put('/update/:todoId',isAuth,[
    check('title').trim().isLength({min: 3}).withMessage('Title should have minimum length of 3 characters').isAlphanumeric(),
    check('description').trim().isLength({min: 5}).withMessage('Description should have minimmum 5 characters')
],todoController.updateTodo);

router.put('/update-status/:todoId',isAuth,todoController.updateStatus);

router.get('/:todoId',isAuth,todoController.findTodo);

router.get('/',isAuth,todoController.getTodos);

router.delete('/delete/:todoId',isAuth,todoController.deleteTodo)


module.exports= router;