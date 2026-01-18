const express = require("express");
const app = express();

app.use(express.json());
app.use("/products", require("./routes/products.routes"));
app.use("/orders", require("./routes/orders.routes"));
app.use("/analytics", require("./routes/analytics.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));