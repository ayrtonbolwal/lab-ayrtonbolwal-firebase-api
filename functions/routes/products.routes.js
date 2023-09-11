/* eslint-disable*/
const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/api/products", async (req, res) => {
  try {
    await db
      .collection("products")
      .doc("/" + req.body.id + "/")
      .create({ name: req.body.name });
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/api/products/:product_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("products").doc(req.params.product_id);
      const item = await doc.get();
      const nameProduct = item.data();
      return res.status(200).json(nameProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

router.get("/api/products", async (req, res) => {
  try {
    const query = db.collection("products");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.delete("/api/products/:product_id", async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.product_id);
    await document.delete();
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
});

router.put("/api/products/:product_id", async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.product_id);
    await document.update({
      name: req.body.name,
    });
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json();
  }
});

module.exports = router;
