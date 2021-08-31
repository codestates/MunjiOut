const crypto = require("crypto");
const db = require("../../models");
const { generateAccessToken, generateRefreshToken, isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  // console.log('++++++++++++\n', req.body);
  const accessTokenData = isAuthorized(req);
  // console.log(req.headers);

  // 이미 로그인 중인 상태에서 다시 로그인을 시도하는 경우
  if (accessTokenData) {
    return res.status(403).json({ message: "you are already logged in" });
  }

  const { email, password } = req.body;
  // 이메일, 비밀번호 중 하나라도 입력하지 않았을 경우
  if (!email || !password) {
    return res.status(417).send({ message: "please fill in all the required fields." });
  }

  try {
    const isUser = await db.User.findOne({
      where: { email: req.body.email },
    });

    // 가입된 유저가 아닐 경우
    if (!isUser) { 
        return res.status(404).send({ message: "invalid user" });
    } else {
        const dbPassword = isUser.password;
        const salt = isUser.salt;
        let hashedPassword = crypto
          .pbkdf2Sync(password, salt, 9999, 64, "sha512")
          .toString("base64");
        if (hashedPassword !== dbPassword) {
          return res.status(400).json({ message: "please check your password and try again" });
        } else {
          const accessToken = generateAccessToken(isUser.dataValues);
          const refreshToken = generateRefreshToken(isUser.dataValues);
          const cookieOptions = {
            httpOnly: true,
            sameSite: "None",
            // secure: true,
          };

          res.cookie("accessToken", accessToken, cookieOptions);
          res.cookie("refreshToken", refreshToken, cookieOptions);
          // console.log(req.headers.cookie);
          return res.status(200).json({ accessToken, refreshToken, message: "logged in successfully" });
        }
      }
  } catch (err) {
    console.error(err);
  }
};