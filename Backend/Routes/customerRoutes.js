const express = require('express');
const Case = require('../models/Addcase');
const userServices = require('../Services/userServices');

const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    const email = 'vikash@gmail.com'; // Call the function to get the email
    const officerId = email; // Replace with actual logic to get officerId if different from email

    const newCase = new Case({
      caseId: req.body.caseId,
      officerId: officerId,
      location: req.body.location,
      description: req.body.description,
      status: req.body.status,
      
    });

    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





router.get('/cases', async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a case
router.put('/cases/:id', async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          description: req.body.description,
          status: req.body.status,
          updatedDate: Date.now(),
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/cases/:id', async (req, res) => {
  try {
    const caseId = req.params.id;
    const caseDetails = await Case.findById(caseId);
    if (!caseDetails) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(caseDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// PUT update case by ID
router.put('/:id', async (req, res) => {
  try {
    const caseId = req.params.id;
    const { description, status } = req.body;
    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      { description, status, updatedDate: Date.now() }, // Update description, status, and updatedDate
      { new: true } // Return the updated document
    );
    if (!updatedCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
