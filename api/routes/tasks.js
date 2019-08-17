const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const notFound = require('../middleware/not-found')

let db = []
let sequence = 0

router.post('/', checkAuth, (request, response) => {
  const newTask = {
    id: sequence++,
    done: request.body.done || false,
    description: request.body.description
  }

  db[newTask.id] = newTask

  response.status(201).json(newTask);
});

router.get('/', (request, response) => {

  const toArray = key => db[key]
  const tasks = Object.keys(db).map(toArray)
  tasks.length
    ?response.json(tasks)
    :response.status(204).send()

 //response.status(200).json(db);
});

router.get('/:taskId', checkAuth, (request, response) => {
  const id = request.params.taskId;
  const task = db[id]

  task
  ? response.json(task)
  : notFound(request, response)
  
  //if(task === undefined) response.status(404).json({message: "Not found. Invalid given ID"})

  // response.status(200).json(task);
});

router.patch('/:taskId', checkAuth, (request, response) => {
  const id = request.params.taskId;
  const task = db[id]

  task
    ? updateTask(request, response, task)
    : notFound(request, response)

  response.status(204).send();
});

function updateTask(request, response, task){
  if(request.body.description != undefined) task.description = request.body.description
  if(request.body.done != undefined) task.done = request.body.done

  response.status(204).send();
}

router.delete('/:taskId', checkAuth, (request, response) => {
  const id = request.params.taskId;
  const task = db[id]

  task
    ? deleteTask(request, response, task)
    : notFound(request, response)
});

function deleteTask(request, response, task){
  delete db[task.id]
  response.status(204).send();
}

module.exports = router;