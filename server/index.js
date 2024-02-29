const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors") 
const TodoModel = require('./Models/todo')



const app = express()

app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/todo')




app.get('/get' ,(req,res)=>{
TodoModel.find()
.then(result=> res.json(result))
.catch(err =>res.json(err))


})



app.put('/update/:id',(req,res)=>{

const {id} = req.params;
TodoModel.findByIdAndUpdate({_id:id},{done:true})
.then(result=> res.json(result))
.catch(err =>res.json(err))
})




app.post('/add',(req,res) =>{
 const task =req.body.task;
 TodoModel.create({
  task:task
 }).then(result => res.json(result))
 .catch(err=> res.json(err))

})


app.delete('/delete/:id', (req, res) => {
 const id = req.params.id; // Extract the id from the URL params

 TodoModel.findByIdAndDelete(id)
   .then(result => {
     if (!result) {
       return res.status(404).json({ error: 'Todo not found' });
     }
     res.json(result);
   })
   .catch(err => res.status(500).json({ error: err.message }));
});


app.listen(8080, ()=>{
 console.log("server is running")
})