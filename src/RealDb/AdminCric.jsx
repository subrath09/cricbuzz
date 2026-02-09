import React, { useEffect, useState, useRef } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { BiSolidCricketBall } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import { searchClient, writeClient } from "../algolia.js/algolia";

const db = getFirestore(app);

function AdminCric() {
  const navigate = useNavigate();
  const fetchedOnce = useRef(false);

  const [pageLoading, setPageLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const [matches, setMatches] = useState([
    {
      matchBetween: "",
      team1: { name: "", runs: "", wickets: "", overs: "" },
      team2: { name: "", runs: "", wickets: "", overs: "" },
      docId: null,
    },
  ]);

  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchMatches = async () => {
      setPageLoading(true);

      const snapshot = await getDocs(collection(db, "cricbuzz"));

      const loadedMatches = snapshot.docs.map((d) => ({
        docId: d.id,
        matchBetween: d.data().matchBetween || "",
        team1: {
          name: d.data().team1?.name || "",
          runs: d.data().team1?.runs || "",
          wickets: d.data().team1?.wickets || "",
          overs: d.data().team1?.overs || "",
        },
        team2: {
          name: d.data().team2?.name || "",
          runs: d.data().team2?.runs || "",
          wickets: d.data().team2?.wickets || "",
          overs: d.data().team2?.overs || "",
        },
      }));

      setMatches(
        loadedMatches.length > 0
          ? loadedMatches
          : [
              {
                matchBetween: "",
                team1: { name: "", runs: "", wickets: "", overs: "" },
                team2: { name: "", runs: "", wickets: "", overs: "" },
                docId: null,
              },
            ],
      );

      setPageLoading(false);
    };

    fetchMatches();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...matches];
    updated[index][field] = value;
    setMatches(updated);
  };

  const handleTeamChange = (index, team, field, value) => {
    const updated = [...matches];
    updated[index][team][field] = value;
    setMatches(updated);
  };

  const addMatchInputs = () => {
    setMatches([
      ...matches,
      {
        matchBetween: "",
        team1: { name: "", runs: "", wickets: "", overs: "" },
        team2: { name: "", runs: "", wickets: "", overs: "" },
        docId: null,
      },
    ]);
  };

const handleDelete = async (index) => {
  try {
    setDeleteLoading(index);

    const match = matches[index];
    if (match.docId)
      await deleteDoc(doc(db, "cricbuzz", match.docId));

    const matchIndex = writeClient.initIndex("matches");
    await matchIndex.deleteObject(match.docId);

    setMatches((prev) => prev.filter((_, i) => i !== index));

    setDeleteLoading(null);
  } catch (error) {
    console.log(error);
    alert(error.message);
    setDeleteLoading(null);
  }
};

