import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const app=express();
app.use(cors({origin:process.env.CLIENT_ORIGIN?.split(',').map(s=>s.trim())||true}));
app.use(express.json());

const codes=new Map();
const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||465),secure:String(process.env.SMTP_SECURE)!=='false',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});

app.get('/api/health',(_,res)=>res.json({ok:true,service:'Gratis Fine Dine Bar auth'}));
app.post('/api/auth/send-code',async(req,res)=>{
  const email=String(req.body.email||'').trim().toLowerCase();
  const name=String(req.body.name||'Guest').trim().slice(0,80);
  if(!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({error:'Enter a valid email address.'});
  if(!process.env.SMTP_USER||!process.env.SMTP_PASS) return res.status(500).json({error:'Restaurant email service is not configured yet.'});
  const code=String(Math.floor(100000+Math.random()*900000));
  codes.set(email,{code,expires:Date.now()+10*60*1000,attempts:0});
  try{
    await transporter.sendMail({from:process.env.MAIL_FROM||`Gratis Fine Dine Bar <${process.env.SMTP_USER}>`,to:email,subject:'Your Gratis Fine Dine Bar verification code',text:`Hello ${name || 'Guest'},\n\nYour Gratis Fine Dine Bar verification code is ${code}. It expires in 10 minutes.\n\nIf you did not request this, you can ignore this email.\n\n— Gratis Fine Dine Bar` ,html:`<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;background:#141212;color:#f6f1e7"><p style="letter-spacing:3px;color:#c08a3e;font-size:11px">GRATIS FINE DINE BAR</p><h1 style="font-size:32px;margin:12px 0">Verify your email</h1><p>Hello ${name||'Guest'},</p><p>Your verification code is:</p><div style="font-size:40px;letter-spacing:10px;font-weight:700;padding:18px 0;color:#c08a3e">${code}</div><p style="color:#aaa">This code expires in 10 minutes.</p><p style="color:#aaa">If you did not request this, you can ignore this email.</p></div>`});
    res.json({ok:true});
  }catch(e){codes.delete(email);res.status(500).json({error:'Unable to send the verification email right now.'});}
});
app.post('/api/auth/verify-code',(req,res)=>{
  const email=String(req.body.email||'').trim().toLowerCase();
  const code=String(req.body.code||'').trim();
  const record=codes.get(email);
  if(!record) return res.status(400).json({error:'No active verification code. Please request a new one.'});
  if(Date.now()>record.expires){codes.delete(email);return res.status(400).json({error:'That code has expired. Please request a new one.'});}
  record.attempts++;
  if(record.attempts>5){codes.delete(email);return res.status(429).json({error:'Too many attempts. Please request a new code.'});}
  if(record.code!==code) return res.status(400).json({error:'Incorrect verification code.'});
  codes.delete(email);
  res.json({ok:true,verified:true});
});
app.listen(Number(process.env.PORT||8787),()=>console.log(`Gratis auth server running on ${process.env.PORT||8787}`));
