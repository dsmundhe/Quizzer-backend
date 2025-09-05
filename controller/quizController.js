const { QuizApis } = require('../schema/QuizeApiSchema');

// ================= VALIDATION FUNCTION =================
const validateQuiz = (testApis) => {
    if (!Array.isArray(testApis)) return "testApis must be an array";
    if (testApis.length !== 30) return "Quiz must contain exactly 30 questions";

    for (const q of testApis) {
        if (
            !q.question ||
            !Array.isArray(q.options) ||
            q.options.length !== 4 ||
            !q.answer ||
            !q.options.includes(q.answer)
        ) {
            return "Each question must have text, exactly 4 options, and a valid answer";
        }
    }
    return null;
};

// ================= ADD QUIZ =================
const addQuiz = async (req, res) => {
    const { email, title, topic, testApis } = req.body;

    try {
        if (!email || !title || !topic || !testApis) {
            return res.status(400).json({ msg: 'All fields are required: email, title, topic, testApis' });
        }

        const error = validateQuiz(testApis);
        if (error) return res.status(400).json({ msg: error });

        const newQuiz = await QuizApis.create({ email, title, topic, testApis });
        return res.status(201).json({ msg: 'Quiz added successfully', quiz: newQuiz });
    } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

// ================= GET ALL QUIZZES =================
const getQuizzes = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ msg: "Email is required to fetch quizzes" });
    }

    try {
        // Ensure exact match, trimmed and lowercase for consistency
        const quizzes = await QuizApis.find({
            email: email.trim().toLowerCase()
        });
        return res.status(200).json({ quizzes });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
};


// ================= UPDATE QUIZ =================
const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const { title, topic, testApis } = req.body;

    try {
        const updateData = {};
        if (title) updateData.title = title;
        if (topic) updateData.topic = topic;
        if (testApis) {
            const error = validateQuiz(testApis);
            if (error) return res.status(400).json({ msg: error });
            updateData.testApis = testApis;
        }

        const updatedQuiz = await QuizApis.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedQuiz) return res.status(404).json({ msg: 'Quiz not found' });

        return res.status(200).json({ msg: 'Quiz updated', quiz: updatedQuiz });
    } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

// ================= DELETE QUIZ =================
const deleteQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedQuiz = await QuizApis.findByIdAndDelete(id);
        if (!deletedQuiz) return res.status(404).json({ msg: 'Quiz not found' });

        return res.status(200).json({ msg: 'Quiz deleted successfully' });
    } catch (error) {
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

module.exports = { addQuiz, getQuizzes, updateQuiz, deleteQuiz };
