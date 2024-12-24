const Todo = require("../models/todo");
const {validationResult} = require('express-validator')
const User = require("../models/user");



exports.addTodo= (req, res, next)=>{
    const title= req.body.title;
    const desc= req.body.description;
    const dueDate= req.body.dueDate;
    const reminderSent= req.body.reminderSent;
    const creator= req.userId;
    console.log("Creator is "+creator)
    const errors= validationResult(req);

    if(errors.array().length > 0){
        console.log(errors);
        return;
    }
    const todo = new Todo({
        title: title,
        description: desc,
        dueDate: dueDate,
        reminderSent: reminderSent,
        creator: creator
    })

    todo.save().then(result =>{
        User.findById(creator).then((user) =>{
            user.todos.push(todo._id);
            console.log(user.todos)
            user.save();
        })
        .then(()=>{
            res.status(201).json({
                message: 'Todo created Successfully',
                todo: todo
            })
        }) 
        .catch(err => console.log(err)) 

    })

}

exports.updateTodo = (req, res, next) =>{
    const todoId = req.params.todoId;
    const updatedTitle= req.body.title;
    const updatedStatus= req.body.status;
    const updatedDesc= req.body.description;
    const updatedDueDate= req.body.dueDate;
    const userId= req.userId;

    Todo.findById(todoId).then(todo =>{
        if(todo.creator.toString() !== userId){
            res.status(401).json({message: "User not Authenticated"})
            return;
        }
        if(!todo){
            console.log('User not found');
            return;
        }
    todo.title= updatedTitle;
    todo.description= updatedDesc;
    todo.status=updatedStatus;
    todo.dueDate= updatedDueDate;

    return todo.save();
    })
    .then(result =>{
        res.status(204).json({
            message: 'Post Updated Successfully',
        })
    })
}

exports.getTodos = (req, res, next)=>{
    console.log("Request Session ",req.session);

    Todo.find({creator: req.userId}).then((result)=>{
        Todo.find({creator: req.userId})
        .sort('dueDate')
        .then((todos) =>{
            res.status(200).json({
                message: 'Todos fetched successfully',
                todos: todos
            })
        })
    }).catch(err =>{
        console.log(err);
    })
    
}

exports.deleteTodo = (req, res, next)=>{
    const todoId= req.params.todoId;
    const userId= req.userId;
    Todo.findByIdAndDelete(todoId).then(result =>{
        if(result.creator.toString() !== userId){
            res.status(401).json({message: "User not Authenticated"})
            return;
        }
        User.findById(userId).then(user =>{
           const updatedUser = user.todos.filter((id) => id.toString() !== todoId.toString())
           user.todos= updatedUser;
           user.save();
           return updatedUser;
        })
        .then(()=>{
            res.status(204).json({
                message: 'Posts deleted Successfully'
            })
        })

    })
}
exports.findTodo = (req, res, next)=>{
    const todoId = req.params.todoId;
    const userId= req.userId;
    Todo.findById(todoId)
    .then((todo)=>{
        console.log(todo.creator, userId);
        if(todo.creator.toString() === userId){
        if(!todo){
            console.log("Todo not found!");
            return;
        }
        res.status(200).json({message: "Todo found and fetched", todo: todo} )
        }
        else{
            res.status(401).json({message: "User not Authenticated"})
        }
    })
    .catch(err => console.log(err))
}

exports.updateStatus = (req, res, next) =>{
    const todoId= req.params.todoId;
    Todo.findById(todoId)
    .then(todo =>{
        if(!todo){
            console.log("Todo not found");
            return;
        }
        todo.status = "completed";
        return todo.save();
    })
    .then(result =>{
       res.status(204).json({message: "Updated Status"})
    })
    .catch(err => console.log(err))

}