const create = async (body) => {
  try {
    const { email, password, name, role } = req.body;
    console.log("Email", isEmailGood(email));
    let account = await AdminAccount.findOne({
      $or: [
        {
          email: email,
        },
        {
          mobile: mobile,
        },
      ],
    });
    if (account) {
      res.code(303);
      res.send({ msg: "User Already Exists" });
      return;
    }
    account = await AdminAccount.create(req.body);
    let cdata = {
      id: account._id,
      firstname: account.firstname,
      lastname: account.lastname,
    };
    const accessToken = await generateToken(cdata);
    console.log(accessToken);
    let data = {
      ...cdata,
      otp_verified: false,
      temp_otp: 911,
      accessToken,
    };
    res.status(200);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send({ msg: error });
  }
};

const emailLogin = async (body) => {
  try {
    const { email, password } = req.body;
    if (!isEmailGood(email)) {
      return errorResponse(res, 400, { msg: "Should be a work mail id" });
    }
    let account = await AdminAccount.findOne({
      email,
      status: true,
    });

    if (account) {
      const result = await compareHash(password, account.password);
      if (!result) {
        return errorResponse(res, 400, { msg: "Invalid Credentials." });
      }

      let cdata = {
        id: account._id,
        firstname: account.firstname,
        lastname: account.lastname,
      };
      const accessToken = jwt.sign(cdata, "11RAG");

      let data = {
        ...cdata,
        temp_otp: 911,
        accessToken,
      };
      return successResponse(res, 200, data);
    } else {
      return errorResponse(res, 404, { msg: "User not found." });
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, 400, { msg: error });
    throw error;
  }
};

module.exports = {
  create,
  emailLogin,
};
