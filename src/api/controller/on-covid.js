const covid19ImpactEstimator = require('../../estimator');

exports.covid19estimator = (req, res) => {
    const data = req.body;
    const response = covid19ImpactEstimator(data);

    return res.status(200).json({ response, message: "Ok" });
};

exports.logger = (req, res) => {
    let logs = fs.readFileSync(logFilePath,'utf8');
    return res.status(200).send(logs);
};