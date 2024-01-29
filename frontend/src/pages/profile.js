import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../services/authNetwork";
import { useAppContext, useAppContextUpdater } from "../services/GlobalContext";
import { useNavigate } from "react-router";
import Candidateskiils from "./candidateskiils";

const Profile = () => {
  // const [file, setFile] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { state } = useAppContext();
  const { setState } = useAppContextUpdater();
  const { role } = state.user || {};
  const [userDetails, setUserDetails] = useState({});

  const loadProfile = async () => {
    const { user } = state;

    let { _id } = state.user || {};
    if (!user) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      _id = localUser._id;
    }

    const res = await getUserProfile(_id);
    setUserDetails(res);
    setIsInitialized(true);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div>
      {isInitialized ? (
        <TemplateProfile role={role} user={userDetails} />
      ) : (
        <>Profile is loading ...</>
      )}
    </div>
  );
};

const AdminProfile = ({ user }) => {
  return (
    <div className="signin-form">
      <form>
        <h2>Administrator Name</h2>
        <h4>{user.username}</h4>
      </form>
    </div>
  );
};

const EmployerProfile = ({ user }) => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    ...user,
  });
  const handleInputChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUserProfile(userForm._id, userForm);
    alert("Your Profile is updated");
    navigate("/");
  };
  const navigatetomypage = () => {
    navigate("/employer/jobs");
  };
  return (
    <div className="signin-form">
      <div>
        <button onClick={navigatetomypage}>Go Back Your Page</button>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Employer Profile</h3>
        <input
          type="text"
          name="username"
          value={userForm.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={userForm.email}
          onChange={handleInputChange}
        />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

const CandidateProfile = ({ user }) => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    ...user,
    newSkill: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userForm.username);
    formData.append("skills", userForm.skills);
    formData.append("resume", userForm.resume);
    formData.append("filename", userForm.resume.name);
    formData.append("user_id", userForm._id);
    const res = await updateUserProfile(userForm._id, formData);
    alert("success");
    navigate("/");
  };

  const handleInputChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleAddSkill = () => {
    setUserForm({
      ...userForm,
      skills: [...userForm.skills, userForm.newSkill],
      newSkill: "",
    });
  };

  const handleFileChange = (e) => {
    console.log(e);
    const file = e.target.files[0];
    console.log(file);
    setUserForm({ ...userForm, resume: file });
  };
  const viewMyApplications = () => {
    navigate("/AppliedJobs");
  };

  const handleSkillChange = (e) => {
    setUserForm({ ...userForm, newSkill: e.target.value });
  };
  const handleEditSkill = (index) => {
    const updatedSkills = [...userForm.skills];
    const editedSkill = prompt("Edit skill:", updatedSkills[index]);
    if (editedSkill !== null) {
      updatedSkills[index] = editedSkill;
      setUserForm({ ...userForm, skills: updatedSkills });
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...userForm.skills];
    updatedSkills.splice(index, 1);
    setUserForm({ ...userForm, skills: updatedSkills });
  };

  return (
    <div className="profile-form">
      <div style={{ position: "absolute", top: "100px", left: "0px" }}>
        <button onClick={viewMyApplications} className="admin-button">
          Check Applications Status
        </button>
      </div>

      <form onSubmit={handleSubmit} className="my-form">
        <input
          type="text"
          name="username"
          value={userForm.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={userForm.email}
          onChange={handleInputChange}
        />
        <input type="file" name="resume" onChange={handleFileChange} />
        <div className="skills-section ">
          <Candidateskiils
            newSkill={userForm.newSkill}
            skills={userForm.skills}
            onSkillChange={handleSkillChange}
            onAddSkill={handleAddSkill}
            onEditSkill={handleEditSkill}
            onDeleteSkill={handleDeleteSkill}
          />
        </div>

        {/* {userForm.resume.filename && <>{userForm.resume.filename}</>} */}
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

const TemplateProfile = ({ role, user }) => {
  switch (role) {
    case "candidate":
      return CandidateProfile({ user });
    case "admin":
      return AdminProfile({ user });
    case "employer":
      return EmployerProfile({ user });
    default:
      return EmployerProfile({ user });
  }
};

export default Profile;
