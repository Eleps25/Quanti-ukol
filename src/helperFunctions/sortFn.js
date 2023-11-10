const sortAsc = (columnToSort, items) => {
  const sortedItems = items.toSorted((firstItem, secondItem) => {
    const columnOne = firstItem[columnToSort].toUpperCase();
    const columnTwo = secondItem[columnToSort].toUpperCase();
    if (columnOne < columnTwo) {
      return -1;
    }
    if (columnOne > columnTwo) {
      return 1;
    }
    return 0;
  });
  return sortedItems;
};

const sortDesc = (columnToSort, items) => {
  const sortedItems = items.toSorted((firstItem, secondItem) => {
    const columnOne = firstItem[columnToSort].toUpperCase();
    const columnTwo = secondItem[columnToSort].toUpperCase();
    if (columnOne < columnTwo) {
      return 1;
    }
    if (columnOne > columnTwo) {
      return -1;
    }
    return 0;
  });
  return sortedItems;
};

const sortItems = (
  items,
  setItems,
  isSorted,
  setIsSorted,
  isAscSorted,
  setIsAscSorted
) => {
  if (!isSorted) {
    setItems(sortAsc("title", items));
    setIsSorted(true);
    setIsAscSorted(true);
  } else if (isSorted && isAscSorted) {
    setItems(sortDesc("title", items));
    setIsAscSorted(false);
  } else {
    setItems(sortAsc("id", items));
    setIsSorted(false);
  }
};

export default sortItems;
