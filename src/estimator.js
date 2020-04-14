const normalizeDuration = (periodType, duration) => {
    const converter = {
        days : (d) => d,
        weeks: (w) => w * 7,
        months:(m) => m * 30
    }

    return converter[periodType](duration);
}

const estimateInfectionSpread = (data, infectionMultiplierFactor) => {
  // challenge 1
  const { reportedCases, timeToElapse, periodType } = data;
  const durationInDays = normalizeDuration(periodType, timeToElapse);
  const infectionDoublingFactor = Math.floor(durationInDays / 3);
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
