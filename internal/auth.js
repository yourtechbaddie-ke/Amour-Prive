const crypto=require('crypto');
function hashPassword(password){return new Promise((resolve,reject)=>{const salt=crypto.randomBytes(16).toString('hex');crypto.scrypt(password,salt,64,(err,key)=>err?reject(err):resolve(`${salt}:${key.toString('hex')}`));});}
function verifyPassword(password,stored){return new Promise(resolve=>{const [salt,hex]=String(stored||'').split(':');if(!salt||!hex)return resolve(false);crypto.scrypt(password,salt,64,(err,key)=>{if(err)return resolve(false);const a=Buffer.from(hex,'hex'),b=Buffer.from(key.toString('hex'),'hex');resolve(a.length===b.length&&crypto.timingSafeEqual(a,b));});});}
function token(){return crypto.randomBytes(32).toString('hex');}
module.exports={hashPassword,verifyPassword,token};
