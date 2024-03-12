import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Display = ({
  data,
  handleEditClick = () => {},
  handleDeleteClick = () => {},
  visitMode = false,
}) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);

  return (
    <div className="px-2 relative pb-3 flex justify-between items-start">
      <div>
        <div
          className="border-l-2 border-gray-200 absolute"
          style={{ height: "100%", top: 10, left: -2 }}
        />
        <div
          className="text-gray-300 absolute"
          style={{ fontSize: 30, top: -11, left: -5 }}
        >
          &middot;
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <div>{professions.find((prf) => prf.id === data.role)?.name}</div>
        </div>
        <div className="text-sm font-medium">
          {companies &&
            companies.length &&
            companies.filter(
              (company) => company.id === parseInt(data.companyId)
            )[0]?.name}
          {", "}
          {data.country}
        </div>
      </div>
      {!visitMode ? (
        <div className="flex gap-2 text-xs">
          <div
            className="cursor-pointer"
            onClick={() => handleEditClick(data.id)}
          >
            <FontAwesomeIcon icon={faEdit} className="text-gray-400" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleDeleteClick(data.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="text-gray-400" />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
