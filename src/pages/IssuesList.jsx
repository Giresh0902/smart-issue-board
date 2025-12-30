import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./IssueList.css";
import { db, auth } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const loadIssues = async () => {
    const snap = await getDocs(collection(db, "issues"));

    let list = [];
    snap.forEach((d) =>
      list.push({
        id: d.id,
        ...d.data(),
      })
    );

    // Sort by newest (createdAt timestamp)
    list.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });

    setIssues(list);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const updateStatus = async (id, oldStatus, newStatus) => {
    if (oldStatus === "Open" && newStatus === "Done") {
      alert("Cannot move from Open → Done directly");
      return;
    }

    await updateDoc(doc(db, "issues", id), { status: newStatus });
    loadIssues();
  };

  // FILTER LOGIC
  const filteredIssues = issues.filter((issue) => {
    let statusMatch =
      filterStatus === "All" || issue.status === filterStatus;
    let priorityMatch =
      filterPriority === "All" || issue.priority === filterPriority;

    return statusMatch && priorityMatch;
  });

  return (
    <>
      <Navbar email={auth.currentUser?.email} />

      <div className="container-2">
        <h1>All Issues</h1>

        {/* FILTER BUTTONS */}
        <div className="filters">
          <div>
            <label>Status: </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div>
            <label>Priority: </label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* ISSUES TABLE */}
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Change</th>
            </tr>
          </thead>

          <tbody>
            {filteredIssues.map((i) => (
              <tr key={i.id}>
                <td>{i.title}</td>
                <td>{i.priority}</td>
                <td>{i.status}</td>
                <td>{i.assignedTo}</td>

                <td>
                  <select
                    onChange={(e) =>
                      updateStatus(i.id, i.status, e.target.value)
                    }
                  >
                    <option>{i.status}</option>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/create">
          <button>Create Issue</button>
        </Link>
      </div>
    </>
  );
};

export default IssuesList;
