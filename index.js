require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const MongoDB = require("./MongoDB.js");
const db = new MongoDB("invoices");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/invoices/:id", async (req, res) => {
  try {
    await db.init();
    const id = req.params.id;
    const invoice = await db.findById("invoices", id);
    res.send(invoice);
  } catch (e) {
    console.log(e);
  }
});

app.get("/invoices", async (req, res) => {
  try {
    await db.init();
    const invoices = await db.findAll("invoices");
    res.send(invoices);
  } catch (e) {
    console.log(e);
  }
});

app.post("/invoices", async (req, res) => {
  try {
    await db.init();
    console.log(req.body);
    const response = await db.create("invoices", req.body);
    res.send(response);
  } catch (e) {
    console.log(e);
  }
});

app.patch("/invoices/:id", async (req, res) => {
  try {
    await db.init();
    const id = req.params.id;
    const invoice = await db.updateStatus("invoices", id);
    res.send(invoice);
  } catch (e) {
    console.log(e);
  }
});

app.put("/invoices/:id", async (req, res) => {
  try {
    await db.init();
    const id = req.params.id;
    const newData = req.body;
    const invoice = await db.updateInvoice("invoices", id, newData);
    res.send(invoice);
  } catch (e) {
    console.log(e);
  }
});

app.delete("/invoices/:id", async (req, res) => {
  try {
    await db.init();
    const id = req.params.id;
    const response = await db.deleteById("invoices", id);
    res.send(response.data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT);
