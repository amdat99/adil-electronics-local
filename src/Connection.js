import React, { useState } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectDataServer,
  selectFileServer,
} from "./redux/user/user.selectors";
import { setDataServer, setFileServer } from "./redux/user/user.actions";

function Connection({
  setShowConnections,
  setDataServer,
  setFileServer,
  fileServer,
  dataServer,
}) {
  const [onFileServer, setOnFileServer] = useState("");
  const [onDataServer, setOnDataServer] = useState("");

  const submitDataServer = () => {
    if (!dataServer) {
      return;
    }
    setDataServer(onDataServer);
  };

  const submitFileServer = () => {
    if (!fileServer) {
      return;
    }
    setFileServer(onFileServer);
  };

  console.log(onDataServer, onFileServer);
  return (
    <div>
      <div className="email">
        <span
          onClick={() => setShowConnections(false)}
          style={{
            color: "red",
            cursor: "pointer",
            position: "absolute",
            left: "97%",
          }}
        >
          x
        </span>
        <form>
          <span>Data Server route is: {dataServer}</span>
          <input
            className="sign-on-input"
            type="text"
            name="data server"
            placeholder="Set data server"
            onChange={(e) => setOnDataServer(e.target.value)}
            label="dataserver input"
          />
          <span>File Server route is: {fileServer}</span>
          <input
            className="sign-on-input"
            type="text"
            name="fileserver"
            placeholder="set fileserver"
            onChange={(e) => setOnFileServer(e.target.value)}
            label="file server input "
          />

          <button onClick={submitDataServer} type="button">
            Set Data Server
          </button>
          <button onClick={submitFileServer} type="button">
            Set File Server
          </button>
          <p>URL must end with: /</p>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataServer: selectDataServer,
  fileServer: selectFileServer,
});

const mapDispatchToProps = (dispatch) => ({
  setDataServer: (server) => dispatch(setDataServer(server)),
  setFileServer: (server) => dispatch(setFileServer(server)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
