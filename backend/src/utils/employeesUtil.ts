import { Request } from "express";
export const getEmployeeQuery = (req: Request) => {
  let queryFilter =
    typeof req.query.filter !== "object" ? {} : req.query.filter;
  const filter: { [type: string]: object } = {};
  Object.entries(queryFilter).forEach(([key, value]) => {
    const field: string = typeof key === "string" ? key : "";
    const query: string = typeof value === "string" ? value : "";
    if (field && query) {
      filter[field] = { $regex: query, $options: "i" };
    }
  });
  const page =
    typeof req.query.page === "string" && !isNaN(Number(req.query.page))
      ? Number(req.query.page)
      : 1;
  const limit =
    typeof req.query.limit === "string" && !isNaN(Number(req.query.limit))
      ? Number(req.query.limit)
      : 5;
  const sort = typeof req.query.sort === "object" ? req.query.sort : {};
  return { sort, page, limit, filter };
};
