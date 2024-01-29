import React from "react";

const Candidateskiils = ({
  newSkill,
  skills,
  onSkillChange,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
}) => {
  return (
    <div>
      <div>
        <h4>Skills</h4>
        <input name="newSkill" value={newSkill} onChange={onSkillChange} />
        <button type="button" onClick={onAddSkill}>
          Enter
        </button>
        {skills.map((skill, index) => (
          <div key={index}>
            {skill}
            <button type="button" onClick={() => onEditSkill(index)}>
              Edit
            </button>
            <button type="button" onClick={() => onDeleteSkill(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidateskiils;
