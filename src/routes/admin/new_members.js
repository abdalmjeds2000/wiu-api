const MemberModel = require('../../models/member_model');

module.exports = async (req, res) => {
  // recieve list of members from the request body, data = [{full_name, id_number, dob, address, phone_number, licensed_operator_number, attachments, companyId}]
  const { members } = req.body;

  // loop on members and add each member to the database using the MemberModel
  for (let i = 0; i < members.length; i++) {
    const member = new MemberModel({
      company_id: members[i].company_id,
      full_name: members[i].full_name,
      id_number: members[i].id_number,
      dob: members[i].dob,
      address: members[i].address,
      phone_number: members[i].phone_number,
      licensed_operator_number: members[i].licensed_operator_number,
      is_responsible_member: members[i].is_responsible_member,
      attachments: members[i].attachments
    });
    await member.save();
  }

  // return success message
  return res.status(200).json({
    message: "Members added successfully"
  });
}