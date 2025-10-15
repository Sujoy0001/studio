import React, { useEffect, useState } from "react";
import {
  getTeamData,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../data/TeamService";

export default function AdminTeamPage() {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    skills: "",
    email: "",
    linkedin: "",
    github: "",
    portfolio: "",
    facebook: "",
    instagram: "",
    x: "",
    discord: "",
    img: "",
    urlName: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch members
  useEffect(() => {
    fetchTeam();
  }, []);

  async function fetchTeam() {
    const data = await getTeamData();
    setTeam(data);
  }

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberData = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    if (editingId) {
      await updateTeamMember(editingId, memberData);
      setEditingId(null);
    } else {
      await addTeamMember(memberData);
    }

    setFormData({
      name: "",
      role: "",
      description: "",
      skills: "",
      email: "",
      linkedin: "",
      github: "",
      portfolio: "",
      facebook: "",
      instagram: "",
      x: "",
      discord: "",
      img: "",
      urlName: "",
    });

    fetchTeam();
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      ...member,
      skills: member.skills?.join(", ") || "",
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this member?")) {
      await deleteTeamMember(id);
      fetchTeam();
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛠️ Team Admin Panel
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          {editingId ? "Update Member" : "Add Member"}
        </button>
      </form>

      {/* List */}
      <div className="grid grid-cols-1 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="p-4 border rounded-xl shadow-sm flex justify-between items-start bg-gray-50"
          >
            <div>
              <h2 className="font-semibold text-lg">{member.name}</h2>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="mt-2 text-gray-600 text-sm">{member.description}</p>
              <p className="text-xs mt-2">
                <strong>Skills:</strong> {member.skills?.join(", ")}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
