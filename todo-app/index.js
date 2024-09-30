const { request , response } = require("express")
const express = require('express')
const { Todo } = require('./models/')


const app =express()

app.use(express.json())

app.get('/todos', async(request,response)=>{
    console.log("Todo list");
    try {
        const todos =  await Todo.findAll();
        return response.json(todos)
    } catch (error) {   
        return response.status(412).json(error)
    }
})

app.get("/todo/:id", async (request,response)=>{
    console.log("Todo list",request.params.id);
    try {
        const todo = await Todo.findByPk(request.params.id);
        return response.json(todo)
    } catch (error) {
        return response.status(412).json(error)
    }
})


app.post("/todo", async (request,response)=>{
    console.log("Todo added",request.body);
    try {
    const todo =  await Todo.addTodo({title: request.body.title,dueDate: request.body.dueDate});
    return response.json(todo)
    } catch (error) {
        return response.status(412).json(error)
    }
})

app.put("/todo/:id/markcompleted", async (request,response)=>{
    console.log("Todo updated",request.params.id);
    try{
        const todo = await Todo.markCompleted(request.params.id);
        return response.json("Todo updated")
    }catch(error){
        return response.status(412).json(error)
    } 
})

app.delete("/todo/:id/", async (request,response)=>{
    console.log("todo deleted",request.params.id);
    try{
        await Todo.deleteTodo(request.params.id);
        return response.json({message: "Todo deleted"})
    }catch(error){
        return response.status(412).json(error)
    }
    
})

app.listen(3000,()=>{
    console.log("Server is listening port ",3000);
    
})