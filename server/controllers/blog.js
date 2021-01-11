exports.baseTimeRoute = (req,res)=>{
    res.json({time: Date().toString()})
  }