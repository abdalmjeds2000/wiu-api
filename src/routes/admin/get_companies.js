const CompanyModel = require('../../models/company_model');
const MemberModel = require('../../models/member_model');
const WorkerModel = require('../../models/worker_model');


module.exports = async (req, res) => {
  // request should be like this: /admin/companies?start=0&length=10&search=company_name&order=asc&sort=company_name
  // start: items to skip
  // length: items per page
  // search: search query
  // order: asc or desc
  // sort: sort by which field
  const { start, length, search, order, sort, draw } = req.query;
  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { guid: { $regex: search, $options: 'i' } },
      { address: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }
  const sortQuery = {};
  if (sort && order) {
    sortQuery[sort] = order === 'asc' ? 1 : -1;
  }
  const companies = await CompanyModel.find(query).sort(sortQuery).skip(parseInt(start)).limit(parseInt(length));

  // get all members and workers for each company
  let companiesWrapper = [];
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    const members = await MemberModel.find({ company_id: company.guid });
    const workers = await WorkerModel.find({ company_id: company.guid });
    const newCompany = {
      ...company._doc,
      members,
      workers
    };
    companiesWrapper.push(newCompany);
  }

  // limit request based on draw value, if draw get to 20, then it will return message to user to refresh the page
  if (parseInt(draw) >= 100) {
    return res.status(500).json({
      message: "You reached the limit, please refresh the page"
    });
  }

  // get total number of companies
  const totalCompanies = await CompanyModel.countDocuments();
  // get total number of companies after search
  const totalCompaniesAfterSearch = companies.length;

  // return success message
  return res.status(200).json({
    message: "Companies retrieved successfully",
    draw,
    data: companiesWrapper,
    totalCount: totalCompanies,
    totalFiltered: totalCompaniesAfterSearch,
    fieldsAbleToSort: [
      "guid",
      "name",
      "type",
      "governorate",
      "phone",
      "license_number",
      "brand",
      "status",
    ],
  });
}