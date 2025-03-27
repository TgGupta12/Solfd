import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { setSubject } from "../slices/paperSlice";
export default function HomePage() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const Subject=useSelector((state)=>state.subject.value);
  const branches = ["Computer Science", "Electronics", "IT"];
  const semesters = ["1st", "2nd", "3rd", "4th"];
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const subjectsData = {
    "Computer Science": {
      "1st": ["Applied Mathematics-1", "Applied Physics-1", "C Programming","Applied Chemistry","EVS","Communication Skills"],
      "2nd": ["Applied Mathematics-2", "Applied Physics-2"],
      "3rd": ["DBMS", "OOPS", "Computer Networks"],
      "4th": ["Operating Systems", "Web Development", "AI/ML"],
    },
    "Electronics": {
      "1st": ["Mathematics", "Physics", "Basic Circuits"],
      "2nd": ["Signals & Systems", "Electronics Devices"],
      "3rd": ["Microprocessors", "Digital Circuits"],
      "4th": ["ocsn", "Communication Systems"],
    },
  };
  const handleSubmit=async (sub)=>{
    try{
        const res=await axios.post("https://solbd.onrender.com/api/paper/fetch",{sub})
        
        dispatch(setSubject(res.data.papers));
        navigate("/Papers")

    }
    catch(err){
        console.log(err);
    }
  }
  // Handle selection change
  const handleSelection = (field, value) => {
    if (field === "branch") {
      setBranch(value);
      setSubjects([]); // Reset subjects when branch changes
    }
    if (field === "semester") {
      setSemester(value);
      if (branch && subjectsData[branch] && subjectsData[branch][value]) {
        setSubjects(subjectsData[branch][value]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Select Your Branch & Semester</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 w-80">
        {/* Branch Selection */}
        <div>
          <label className="block text-sm mb-2">Branch:</label>
          <select
            value={branch}
            onChange={(e) => handleSelection("branch", e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
          >
            <option value="">Select Branch</option>
            {branches.map((b, index) => (
              <option key={index} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Selection */}
        <div>
          <label className="block text-sm mb-2">Semester:</label>
          <select
            value={semester}
            onChange={(e) => handleSelection("semester", e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
            disabled={!branch}
          >
            <option value="">Select Semester</option>
            {semesters.map((s, index) => (
              <option key={index} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Subjects List */}
        {subjects.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mt-4">Choose Subjects:</h2>
            <ul className="mt-2 space-y-2">
              {subjects.map((subject, index) => (
                <li
                  key={index}
                  className="bg-gray-700 p-2 rounded-md border border-gray-600 hover:cursor-pointer"
                  onClick={()=>handleSubmit(subject)}
                >
                  {subject}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
