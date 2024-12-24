const jwt= require('jsonwebtoken');

module.exports = (req, res, next) =>{
    let token = req.get('Authorization');
    if(token){
        token= token.split(' ')[1];

        let decodedToken;
        try {
            decodedToken= jwt.verify(token,'secretkey')
        } catch (error) {
            console.log(error);
            throw error;
        }

        if(!decodedToken){
            const error= new Error('Not Authenticated');
            throw error;
        }

        req.userId= decodedToken.userId;

    }
    next();
}