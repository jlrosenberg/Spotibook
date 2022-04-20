import express from "express";

const PORT=process.env.port ?? 4443

const app = express();

// Serves the frontend dist code
app.use(express.static('dist', {index: 'index.html'}))

// Fallback route for 404s - this will enable client side routing to work
// with refreshes, but we need to make a 404 page on the client
app.get("*", function (req, res) {
  console.log('here')
    res.sendFile(__dirname + '/dist/index.html')
});

// Start the node server
app.listen(PORT, ()=> {
  console.log(`started on port ${PORT}`)
})