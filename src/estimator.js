const estimateInfectionSpread = (data, infectionMultiplierFactor) => {
  // challenge 1
  const { reportedCases, timeElapsed } = data;
  const infectionDoublingFactor = Math.floor(timeElapsed / 3);
  const currentlyInfected = reportedCases * infectionMultiplierFactor;
  const infectionsByRequestedTime = currentlyInfected * (2 ** infectionDoublingFactor);
  return { currentlyInfected, infectionsByRequestedTime };
};

const covid19ImpactEstimator = (data) => {
  // best case estimation
  const impact = estimateInfectionSpread(data, 10);
  // severe case estimation
  const severeImpact = estimateInfectionSpread(data, 50);
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
