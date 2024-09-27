
const parseIntFilter = (unknow) => {
if(typeof unknow !== 'string')return;
const parsedInt = parseInt(unknow);
if(Number.isNaN(parsedInt))return;
return parsedInt;
};

const parseFloatFilter = (unknow) => {
    if(typeof unknow !== 'string')return;
    const parsedFload = parseFloatFilter(unknow);
    if(Number.isNaN(parsedFload))return;
    return parsedFload;
    };

const parseGender = (unknow) => {
    if(['male', 'female', 'other'].includes(unknow)) return unknow;
    return;
    };

const parseOnDuty = (unknow) => {
  if (!['true', 'false'].includes(unknow)) return;
  return unknow === 'true' ? true : false;
};

export const parseFilters = (query) => {
  return {
    minAge: parseIntFilter(query.minAge),
    maxAge: parseIntFilter(query.maxAge),
    minAvgMark: parseFloatFilter(query.minAvgMark),
    maxAvgMark: parseFloatFilter(query.maxAvgMark),
    gender: parseGender(query.gender),
    onDuty: parseOnDuty(query.onDuty),
  };
};
