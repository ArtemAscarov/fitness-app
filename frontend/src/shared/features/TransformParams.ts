export const transformParams = (params: URLSearchParams | null) => {
  if (!params) return {};
  const obj = Object.fromEntries(params.entries());
  return obj;
};
