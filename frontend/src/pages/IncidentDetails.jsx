import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const IncidentDetails = () => {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get(`/incidents/${id}`).then((res) => {
      setIncident(res.data.incident);
      setDescription(res.data.incident.description);
    });
  }, [id]);

  const updateDescription = async () => {
    await api.put(`/incidents/${id}/description`, {
      description,
    });
    alert("Updated");
  };

  if (!incident) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        {incident.title}
      </h1>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <button
        onClick={updateDescription}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Update Description
      </button>
    </div>
  );
};

export default IncidentDetails;
