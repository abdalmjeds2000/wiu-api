const MemberModel = require('../../models/member_model');

module.exports = async (req, res) => {
  const { member_id } = req.query;
  try {
    const member = await MemberModel.findOne({ _id: member_id });
    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    // return success message
    return res.status(200).json({
      message: "Member retrieved successfully",
      member
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving member",
      error: error.message
    });
  }
}