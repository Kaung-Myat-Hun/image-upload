const filesPayloadExists = (req,res,next) =>{
  if(!req.files) return res.status(400).json({message: "Missing Files", status: "error"})

  next();
}

module.exports= filesPayloadExists;