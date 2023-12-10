const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

const bottles = 99; 
app.engine('madeline', (filePath, options, callback) => { // define the view engine called madeline
    fs.readFile(filePath, (err, content) => {
      if (err) return callback(err)
      // this is an extremely simple view engine we'll be more complex later
      const rendered = content.toString()
        .replace('#title#', '<title>' + options.title + '</title>')
        .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
        .replace('#url#', options.url).replace('#text#', options.text).replace('*description*', options.description)
      return callback(null, rendered)
    })
  })
app.set('views', './views') 
app.set('view engine', 'madeline') 


   app.get('/', (req, res) => {
    res.render('template', { content: bottles + ' Bottles of beer on the wall', url: '98', text: 'take one down, pass it around' })
  })


app.get('/98', (req, res) => {
     res.render('template', { content: bottles-1 + ' Bottles of beer on the wall', url: '/:numberOfBottles', text: 'take one down' })   
    
});

app.get('/:', (req, res) => {
  res.render('template', { content:  ' Zero Bottles of beer on the wall', url: '/', text: 'Start Over Again' })   
 
});

//I removed the space on template2
app.get('/:numberOfBottles', (req, res) => {
    
        if(req.params.numberOfBottles){
            
            res.render('template2', { content: req.params.numberOfBottles + ' ' + ' Bottles of beer on the wall', url:'/:numberOfBottles', text: 'take one down' }) 
        }  
  });

 

app.listen(port, () => {
    console.log('listening on port', port);
})

