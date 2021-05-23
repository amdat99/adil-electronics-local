import React, { useRef, useState,useEffect } from "react";

function Upload({ setShowUpload, fileServer }) {
  const uploadForm = useRef();
  const [showSingle, setShowSingle] = useState(false);
  const [showMultiple, setShowMultiple] = useState(false);
  const [filePath, setFilePath] = useState('');

  useEffect(() => {
 
    setPath('')

    return () => {
   
      setTimeout(function(){ setPath('') }, 1000);
    }
  },[])

  const onMultiple = () => {
    setShowMultiple(!showMultiple);
    setShowSingle(false);
  };

  const onSingle = () => {
    setShowSingle(!showSingle);
    setShowMultiple(false);
  };

  const setPath = async (path) => {
    
    try {
      const response = await fetch(fileServer + "filepath", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filePath: path
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  console.log(fileServer);
  return (
    <div id="upload">
      <span
        onClick={() => setShowUpload(false)}
        style={{ cursor: "pointer", color: "red", marginRight: "8px" }}
      >
        x
      </span>
      <button style={{ marginRight: 10 }} onClick={onMultiple}>
        Upload multiple files
      </button>
    
      <button onClick={onSingle}>Upload 1 file</button>  
   
     
      {showMultiple ? (
        <form
          ref={uploadForm}
          id="uploadForm"
          action={fileServer + "upload"}
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" name="sampleFile" multiple />
          <input type="submit" value="Upload!" />
        </form>
      ) : null}
      {showMultiple && <span>Multiple Upload</span>}
      {showSingle ? (
        <form
          ref={uploadForm}
          id="uploadForm"
          action={fileServer + "singleupload"}
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" name="sampleFile" />
          <input type="submit" value="Upload!" />
        </form>
      ) : null}
      {showSingle && <span>Single Upload</span>}    
      <input onChange={(e)=>setFilePath(e.target.value)} placeholder={'path: '+filePath} />
      <div  className='upload-files'>      
     
      <span  onClick={()=> {setFilePath('downloads'); setPath('downloads')}}>downloads</span>
      <span  style={{marginLeft:'7px'}} onClick={()=>{setFilePath('documents'); setPath('documents')}}>documnets</span>
      <span   style={{marginLeft:'7px'}} onClick={() =>{ setFilePath('images'); setPath('images')}}>images</span>
      <span   style={{marginLeft:'7px'}} onClick={() =>{ setFilePath(''); setPath('')}}>root</span>
    {/* <  button style={{marginLeft:'10px'}} type = 'button' onClick={()=>setPath(filePath)}>set path</button>  */}
    </div>

    </div>
  );
}

export default Upload;
