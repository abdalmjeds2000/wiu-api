const WorkerModel = require('../../models/worker_model');

module.exports = async (req, res) => {
  // recieve list of workers from the request body, data = [{full_name, id_number, phone_number, social_status, job_title, has_certificate, address, gender, attachments, companyId}]
  const { workers } = req.body;

  
  // loop on workers and add each member to the database using the WorkerModel
  for (let i = 0; i < workers.length; i++) {
    const worker = new WorkerModel({
      company_id: workers[i].company_id,
      full_name: workers[i].full_name,
      id_number: workers[i].id_number,
      phone_number: workers[i].phone_number,
      social_status: workers[i].social_status,
      job_title: workers[i].job_title,
      has_certificate: workers[i].has_certificate,
      address: workers[i].address,
      gender: workers[i].gender,
      attachments: workers[i].attachments,
    });
    await worker.save();
  }

  // return success message
  return res.status(200).json({
    message: "Workers added successfully"
  });
}