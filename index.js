import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
configDotenv();
const app = express();
app.use(cors({origin:process.env.FRONT,credentials:true}));
app.use(cookieParser());
app.get('/cookie',async (req,res,next) => {
    const jwt = jsonwebtoken.sign({id:1},process.env.SECRET,{expiresIn:'7d'})
    res.cookie("jwt", jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.status(200).json({status:'success'});
})

app.get('/verify',async (req,res,next) => {
    const {jwt} = req.cookies;
    console.log(jwt);
    jsonwebtoken.verify(jwt,process.env.SECRET);
    res.status(200).json({status:'success'});
})


app.listen(process.env.PORT,()=>console.log('listening'));
