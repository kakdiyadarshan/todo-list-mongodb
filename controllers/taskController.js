
const task = require("../models/taskModel");
const storage = require("node-persist");
storage.init(/* options ... */);

// add task (admin)

exports.inserttask = async (req, res) => {
  const test = await storage.getItem('admin')
  if (test != undefined) {
    var startdate = new Date().toISOString().slice(0, 10);
    var enddate = new Date(req.body.end_date).toISOString().slice(0, 10);
    var totalday = Math.ceil((new Date(req.body.end_date) - new Date()) / (1000 * 60 * 60 * 24));

    req.body.start_date = startdate;
    req.body.end_date = enddate;
    req.body.total_day = totalday;
    req.body.status = "Pending"

    const data = await task.create(req.body);
    res.status(200).json({
      status: 200,
      message: "Task Added Successfully..!",
      data,
    });
  }
  else {
    res.status(201).json({
        status: 201,
        message: "please Admin Login !"
    })
}
};

// get task

exports.gettask = async (req, res) => {
  const test = await storage.getItem('admin')
  if (test != undefined) {
    const data = await task.find().populate("staff_id");
    res.status(200).json({
      status: 200,
      message: "Task view Successfully..!",
      data,
    });
  }
  else {
    res.status(201).json({
        status: 201,
        message: "please Admin Login !"
    })
}
};

// single Task view

exports.getonetask = async (req, res) => {
  const test = await storage.getItem('admin')
  if (test != undefined) {
    var id = req.params.id;
    const data = await task.findById(id).populate("staff_id");
    res.status(200).json({
      status: 200,
      message: "single Task view successfully",
      data,
    });
  }
  else {
    res.status(201).json({
        status: 201,
        message: "please Admin Login !"
    })
}
};
