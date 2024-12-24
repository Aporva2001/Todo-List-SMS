const User= require('../models/user');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

exports.getSignup= (req, res, next)=>{
    res.send('<h1>This is the signup page</h1>')
}

exports.postSignup=async (req, res, next)=>{
    const email= req.body.email;
    const name= req.body.name;
    const password= req.body.password;
    const phone= req.body.phone;

  const hashedPw= await bcrypt.hash(password, 12)

    const user = new User({
        email: email,
        name: name,
        password: hashedPw,
        phone: phone,
        todos: []
    })
     user.save()
    .then(result =>{
        console.log("User created")
        res.status(200).json({message: "User created Successfully"})
    })
    .catch(err => console.log(err))
}

exports.postLogin = (req, res, next)=>{
    const email= req.body.email;
    const password= req.body.password;

    User.findOne({email: email}).then(user =>{
        if(!user){
            console.log('User not found');
            return res.redirect('/signup');
        }
        bcrypt.compare(password, user.password).then(isEqual =>{
            if(!isEqual){
                console.log("Invalid Password");
                return;
            }
            const token= jwt.sign({email: user.email, userId: user._id.toString()},"secretkey",{expiresIn: '1h'});

            res.status(200).json({message: "Logged in", token: token, userId: user._id.toString()});
        }).catch(err => console.log(err))
    })
}

exports.postLogout = (req, res, next)=>{
    req.userId=null;
}