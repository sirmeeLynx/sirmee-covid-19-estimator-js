const estimateInfectionSpread = (reportedCases, infectionMultiplierFactor) => {
    //challenge 1
    let currentlyInfected, infectionsByRequestedTime;
    currentlyInfected = reportedCases * 10;
    infectionsByRequestedTime = currentlyInfected * (1024); // 2^(30 % 3)
    return {currentlyInfected, infectionsByRequestedTime};
}

const covid19ImpactEstimator = (data) => {
    let { reportedCases } = data;
    let impact, severeImpact;
    //best case estimation
    impact = estimateInfectionSpread(reportedCases, 10);
    //severe case estimation
    severeImpact = estimateInfectionSpread(reportedCases, 50);
    return {
        data: data, 
        impact: impact,  
        severeImpact: severeImpact 
    }
};

export default covid19ImpactEstimator;
