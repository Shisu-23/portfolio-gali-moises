const router = require("express").Router();
const Contact = require("../models/Contact");

// ✅ SEND MESSAGE
router.post("/", async (req, res) => {
  try {
    const msg = await Contact.create(req.body);
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message" });
  }
});

// ✅ GET ALL MESSAGES
router.get("/", async (req, res) => {
  const msgs = await Contact.find().sort({ createdAt: -1 });
  res.json(msgs);
});

// ✅ MARK AS READ
router.put("/:id/read", async (req, res) => {
  const msg = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true },
  );
  res.json(msg);
});

// ✅ DELETE MESSAGE
router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
