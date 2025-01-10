export const getCarPathname = (carName: string) => {
  return `/${carName.toLowerCase().replace(/ /g, '-')}`;
};

export const camelCaseToFormatted = (input: string) => {
  return input
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};

export const chunkArrayByIndexes = <T>(array: T[], indexes: number[]) => {
  const result = [];
  let previousIndex = 0;

  indexes.forEach((index) => {
    if (index < previousIndex || index > array.length) {
      throw new Error('Indexes must be in ascending order and within bounds');
    }
    result.push(array.slice(previousIndex, index));
    previousIndex = index;
  });

  result.push(array.slice(previousIndex));

  return result;
};
