import { ChangeEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loadEmployeesTableAction,
  setRemoveAllEmployeesForUpdate,
} from "./employeeSlice";
import { EmpQuery, EmployeeQuery } from "./interfaces";

export default function useEmployeesTable() {
  const appDispatch = useAppDispatch();
  const { employeesResponse, updateEmployeesIds } = useAppSelector(
    (state) => state.employees
  );

  const [query, setQuery] = useState<EmpQuery>({
    filter: {},
    sort: {},
    page: 1,
    limit: 5,
  });
  useEffect(() => {
    appDispatch(loadEmployeesTableAction(query));
  }, [query]);
  const onLimitChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setQuery({
      ...query,
      limit: Number(e.target.value),
    });
    appDispatch(setRemoveAllEmployeesForUpdate());
  };
  const onPageChange = (increment: boolean) => {
    setQuery({
      ...query,
      page: increment ? query.page + 1 : query.page - 1,
    });
    appDispatch(setRemoveAllEmployeesForUpdate());
  };
  const defaultQuery: EmployeeQuery = {
    filter: {
      categoryName: "",
      departmentName: "",
      firstName: "",
      lastName: "",
      location: "",
      gender: "",
    },
    sort: {
      categoryName: "",
      departmentName: "",
      firstName: "",
      lastName: "",
      salary: "",
      location: "",
    },
    page: 1,
    limit: 5,
  };
  const [employeesQuery, setEmployeesQuery] =
    useState<EmployeeQuery>(defaultQuery);

  const onChangeFilter: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (e) => {
    const { name, value } = e.currentTarget;
    setEmployeesQuery({
      ...employeesQuery,
      filter: {
        ...employeesQuery.filter,
        [name]: value,
      },
    });
  };
  const onChangeSort: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.currentTarget;
    setEmployeesQuery({
      ...employeesQuery,
      sort: {
        ...employeesQuery.sort,
        [name]: value,
      },
    });
  };
  function generateFilters() {
    appDispatch(setRemoveAllEmployeesForUpdate());

    const filter = employeesQuery.filter;
    const queryFilter: { [key: string]: string } = {};
    const querySort: { [key: string]: string } = {};

    Object.entries(filter).forEach(([key, value]) => {
      if (value) {
        queryFilter[key] = value;
      }
    });
    const sort = employeesQuery.sort;
    Object.entries(sort).forEach(([key, value]) => {
      if (value) {
        querySort[key] = value;
      }
    });

    setQuery({
      filter: queryFilter,
      sort: querySort,
      page: 1,
      limit: employeesQuery.limit,
    });
  }
  return {
    employeesQuery,
    onChangeFilter,
    employeesResponse,
    onLimitChange,
    updateEmployeesIds,
    onChangeSort,
    generateFilters,
    onPageChange,
    query,
  };
}
