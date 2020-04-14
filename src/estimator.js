const normalizeDuration = (periodType, duration) => {
  const converter = {
    days: (d) => d,
    weeks: (w) => w * 7,
    months: (m) => m * 30
  };

  return converter[periodType](duration);
};

const estimateSevereHospitableCases = (data, infectionsByRequestedTime) => {
  // challenge 2
  const { totalHospitalBeds } = data;
  const availableBeds = totalHospitalBeds - Math.floor(totalHospitalBeds * 0.65);
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
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

const covid19ImpactEstimator = (data) => {
  // best case estimation
  let impact = estimateInfectionSpread(data, 10);
  let ch2 = estimateSevereHospitableCases(data, impact.infectionsByRequestedTime);
  impact = { ...impact, ...ch2 };
  // severe case estimation
  let severeImpact = estimateInfectionSpread(data, 50);
  ch2 = estimateSevereHospitableCases(data, severeImpact.infectionsByRequestedTime);
  severeImpact = { ...severeImpact, ...ch2 };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
