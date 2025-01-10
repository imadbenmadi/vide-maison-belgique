const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Refresh_tokens } = require("../Models/RefreshTokens");
const { Admins } = require("../Models/Admin");

const verifyAdmin = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken || !refreshToken) {
        if (accessToken)
            res.clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
        if (refreshToken)
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });

        return res
            .status(401)
            .json({ message: "Unauthorized: No tokens found" });
    }

    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.ADMIN_ACCESS_TOKEN_SECRET
        );
        if (decoded.userType !== "Admin") {
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid user type" });
        }

        const admin = await Admins.findOne({ where: { id: decoded.userId } });
        if (!admin) {
            return res
                .status(401)
                .json({ message: "Unauthorized: Admin not found" });
        }

        req.decoded = decoded;
        return next();
    } catch (err) {
        if (err.name !== "TokenExpiredError") {
            console.error("Access token error:", err);
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid access token" });
        }

        // Handle token refresh
        try {
            const foundInDB = await Refresh_tokens.findOne({
                where: { token: refreshToken },
            });
            if (!foundInDB) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Invalid refresh token" });
            }

            const decodedRefresh = jwt.verify(
                refreshToken,
                process.env.ADMIN_REFRESH_TOKEN_SECRET
            );
            if (
                foundInDB.userId !== decodedRefresh.userId ||
                decodedRefresh.userType !== "Admin"
            ) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Refresh token mismatch" });
            }

            const newAccessToken = jwt.sign(
                {
                    userId: decodedRefresh.userId,
                    userType: decodedRefresh.userType,
                },
                process.env.ADMIN_ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
            );

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true,
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            req.decoded = decodedRefresh;
            return next();
        } catch (refreshErr) {
            console.error("Refresh token error:", refreshErr);
            return res
                .status(401)
                .json({ message: "Unauthorized: Refresh token invalid" });
        }
    }
};

module.exports = verifyAdmin;
