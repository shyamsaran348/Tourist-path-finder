import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import ForceGraph2D from "react-force-graph-2d";
import "./App.css";

// Landmarks (nodes)
const landmarks = [
  "Museum",
  "Library",
  "Park",
  "Theater",
  "Cafe",
  "Mall",
  "Station",
];

// Graph connections (edges)
const edges = [
  ["Museum", "Library"],
  ["Museum", "Park"],
  ["Library", "Theater"],
  ["Park", "Cafe"],
  ["Theater", "Mall"],
  ["Cafe", "Station"],
  ["Mall", "Station"],
];

// Fixed node positions (to make map stable)
const nodePositions = {
  Museum: { x: 100, y: 200 },
  Library: { x: 250, y: 250 },
  Park: { x: 100, y: 50 },
  Theater: { x: 400, y: 300 },
  Cafe: { x: 200, y: 100 },
  Mall: { x: 500, y: 200 },
  Station: { x: 300, y: 150 },
};

// Convert to ForceGraph format
const nodes = landmarks.map((name) => ({ id: name, ...nodePositions[name] }));
const links = edges.map(([src, tgt]) => ({ source: src, target: tgt }));

export default function App() {
  const [start, setStart] = useState("Museum");
  const [goal, setGoal] = useState("Mall");
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Create a ref for the graph component
  const graphRef = useRef();

  const fetchPath = useCallback(async () => {
    setLoading(true);
    setError("");
    setPath([]);
    try {
      const res = await axios.post("http://127.0.0.1:5000/find-path", {
        start,
        goal,
      });
      if (res.data.path && res.data.path.length > 0) {
        setPath(res.data.path);
      } else {
        setError("No path found between these landmarks.");
      }
    } catch (err) {
      setError("An error occurred while finding the path. Please check landmark names.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [start, goal]);

  useEffect(() => {
    fetchPath();
  }, [fetchPath]);

  // Use a separate useEffect to handle the graph centering on mount and path change
  useEffect(() => {
    if (graphRef.current) {
      // Use the library's zoomToFit method for centering
      // The second argument is a zoom padding, adjust as needed
      graphRef.current.zoomToFit(0, 50); 
    }
  }, [path]); // Rerun this effect whenever the path is updated

  return (
    <div className="app-container">
      <h1 className="app-title">
        🗺️ Tourist Landmark Path Finder
      </h1>

      <div className="controls-container">
        <div className="dropdown-group">
          <label className="label">Start:</label>
          <select
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="dropdown"
          >
            {landmarks.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>

        <div className="dropdown-group">
          <label className="label">Destination:</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="dropdown"
          >
            {landmarks.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="path-display">
        {loading && <p className="status-text loading-text">Finding path...</p>}
        {error && <p className="status-text error-text">{error}</p>}
        {!loading && !error && path.length > 0 ? (
          <>
            <h2 className="path-title">📍 Shortest Path:</h2>
            <p className="path-text">{path.join(" → ")}</p>
          </>
        ) : (
          !loading && !error && <p className="status-text">Select landmarks to find a path.</p>
        )}
      </div>

      <div className="graph-container">
        <ForceGraph2D
          ref={graphRef} // Assign the ref to the graph component
          graphData={{ nodes, links }}
          nodeLabel="id"
          nodeAutoColorBy="id"
          linkColor={(link) =>
            path.includes(link.source.id) && path.includes(link.target.id)
              ? "#e74c3c"
              : "rgba(0,0,0,0.1)"
          }
          linkWidth={(link) =>
            path.includes(link.source.id) && path.includes(link.target.id)
              ? 3
              : 1
          }
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 14 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;

            // Draw a circle for the node
            ctx.fillStyle = path.includes(node.id) ? "#e74c3c" : "#3498db";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
            ctx.fill();

            // Draw the text label
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#333";
            ctx.fillText(label, node.x, node.y - 15);
          }}
          cooldownTicks={0}
        />
      </div>
    </div>
  );
}