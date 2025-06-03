import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const CampaignCreation = () => {
  const [name, setName] = useState("");
  const [rules, setRules] = useState([]);
  const [audienceSize, setAudienceSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const fieldOptions = [
    { value: "spend", label: "Spend" },
    { value: "visits", label: "Visits" },
  ];

  const operatorOptions = [
    { value: ">", label: ">" },
    { value: "<", label: "<" },
    { value: "=", label: "=" },
  ];

  const addRule = () => {
    setRules([...rules, { field: "", operator: "", value: "" }]);
  };

  const updateRule = (index, key, value) => {
    const updatedRules = [...rules];
    updatedRules[index][key] = value;
    setRules(updatedRules);
  };

  const previewAudience = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5001/api/segments/preview",
        { rules }
      );
      setAudienceSize(response.data.audienceSize);
    } catch (error) {
      console.error("Error previewing audience:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSegment = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5001/api/segments", {
        name,
        rules,
        audienceSize,
      });
      alert("Segment saved successfully!");
    } catch (error) {
      console.error("Error saving segment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Campaign</h1>
      <div>
        <label>Segment Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter segment name"
        />
      </div>
      <div>
        <h3>Rules</h3>
        {rules.map((rule, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
          >
            <Select
              options={fieldOptions}
              placeholder="Field"
              onChange={(selected) =>
                updateRule(index, "field", selected.value)
              }
            />
            <Select
              options={operatorOptions}
              placeholder="Operator"
              onChange={(selected) =>
                updateRule(index, "operator", selected.value)
              }
            />
            <input
              type="number"
              placeholder="Value"
              onChange={(e) => updateRule(index, "value", e.target.value)}
            />
          </div>
        ))}
        <button onClick={addRule}>Add Rule</button>
      </div>
      <div>
        <button onClick={previewAudience} disabled={loading}>
          {loading ? "Loading..." : "Preview Audience"}
        </button>
        {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
      </div>
      <div>
        <button
          onClick={saveSegment}
          disabled={loading || !name || rules.length === 0}
        >
          {loading ? "Saving..." : "Save Segment"}
        </button>
      </div>
    </div>
  );
};

export default CampaignCreation;
