const WorkerModel = require('../../models/worker_model');

module.exports = async (req, res) => {
  const { worker_id } = req.query;
  try {
    const worker = await WorkerModel.findOne({ _id: worker_id });
    if (!worker) {
      return res.status(404).json({
        message: "Worker not found"
      });
    }

    // return success message
    return res.status(200).json({
      message: "Worker retrieved successfully",
      worker
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving worker",
      error: error.message
    });
  }
}