import express from "express";
const path = require('path')

const PORT=process.env.port ?? 4443

const app = express();

// Serves the frontend dist code
app.use(express.static('dist', {index: 'index.html'}))

// Fallback route for 404s - this will enable client side routing to work
// with refreshes, but we need to make a 404 page on the client
// app.use('*', express.static('dist', {index: 'index.html'}));


// PUT OTHER ROUTES HERE


/* final catch-all route to index.html defined last */
// app.get('/*', express.static('dist', {index: 'index.html'}))
/* GET React App */
app.get('*', function(req, res, next) {
  console.log('here')
  res.sendFile(path.join(__dirname, '../../dist/'));
 });

// Start the node server
app.listen(PORT, ()=> {
  console.log(`started on port ${PORT}`)
})