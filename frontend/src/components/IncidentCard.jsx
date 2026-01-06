import { useNavigate } from "react-router-dom";
import api from "../services/api";

const IncidentCard = ({ incident, refresh }) => {
  const navigate = useNavigate();

  const updateStatus = async (e) => {
    e.stopPropagation(); // prevent opening details page

    const newStatus =
      incident.status === "open" ? "resolved" : "open";

    await api.put(`/incidents/${incident._id}/status`, {
      status: newStatus,
    });

    refresh();
  };

  return (
    <div
      onClick={() => navigate(`/incidents/${incident._id}`)}
      className="bg-white p-5 rounded-lg shadow cursor-pointer hover:shadow-md transition flex justify-between items-center"
    >
      <div>
        <h3 className="text-lg font-semibold">{incident.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {incident.description}
        </p>
        <p className="text-sm mt-2 capitalize">
          {incident.severity} | {incident.status}
        </p>
      </div>

      <button
        onClick={updateStatus}
        className="px-3 py-2 text-sm bg-blue-500 text-white rounded"
      >
        Mark {incident.status === "open" ? "Resolved" : "Open"}
      </button>
    </div>
  );
};

export default IncidentCard;
