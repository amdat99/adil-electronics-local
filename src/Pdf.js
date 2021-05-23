import React, { useState } from "react";

function Pdf({ setShowPdf }) {
  const [onPdf, setOnPdf] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [showPdf, onShowPdf] = useState(true);
  const [back, onBack] = useState(false);
  

  const handleFiles = (e) => {
    e.preventDefault();
    setOnPdf(e.target.files[0]);
  };
  return (
    <div id="upload">
      <span
        style={{ cursor: "pointer", color: "red" }}
        onClick={() => setShowPdf(false)}
      >
        x
      </span>
      <input
        onChange={(e) => setOnPdf(e.target.value)}
        placeholder="enter file url"
      />

      <button onClick={() => setPdf(onPdf)}> set file </button>

      <div className="pdf-container" id={back? 'file-back' : null}>
        {showPdf ? (
          <button onClick={() => onShowPdf(!showPdf)}>Hide file</button>
        ) : (
          <button onClick={() => onShowPdf(!showPdf)}>Show file</button>
        )}
        <button style={{marginLeft:'5px'}} onClick={() => onBack(!back)}>Toggle Background</button>

        <object
          id={showPdf ? null : "hide"}
          data={pdf}
         
          type="application/pdf"
          width="100%"
          height="100%"
        ></object>
      </div>
    </div>
  );
}

export default Pdf;
