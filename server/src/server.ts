import express from 'express'

const app = express();

app.get('/ads', (req, res) => {
  return res.json([
    {id: 1, name: 'Ad One'},
    {id: 2, name: 'Ad Two'},
    {id: 3, name: 'Ad Three'},
    {id: 4, name: 'Ad Four'}  


  ]);
})

app.listen(3001, () => {
  console.log('Server listening to 3001 🚀');
})