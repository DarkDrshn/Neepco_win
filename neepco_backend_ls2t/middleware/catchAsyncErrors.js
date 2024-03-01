module.exports=cae=>(req,res,next)=>{
    Promise.resolve(cae(req,res,next)).catch(next);
}