import React, { useState } from "react";

function Email({ setShowEmail,dataServer }) {

  return (
    <div>
      <div className="email">
        <span
          onClick={() => setShowEmail(false)}
          style={{
            color: "red",
            cursor: "pointer",
            position: "absolute",
            left: "98%",
          }}
        >
          x
        </span>
        <form action= {dataServer+"sendemail"} method="POST" encType="multipart/form-data">

      
            <div class="form-group">
                <input style={{marginBottom:'10px'}} type="email" class="form-control" name="email" placeholder="email:" required id=""/>
            </div>
               <div className="form-group">
                <input style={{marginBottom:'10px'}} class="form-control" type="text" name="subject" required placeholder="subject:"/>
            </div>
            <div className="form-group">
                <textarea style= {{width:'80%', marginBottom:'10px'}} required class="form-control" name="body" id="" cols="30" rows="10" placeholder="Message:"></textarea>
            </div>
            <label htmlFor="attachment">Attachment:</label>
            <div className="form-group">
                <input style={{marginBottom:'10px'}}type="file"  class="form-control" name="images" multiple id=""/>
            </div>
            <div className="form-group">
                <button style={{marginBottom:'10px'}} type="submit" class="btn btn-block btn-danger">
                    Send 
                </button>
            </div>
            
        </form>
      </div>
    </div>
  );
}

export default Email;
