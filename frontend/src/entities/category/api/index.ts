export const getCategoryServerFetch = async () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};
