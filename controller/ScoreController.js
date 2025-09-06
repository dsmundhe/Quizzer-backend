const { ScoreStoreModel } = require("../schema/ScoreStore");
const { UserModel } = require('../schema/UserSchema');

const addScore = async (req, res) => {
    const { topic, score, email } = req.body;
    try {
        if (!topic || !score || !email) {
            res.json({ msg: "Provide Data!" });
            return;
        }
        const isUserPresent = await UserModel.findOne({ email });

        if (!isUserPresent) {
            res.json({ msg: "User  not found!" });
            return;
        }
        await ScoreStoreModel.create({ topic, email, score })
        res.json({
            msg: "Score Stored", score: {
                topic, email, score
            }
        })
    } catch (error) {
        res.json({ msg: error.message });
    }
}

const getScores = async (req, res) => {
    const { email } = req.query;
    try {
        if (!email) {
            res.json({ msg: "Provide Email!" });
            return;
        }
        const data = await ScoreStoreModel.find({ email: email.trim().toLowerCase() });

        res.json({ msg: "Successful", data })

    } catch (error) {

    }
}

module.exports = { addScore,getScores };