// import {Express} from 'express';
import bodyParser from 'body-parser';
import express from 'express'
import { ApiService, IPerson } from './service/ServiceFactory';
import '../loadEnv';
import './server/db/connect'
import { param , body, validationResult} from 'express-validator';

const app = express();
const port = 5000

const service = new ApiService()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', (req, res) => {

  res.end(JSON.stringify({message: "you must be trying to access the '/api' route."})).status(404);
})


app.get('/api',body('name').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()) {
    const data:IPerson =  req.body
    const response = service.get(data.name)
    response.then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => {
      console.log(err)
      res.json({message: 'something went wrong this is not you'}).status(500);
    })
  }
  else{
    return res.json({message: 'please kindly provide the name you are looking for'}).status(400);
  }
})

app.put('/api/:name',param('name').notEmpty().escape(), body('name').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data:IPerson =  req.body
    const response = service.update(data, req.params?.name)
    response.then((data) => {
      return res.json(data).status(200);
    })
    .catch((err) => {
      console.log(err)
      return res.json({message: 'something went wrong this is not you'}).status(500);
    })
  }else{
    return res.json({message: 'please check the paramaters passed'}).status(400);
  }

})

app.delete('/api/:name',param('name').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()) {
    const personName = req.params?.name
  service.delete(personName).then((response) => {
    return res.json({message: 'delete successful', name:personName}).status(200);

  })
  .catch((err) => {
    console.log(err)
    return res.json({message: 'something went wrong this is not you'}).status(500);
  })
  }
  else{
    return res.json({message: 'please kindly provide the name you want to delete'}).status(400);
  }
  
})

app.post('/api', (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()) {
    const data:IPerson =  req.body
  const response = service.create(data)
  response.then((data) => {
    // console.log(data);
    return res.json(data).status(200);
  }).catch((err) => {
    console.log(err)
    return res.json({message: 'something went wrong this is not you'}).status(500);
  })
  }
  else{
    return res.json({message: 'please kindly provide the name for the person you want to create'}).status(400);
  }
  
})

app.get('*', (req, res) => {

  res.end(JSON.stringify({message: "you must be trying to access the '/api' route. Don't forget to do that and include the search params"})).status(404);
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})