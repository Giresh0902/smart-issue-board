import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./IssueList.css";
import { db, auth } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const IssuesList = () => {
  const [issues, setIssues] = useState([]);

  const loadIssues = async () => {
    const snap = await getDocs(collection(db, "issues"));
    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    setIssues(list);
  };

  useEffect(() => {
  const fetchIssues = async () => {
    const snap = await getDocs(collection(db, "issues"));
    const list = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() }));
    setIssues(list); 
  };

  fetchIssues();
}, []);
const IssuesList = () => {
  console.log("IssuesList Loaded");

}


  const updateStatus = async (id, oldStatus, newStatus) => {

    if (oldStatus === "Open" && newStatus === "Done") {
      alert("Cannot move from Open → Done directly");
      return;
    }

    await updateDoc(doc(db, "issues", id), { status: newStatus });
    loadIssues();
  };

  return (
    <>
      <Navbar email={auth.currentUser.email} />

      <div className="container-2">
        <h1>All Issues</h1>
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
            {issues.map((i) => (
              <tr key={i.id}>
                <td>{i.title}</td>
                <td>{i.priority}</td>
                <td>{i.status}</td>
                <td>{i.assignedTo}</td>
                <td>
                  <select
                    onChange={(e)=>
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
