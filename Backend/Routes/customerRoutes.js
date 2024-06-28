const express = require('express');
const Case = require('../models/Addcase');
const userServices = require('../Services/userServices');
const AdminPowersAudit = require('../models/AdminPowersAudit');
const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
  const email = userServices.getLoggedInUserEmail(); // Assuming this function retrieves the user's email
    
 
   const officerId = email; // Replace with actual logic to get officerId if different from email

    const newCase = new Case({
      caseId: req.body.caseId,
      officerId: officerId,
      location: req.body.location,
      description: req.body.description,
      status: req.body.status,
    });

    const savedCase = await newCase.save();

    // Log admin action
    const auditLogs = new AdminPowersAudit({
      email: email,
      type: 'created_case',
      case_id:req.body.caseId,
    });
    await auditLogs.save();

    res.status(201).json(savedCase);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
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

    // Log admin action
    const email = userServices.getLoggedInUserEmail(); // Assuming this function retrieves the user's email
   
    const auditLogs = new AdminPowersAudit({
      email: email,
      type: 'updated_case',
      case_id: req.params.id,
    });
    await auditLogs.save();

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

    const email= userServices.getLoggedInUserEmail();
    const caseId = req.params.id;
    const { description, status } = req.body;
    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      { description, status, updatedDate: Date.now() }, // Update description, status, and updatedDate
      { new: true } // Return the updated document
    )

   
    const auditLogs = new AdminPowersAudit({
      email: email,
      type: 'updated_case',
      case_id:caseId,
    });
    await auditLogs.save();

    if (!updatedCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get('/dashboard', async (req, res) => {
  try {
    const totalCases = await Case.countDocuments();
    const solvedCases = await Case.countDocuments({ status: 'solved' });
    const pendingCases = await Case.countDocuments({ status: 'pending' });

    const casesByLocation = await Case.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 },
        },
      },
    ]);

    const cases = await Case.find();

    res.status(200).json({
      totalCases,
      solvedCases,
      pendingCases,
      casesByLocation,
      cases,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;
