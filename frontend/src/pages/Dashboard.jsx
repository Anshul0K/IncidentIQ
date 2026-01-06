import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import IncidentCard from "../components/IncidentCard";
import IncidentFilters from "../components/IncidentFilters";

const Dashboard = () => {
  const navigate = useNavigate();

  const [myIncidents, setMyIncidents] = useState([]);
  const [allIncidents, setAllIncidents] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    severity: "",
  });

  const [showAll, setShowAll] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "low",
  });

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // fetch incidents
  const fetchIncidents = async () => {
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.severity) params.severity = filters.severity;

    const myRes = await api.get("/incidents", { params });
    setMyIncidents(myRes.data.incidents);

    if (showAll) {
      const allRes = await api.get("/incidents", {
        params: { ...params, all: true },
      });
      setAllIncidents(allRes.data.incidents);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [filters, showAll]);

  // create incident
  const handleCreateIncident = async (e) => {
    e.preventDefault();
    await api.post("/incidents", formData);
    setFormData({ title: "", description: "", severity: "low" });
    setIsModalOpen(false);
    fetchIncidents();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">IncidentIQ</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Create Incident
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-10">
        <IncidentFilters filters={filters} setFilters={setFilters} />

        {/* Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 border rounded"
          >
            {showAll ? "View My Incidents" : "View All Incidents"}
          </button>
        </div>

        {/* My Incidents */}
        {!showAll && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              My Incidents
            </h2>
            <div className="grid gap-4">
              {myIncidents.map((incident) => (
                <IncidentCard
                  key={incident._id}
                  incident={incident}
                  refresh={fetchIncidents}
                />
              ))}
            </div>
          </>
        )}

        {/* All Incidents */}
        {showAll && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              All Incidents
            </h2>
            <div className="grid gap-4">
              {allIncidents.map((incident) => (
                <IncidentCard
                  key={incident._id}
                  incident={incident}
                  refresh={fetchIncidents}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Create Incident Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[420px]">
            <h3 className="text-xl font-semibold mb-4">
              Create Incident
            </h3>

            <form onSubmit={handleCreateIncident} className="space-y-4">
              <input
                placeholder="Title"
                className="w-full border p-2"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                className="w-full border p-2"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

              <select
                className="w-full border p-2"
                value={formData.severity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    severity: e.target.value,
                  })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
