import React,{useRef,useState} from 'react';

function Upload() {

    const uploadForm =useRef()
    const [showSingle, setShowSingle] = useState(false)
    const [showMultiple, setShowMultiple] = useState(false)

    const onMultiple = () => {
        setShowMultiple(!showMultiple)
        setShowSingle(false)
    }

    const onSingle = () => {
        setShowSingle(!showSingle)
        setShowMultiple(false)
    }
    return (
        <div id="upload">
            <button style={{ marginRight:10}} onClick={onMultiple}>Upload multiple files</button>
            <button onClick={onSingle}>Upload 1 file</button>
            { showMultiple?
        
        <form ref={uploadForm}
       
      id='uploadForm' 
      action='http://localhost:8000/upload' 
      method='post' 
      encType="multipart/form-data">
        <input type="file" name="sampleFile"  multiple/>
        <input type='submit' value='Upload!' />
    </form>  
    
:null}
{showMultiple && <span>Multiple Upload</span>}
{showSingle?
        <form ref={uploadForm}
       
        id='uploadForm' 
        action='http://localhost:8000/singleupload' 
        method='post' 
        encType="multipart/form-data">
          <input type="file" name="sampleFile"  />
          <input type='submit' value='Upload!' />
      </form>  

:null}
{showSingle && <span>Single Upload</span>}

        </div>
    );
}

export default Upload;