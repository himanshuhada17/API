const express = require('express')
const server = express()

const PORT = process.env.PORT || 5000
const cars =[
    {
        "id" : 1, 
        "name" : 'fronx',  
        "brand" : 'maruti suzuki',
        "price" : 698000, 
        "fuel_type" : 'petrol', 
        "transmission" : 'automatic', 
        "imageUrl" : "https://tse2.mm.bing.net/th?id=OIP.aNjP8C9EB_Us4JkgcjfxugHaEK&pid=Api&P=0&h=180" , 
    },
    {
        "id" : 2, 
        "name" : 'venue',  
        "brand" : 'hyundai',
        "price" : 788000, 
        "fuel_type" : 'diesel', 
        "transmission" : 'manual', 
        "imageUrl" : "https://tse3.mm.bing.net/th?id=OIP.bjYCP3c8u6OakzN9X03GeQHaEK&pid=Api&P=0&h=180" , 
    }
]
server.use(express.json())
// get all objects(get)
server.get('/cars',function(req, res){
    res.send(cars)
})
// get object by id(get)
server.get('/cars/:Id', function (req, res) {
  const foundcar = cars.find(t => t.id.toString() === req.params.Id)

  if (foundcar) {
    res.send(foundcar)
  } else {
    res.status(404).send('Not Found')
  }
})
// creating a object on server(post)
server.post('/cars', function (req, res) {
    const newcar = req.body
  
    newcar.id = Math.random()
  
    cars.push(newcar)
  
    res.status(201).send('Test')
  })
//   delete a object from server by id(delete)
  server.delete('/cars/:id', function (req, res) {
    const foundcarindex = cars.findIndex(t => t.id.toString() === req.params.id)
  
    if (foundcarindex > -1) {
      cars.splice(foundcarindex, 1)
      res.send('Deleted')
    } else {
      res.status(404).send('Not found')
    }
  })
// update by particular id(patch)
server.patch('/cars/:id', function (req, res) {
    const id = req.params.id
    const data = req.body
  
    const foundcarindex = cars.findIndex(t => t.id.toString() === id)

    if (foundcarindex > -1) {
      const old = cars[foundcarindex]
      cars[foundcarindex] = {
        ...old,
        ...data
      }
      res.send('Updated')
    } else {
      res.status(404).send('Not found')
    }
  })
  

server.listen(PORT)


