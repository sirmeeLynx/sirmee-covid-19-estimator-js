const estimateInfectionSpread = (reportedCases, infectionMultiplierFactor) => {
  // challenge 1
  const currentlyInfected = reportedCases * infectionMultiplierFactor;
  const infectionsByRequestedTime = currentlyInfected * (1024); // 2^(30 % 3)
  return { currentlyInfected, infectionsByRequestedTime };
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;
  // let impact, severeImpact;
  // best case estimation
  const impact = estimateInfectionSpread(reportedCases, 10);
  // severe case estimation
  const severeImpact = estimateInfectionSpread(reportedCases, 50);
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
