import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db, auth } from "../firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./createissue.css";

const CreateIssue = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assigned, setAssigned] = useState("");
  const [similar, setSimilar] = useState([]);

  const navigate = useNavigate();

  // --- Fetch Similar Issues ---
  useEffect(() => {
    const fetchSimilar = async () => {
      if (title.length < 3) return setSimilar([]);

      const ref = collection(db, "issues");
      const q = query(ref, where("title", ">=", title));

      const snap = await getDocs(q);
      const list = [];

      snap.forEach((doc) => {
        const data = doc.data();
        if (data.title.toLowerCase().includes(title.toLowerCase())) {
          list.push(data.title);
        }
      });

      setSimilar(list);
    };

    fetchSimilar();
  }, [title]);

  // --- Create Issue Handler ---
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title || !desc) {
      alert("Title and Description are required.");
      return;
    }

    await addDoc(collection(db, "issues"), {
      title,
      description: desc,
      priority,
      status,
      assignedTo: assigned,
      createdBy: auth.currentUser.email,
      createdTime: serverTimestamp(),
    });

    navigate("/issues");
  };

  return (
    <>
      <Navbar email={auth.currentUser.email} />

      <div className="container-1">
        <h1>Create Issue</h1>

        <form onSubmit={handleCreate}>
          
          {/* Title */}
          <input 
            placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />

          {/* Similar Issues */}
          {similar.length > 0 && (
            <div className="similar-box">
              <p>Similar issues found:</p>
              {similar.map((s, i) => (
                <p key={i}>• {s}</p>
              ))}
            </div>
          )}

          {/* Description */}
          <textarea 
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)} 
          />

          {/* Priority */}
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          {/* Status */}
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          {/* Assigned */}
          <input 
            placeholder="Assigned To (optional)" 
            value={assigned}
            onChange={(e) => setAssigned(e.target.value)} 
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateIssue;
