require("dotenv/config");
require("./db");
const express = require("express");

const app = express();

require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes");
app.use("/api", allRoutes);



//👇 Mounting routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes/project.routes"));
app.use("/api", require("./routes/task.routes"));



require("./error-handling")(app);

module.exports = app;
