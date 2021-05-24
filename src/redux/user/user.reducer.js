import userActionTypes from "./user.types";

 const addTable= (currentTables, tableToAdd) => {
  return [...currentTables, {...tableToAdd}];
};

 const setCurrentTable = (tables, id) => {
  const currentTable = tables.find(table => table.id === id);

  return [currentTable];
};

const INITIAL_STATE = {
  pending: false,
  currentUser: null,
  error: null,
  onFetch: false,
  dataServer: "http://localhost:7500/",
  fileServer: "http://localhost:8000/",
  tables: [],
  localTable: []
};

export const dataServer = INITIAL_STATE.dataServer;

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_UP_START:
    case userActionTypes.EMAIL_SIGNIN_PENDING:
    case userActionTypes.GOOGLE_SIGNIN_PENDING:
    case userActionTypes.ADD_PRODUCT_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case userActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case userActionTypes.SIGNOUT_PENDING:
      return {
        ...state,
        currentUser: null,
        pending: false,
        error: null,
      };
    case userActionTypes.ADD_PRODUCT_SUCCESS:
      return {
        pending: false,
        error: null,
      };
    case userActionTypes.ONFETCH:
      return {
        ...state,
        pending: false,
        error: null,
        onFetch: !state.onFetch,
      };
    case userActionTypes.FILE_SERVER: {
      return {
        ...state,
        fileServer: action.payload,
      };
    }
    case userActionTypes.DATA_SERVER: {
      return {
        ...state,
        dataServer: action.payload,
      };
    }
    case userActionTypes.ADD_TABLE:{
      return {
        ...state,
        tables: addTable(state.tables, action.payload)
      }
    }

    case userActionTypes.ADD_CURRENT_TABLE:{
      return {
        ...state,
        tables: action.payload
      }
    }

    case userActionTypes.SIGNIN_FAILED:
    case userActionTypes.SIGNOUT_FAILED:
    case userActionTypes.SIGN_UP_FAILURE:
    case userActionTypes.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
