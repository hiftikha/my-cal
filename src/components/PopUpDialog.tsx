import React, { useState } from "react";
import "../styling/PopUpDialog.css";

interface Props {
  onViewClick: () => void;
}

const PopUpDialog: React.FC<Props> = ({ onViewClick }) => {
  const [isOpen, setIsOpen] = useState(false); // connect dialog to booking a slot
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [metadata, setMetadata] = useState("");

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Metadata:", metadata);

    closeDialog();
  };

  return (
    <div>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h2>Enter Details</h2>
            <div className="input-row">
              <label>Name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Metadata: </label>
              <textarea
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
              />
            </div>
            <div className="button-row">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={closeDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpDialog;
