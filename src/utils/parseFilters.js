const parseIntFilter = (unknown) => {
    if (typeof unknown !== 'string') return;
    const parsedInt = parseInt(unknown);
    if (Number.isNaN(parsedInt)) return;
    return parsedInt;
  };

  const parseFloatFilter = (unknown) => {
    if (typeof unknown !== 'string') return;
    const parsedFloat = parseFloat(unknown);
    if (Number.isNaN(parsedFloat)) return;
    return parsedFloat;
  };

  const parseGender = (unknown) => {
    if (['male', 'female', 'other'].includes(unknown)) return unknown;
    return;
  };

  const parseOnDuty = (unknown) => {
    if (!['true', 'false'].includes(unknown)) return;
    return unknown === 'true';
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
