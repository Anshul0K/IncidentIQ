const IncidentFilters = ({ filters, setFilters }) => {
  return (
    <div className="flex gap-4 mb-6">
      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
        className="border px-3 py-2 rounded"
      >
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="resolved">Resolved</option>
      </select>

      <select
        value={filters.severity}
        onChange={(e) =>
          setFilters({ ...filters, severity: e.target.value })
        }
        className="border px-3 py-2 rounded"
      >
        <option value="">All Severity</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default IncidentFilters;
