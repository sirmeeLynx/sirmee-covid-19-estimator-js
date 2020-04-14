const normalizeDuration = (periodType, duration) => {
  const converter = {
    days: (d) => d,
    weeks: (w) => w * 7,
    months: (m) => m * 30
  };

  return converter[periodType](duration);
};

const estimateICUVentilatorDIF = (data, infectionsByRequestedTime) => {
  // challenge 3
  // estimate ICU, Ventilators and Dollars in Flight
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;
  const casesForICUByRequestedTime = 0.05 * infectionsByRequestedTime;
  const casesForVentilatorsByRequestedTime = 0.02 * infectionsByRequestedTime;
  const durationInDays = normalizeDuration(data.periodType, data.timeToElapse);
  const avgEarnings = avgDailyIncomeInUSD * durationInDays;
  const dif = (infectionsByRequestedTime * avgDailyIncomePopulation) * avgEarnings;
  const dollarsInFlight = dif;
  // Math.floor(dif);
  return { casesForICUByRequestedTime, casesForVentilatorsByRequestedTime, dollarsInFlight };
};

const estimateSevereHospitableCases = (data, infectionsByRequestedTime) => {
  // challenge 2
  const { totalHospitalBeds } = data;
  const availableBeds = totalHospitalBeds - Math.floor(totalHospitalBeds * 0.65);
  const severeCasesByRequestedTime = Math.floor(0.15 * infectionsByRequestedTime);
  const hospitalBedsByRequestedTime = availableBeds - severeCasesByRequestedTime;
  return { severeCasesByRequestedTime, hospitalBedsByRequestedTime };
};

const estimateInfectionSpread = (data, infectionMultiplierFactor) => {
  // challenge 1
  const { reportedCases, timeToElapse, periodType } = data;
  const durationInDays = normalizeDuration(periodType, timeToElapse);
  const infectionDoublingFactor = Math.floor(durationInDays / 3);
  const currentlyInfected = reportedCases * infectionMultiplierFactor;
  const infectionsByRequestedTime = currentlyInfected * (2 ** infectionDoublingFactor);
  return { currentlyInfected, infectionsByRequestedTime };
};

const estimatorChallenges = (data, infectionMultiplierFactor) => {
  const ch1 = estimateInfectionSpread(data, infectionMultiplierFactor);
  const ch2 = estimateSevereHospitableCases(data, ch1.infectionsByRequestedTime);
  const ch3 = estimateICUVentilatorDIF(data, ch1.infectionsByRequestedTime);
  return { ...ch1, ...ch2, ...ch3 };
};

const covid19ImpactEstimator = (data) => {
  // best case estimation
  const impact = estimatorChallenges(data, 10);
  // severe case estimation
  const severeImpact = estimatorChallenges(data, 50);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
