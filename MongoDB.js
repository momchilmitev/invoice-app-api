const { MongoClient, ObjectId } = require("mongodb");

module.exports = class {
  constructor(dbName) {
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async init() {
    const client = new MongoClient(`${process.env.MONGO_DB_URI}`);
    await client.connect();
    this.client = client;
    this.db = client.db(this.dbName);
  }

  async create(collection, document) {
    const result = await this.db.collection(collection).insertOne(document);
    this.client.close();
    return result;
  }

  async createMany(collection, documents) {
    const result = await this.db.collection(collection).insertMany(documents);
    this.client.close();
    return result;
  }

  async findById(collection, id) {
    const result = await this.db
      .collection(collection)
      .findOne({ _id: ObjectId(id) });
    this.client.close();
    return result;
  }

  async findAll(collection) {
    const cursor = await this.db.collection(collection).find({});
    const result = await cursor.toArray();
    this.client.close();
    return result;
  }

  async updateStatus(collection, id) {
    const result = await this.db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: { status: "paid" } });
    console.log(result);
    this.client.close();
    return result;
  }

  async updateInvoice(collection, id, data) {
    console.log(data);
    const result = await this.db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data });
    // console.log(result);
    this.client.close();
    return result;
  }

  async deleteById(collection, id) {
    const result = await this.db
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });
    this.client.close();
    return result;
  }
};

// async function updateInvoiceById(client, id, updatedInvoice) {
//   const result = await client
//     .db('invoices')
//     .collection('invoices')
//     .updateOne({ _id: ObjectId(id) }, { $set: updatedInvoice });
//   // console.log(result.modifiedCount);
//   // console.log(result.matchedCount);
// }

// async function deleteInvoiceById(client, id) {
//   const result = await client
//     .db('invoices')
//     .collection('invoices')
//     .deleteOne({ _id: ObjectId(id) });
//   // console.log(result.deletedCount);
// }