const addOrUpdateScore = async (index) => {
  try {
    const match = matches[index];

    if (
      !match.matchBetween ||
      !match.team1.name ||
      !match.team2.name ||
      !match.team1.runs ||
      !match.team2.runs ||
      !match.team1.wickets ||
      !match.team2.wickets ||
      !match.team1.overs ||
      !match.team2.overs
    ) {
      return alert("Enter All Fields");
    }

    setBtnLoading(index);

    const matchIndex = writeClient.initIndex("matches");

    const data = {
      matchBetween: match.matchBetween,
      team1: match.team1,
      team2: match.team2,
      updatedAt: new Date(),
    };

    if (!match.docId) {
      data.createdAt = new Date();

      const docRef = await addDoc(collection(db, "cricbuzz"), data);

      await matchIndex.saveObject({
        objectID: docRef.id,
        ...data,
      });

      const updated = [...matches];
      updated[index].docId = docRef.id;
      setMatches(updated);

      alert("Match Added Successfully");
    } else {
      await updateDoc(doc(db, "cricbuzz", match.docId), data);

      await matchIndex.saveObject({
        objectID: match.docId,
        ...data,
      });

      alert("Match Updated Successfully");
    }

    setBtnLoading(null);
  } catch (error) {
    alert(error + "");
    console.log(error);
    setBtnLoading(null);
  }
};


  return (
    <div className="bg-gray-200 min-h-screen pt-8 max-lg:pt-0">
      <div className="mx-8  pb-8 max-lg:mx-0 ">
        {/* HEADER */}
        <div className="bg-[#00916f]  text-white py-4 px-6 grid grid-cols-3 items-center shadow max-lg:px-0 max-lg:text-center">
          <div></div>

          <div className="flex justify-center items-center gap-2 text-4xl font-bold max-lg:text-3xl">
            cricBuzz Admin
            <BiSolidCricketBall className="animate-bounce shadow-xl rounded-full max-lg:hidden" />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/cricbuzz")}
              className="text-sm border-2 shadow-xl rounded-full font-bold px-4 py-2 hover:bg-green-700 max-lg:px-2 max-lg:py-1 "
            >
              Go To App ?
            </button>
          </div>
        </div>

        {/* PAGE LOADER */}
        {pageLoading && (
          <div className="flex justify-center mt-20">
            <div className="w-12 h-12 border-4 border-[#00916f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!pageLoading &&
          matches.map((match, index) => (
            <div key={index} className="bg-white mt-8 p-6 rounded shadow">
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={match.matchBetween}
                  onChange={(e) =>
                    handleChange(index, "matchBetween", e.target.value)
                  }
                  placeholder="Match Name"
                  className="border-2 border-gray-300 px-2 py-1 rounded w-80"
                />

                <button
                  onClick={() => handleDelete(index)}
                  disabled={deleteLoading === index}
                  className="bg-red-700 text-white font-bold px-5 py-2 rounded flex gap-2 items-center max-lg:px-2 max-lg:py-1"
                >
                  {deleteLoading === index && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  Delete Match
                </button>
              </div>

              <p className="mt-6 font-bold">Team 1</p>
              <input
                type="text"
                placeholder="Team 1 Name"
                value={match.team1.name}
                onChange={(e) =>
                  handleTeamChange(index, "team1", "name", e.target.value)
                }
                className="border-2 border-gray-300 my-2 px-2 py-1 rounded uppercase"
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Runs"
                  value={match.team1.runs}
                  onChange={(e) =>
                    handleTeamChange(index, "team1", "runs", e.target.value)
                  }
                  className="border-2 border-gray-300 w-1/4 px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Wickets"
                  value={match.team1.wickets}
                  onChange={(e) =>
                    handleTeamChange(index, "team1", "wickets", e.target.value)
                  }
                  className="border-2 border-gray-300 w-1/4 px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Overs"
                  value={match.team1.overs}
                  onChange={(e) =>
                    handleTeamChange(index, "team1", "overs", e.target.value)
                  }
                  className="border-2 border-gray-300 w-1/4 px-2 py-1 rounded"
                />
              </div>

              <p className="mt-6 font-bold">Team 2</p>
              <input
                type="text"
                placeholder="Team 2 Name"
                value={match.team2.name}
                onChange={(e) =>
                  handleTeamChange(index, "team2", "name", e.target.value)
                }
                className="border-2 border-gray-300 my-2 px-2 py-1 rounded uppercase"
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Runs"
                  value={match.team2.runs}
                  onChange={(e) =>
                    handleTeamChange(index, "team2", "runs", e.target.value)
                  }
                  className="border-2 border-gray-300 w-1/4 px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Wickets"
                  value={match.team2.wickets}
                  onChange={(e) =>
                    handleTeamChange(index, "team2", "wickets", e.target.value)
                  }
                  className="border-2 border-gray-300 w-1/4 px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="Overs"
                  value={match.team2.overs}
                  onChange={(e) =>
                    handleTeamChange(index, "team2", "overs", e.target.value)
                  }
                  className="border-2 border-gray-300 w-1/4 px-2 py-1 rounded"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => addOrUpdateScore(index)}
                  disabled={btnLoading === index}
                  className={`mt-6 px-6 py-3 rounded text-white font-bold flex gap-2 items-center ${
                    match.docId ? "bg-blue-700" : "bg-[#00916f]"
                  }`}
                >
                  {btnLoading === index && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {match.docId ? "Update Score" : "Add Score"}
                </button>
              </div>
            </div>
          ))}

        {!pageLoading && (
          <button
            onClick={addMatchInputs}
            className="bg-black text-white font-bold px-6 py-4 rounded-xl mt-10 block mx-auto"
          >
            Add Match
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminCric;
