export const transformExerciseParam = (filters: Record<string, string>) => {
  const search = new URLSearchParams();
  // console.log(filters, 'transformExerciseParamFn: filters');

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "" || value === "" || value === null || value === undefined) {
      return;
    }

    if (key === "category") {
      const categories = new Set(value.split(","));

      // console.log(categories, "transformExerciseParamFn: categories");

      categories.forEach((_, i) => {
        if (i === "") return;
        search.append(key, i);
      });
    } else {
      search.set(key, value);
    }
  });

  return search;
};
