const { server } = require("./index");

const port = process.env.PORT || 3003;

// strat server
server.listen(port);
console.log("Express started. Listening on %s", port);
