const CompanyModel = require('../../models/company_model');


function padWithLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}


module.exports = async (req, res) => {
  // recieve data from the request body, data = {name, membership, type, membership_number, authorized_name, workers_number, address, governorate, phone, license_number, brand, production_type, cr_files, il_files, ml_files }
  const { name, membership, type, membership_number, authorized_name, workers_number, address, governorate, phone, license_number, brand, production_type, status, cr_files, il_files, ml_files } = req.body;
  
  // generate company id "year - month - count of companies"
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const count = await CompanyModel.countDocuments();
  const countwithzeros = padWithLeadingZeros(count, 6);
  const companyId = `${year}-${month}-#${countwithzeros}`;


  // add new company to the using the CompanyModel
  const company = new CompanyModel({
    guid: companyId,
    name,
    membership,
    type,
    membership_number,
    authorized_name,
    workers_number,
    address,
    governorate,
    phone,
    license_number,
    brand,
    production_type,
    status,
    cr_files,
    il_files,
    ml_files
  });

  // save the company to the database
  await company.save();

  // return success message
  return res.status(200).json({
    message: "Company added successfully",
    data: company
  });
}