const express = require("express");
const app = express();
const PORT = process.env.PORT || 4567;

app.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});