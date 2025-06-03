import React, { useEffect, useState } from "react";
import axios from "axios";

const CampaignHistory = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/segments");
        setSegments(response.data);
      } catch (error) {
        console.error("Error fetching segments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSegments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Campaign History</h1>
      {segments.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Audience Size</th>
              <th>Rules</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment) => (
              <tr key={segment._id}>
                <td>{segment.name}</td>
                <td>{segment.audienceSize}</td>
                <td>
                  {segment.rules.map((rule, index) => (
                    <div key={index}>
                      {rule.field} {rule.operator} {rule.value}
                    </div>
                  ))}
                </td>
                <td>{new Date(segment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignHistory;
