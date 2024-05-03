import { useSelector } from "react-redux";
import { NoData } from "../../NoData";
import { Input } from "../../Input";
import { Button } from "../../Button";
import { useEffect, useState } from "react";

export const CompaniesAdmin = () => {
  const companies = useSelector((state) => state.static.companies);
  const [query, setQuery] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    if (companies) {
      if (query && query.length) {
        setFilteredData(() =>
          companies.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        setFilteredData(companies);
      }
    }
  }, [companies, query]);

  const addNewCompany = () => {};

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Input
          className=""
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={addNewCompany} className={"!rounded-md"}>
          Add Company
        </Button>
      </div>
      <div style={{ height: "80vh", overflowY: "auto" }}>
        {filteredData && filteredData.length ? (
          <>
            {filteredData.map((company) => (
              <div
                key={company.id}
                className="flex gap-2 border border-gray-400 my-1 rounded px-2 py-1"
              >
                <div>{company.id}</div>
                <div>{company.name}</div>
              </div>
            ))}
          </>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};
