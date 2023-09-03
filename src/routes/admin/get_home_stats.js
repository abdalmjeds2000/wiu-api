const CompanyModel = require('../../models/company_model');
const MemberModel = require('../../models/member_model');
const WorkerModel = require('../../models/worker_model');


module.exports = async (req, res) => {
  // get total number of companies
  const totalCompanies = await CompanyModel.countDocuments();
  // get total number of active companies
  const totalActiveCompanies = await CompanyModel.countDocuments({ status: true });
  const totalUnactiveCompanies = await CompanyModel.countDocuments({ status: false });
  // get total number of members
  const totalMembers = await MemberModel.countDocuments();
  // get total number of workers
  const totalWorkers = await WorkerModel.countDocuments();

  const stats = [
    {
      Count: totalCompanies,
      label: "عدد الشركات",
      description: `فعال: ${totalActiveCompanies}, غير فعال: ${totalUnactiveCompanies}`,
      color: "sky-500"
    },{
      Count: totalMembers,
      label: "عدد الأعضاء",
      description: null,
      color: "violet-500"
    },{
      Count: totalWorkers,
      label: "عدد العمال",
      description: null,
      color: "teal-500"
    }
  ];


  // return success message
  return res.status(200).json({
    message: "Success",
    data: stats,
  });
}