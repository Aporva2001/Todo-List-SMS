const cron = require('node-cron');
const User= require('../models/user')
const Todo= require('../models/todo');
require('dotenv').config();

const Twilio= require('twilio');

const accountSid= `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.AUTH_TOKEN}`;

module.exports = (req, res, next)=>{
    User.find().populate('todos').then(users =>{
        users.forEach((user) =>{
            const client= Twilio(accountSid,authToken);
            cron.schedule('0 12 * * *', async ()=>{
                try{
                    const now= new Date();
                    user.todos.forEach((todo) =>{
                        // console.log(todo.dueDate)
                        const due= new Date(todo.dueDate);
                        const reminder= todo.reminderSent;
                        const status= todo.status;
                        if((due < now) && !reminder && status === 'pending'){
                            client.messages.create({
                                body: `Reminder! The task ${todo.title} is Overdue!`,
                                from: `${process.env.TWILIO_SENDER_PHONE}`,
                                to: '+91 '+user.phone
                            })
                            todo.reminderSent=true;
                            Todo.findById(todo._id).then(todo =>{
                                todo.reminderSent=true;
                                todo.save().then(result => console.log("Reminder sent")).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        }
                    })
                }
                catch(err){
                    console.log(err);
                }
            })

        })
    }).catch(err => console.log(err))

    next();
}