const express = require('express');
const billModel = require('../model/bill.model');
const router = express.Router()

router.get('/', function (req, res, next) {
    res.send("Path to the Bills Page \n list -> to get all the bills \n add -> to add a partner \n remove -> delete a bill using UID")
})

router.get("/list", async function (req, res, next) {
  try {
    const document = await billModel.find();
    if (document) {
      res.send({
        status: 200,
        resultsFound: document.length,
        students: document,
      });
    } 
    else res.send({})
  } catch (e) {
    console.log(e);
  }
});

router.post("/add", async (req, res, next) => {
  let newBill = new billModel({
    uid: req.body.uid,
    created_at: new Date(0),
    credits: req.body.credits,
    duration: req.body.duration,
    execution_status: req.body.execution_status,
    flow_name: req.body.flow_name,
    flow_uid: req.body.flow_uid,
    manual_run: req.body.manual_run,
    project_uid: req.body.project_uid,
    queue: req.body.queue,
    restarted: req.body.restarted,
    tenant_uid: req.body.tenant_uid,
    trigger: req.body.trigger,
    start_time: req.body.start_time,
    stop_time: req.body.stop_time,
    type: req.body.type,
  });
  try {
    const result = await newBill.save();
    res.send(result)
  } catch (e) {
    console.log(e)
  }
  
});

router.delete('/remove', async function (req, res, next) {
  try {
    console.log("asdnbkejr")
    const uid = req.body.uid
    console.log(uid)
    const document = await billModel.deleteOne({ uid })
    res.send(document)
  }
  catch (err) {
    console.log(err)
  }
}) 

module.exports = router;