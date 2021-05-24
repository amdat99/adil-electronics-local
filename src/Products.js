import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { v4 as uuidv4 } from 'uuid';

function Products({ currentUser, onFetch, dataServer, addTable, currentTable, tables, setCurrentTable }) {
  const [productInfo, setProductInfo] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [type, setType] = useState("serial");
  const [onJson, setOnJson] = useState(null)
  const [custom, setCustom] = useState(false)
  const [filters, setFilters] = useState({invoicenum:true,serialnum:true,modal:true})
const [showInput, setShowInput] = useState(false)
const [showSave, setShowSave] = useState(false)
const [tableName, setTableName] = useState('')
const [showTable, setShowTable] = useState(false)

  let filterOne = Object.keys(filters)[0]

  const [columnsProduct,setColumnsProduct] = useState([
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "Serial Number",
      selector: "serialnum",
      sortable: true,
      
    },
    {
      name: "Invoice Number",
      selector: "invoicenum",
      sortable: true,
     
    },
    {
      name: "Modal",
      selector: "modal",
      sortable: true,
    
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
  ]);

  useEffect(() => {
    if (currentUser) {
      fetchProducts();
    }
    //eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    fetchProducts();
    //eslint-disable-next-line
  }, [onFetch]);

  const filterProductS = () => {
   let filter
    return productInfo.filter((data) => {
 
        return data.serialnum
        .toLowerCase()
        .toString()
        .includes(searchFilter.toLowerCase());
    });
  
  };

  const filterProductI = () => {
   let filter
    if(custom === false) {
    filter = filterOne
    
    return productInfo.filter((data) => {
      return data.invoicenum
        .toLowerCase()
        .toString()
        .includes(searchFilter.toLowerCase());
    });
  }
  };
  const filterProductM = () => {
    if (custom === false){
    return productInfo.filter((data) => {
      return data.modal
        .toLowerCase()
        .toString()
        .includes(searchFilter.toLowerCase());
    });
  }
  };

  const filterId = () => {
    if(custom){
      return productInfo.filter((data) => {
        return data.id  
        .toString()
          .toLowerCase()
        
          .includes(searchFilter.toLowerCase());
      });
    }
  }

  const fetchProducts = async () => {
    setColumnsProduct([
      {
        name: "Id",
        selector: "id",
        sortable: true,
      },
      {
        name: "Serial Number",
        selector: "serialnum",
        sortable: true,
        
      },
      {
        name: "Invoice Number",
        selector: "invoicenum",
        sortable: true,
       
      },
      {
        name: "Modal",
        selector: "modal",
        sortable: true,
      
      },
      {
        name: "Date",
        selector: "date",
        sortable: true,
      },
    ])
    console.log("Fetching products");
    try {
      const response = await fetch(dataServer + "fetchproducts", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessid: currentUser[0].accessid,
        }),
      });
      const data = await response.json();
      if (data) {
        setProductInfo(data);
        setCustom(false)
      }
    } catch (e) {
      console.log(e);
    }
  };



  const fetchProductsCust = async (url) => {
    console.log("Fetching products");
    try {
      const response = await fetch(url, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
    console.log(data);
        setProductInfo(data);
        getKey2(data)
        setCustom(true)
      
    } catch (e) {
      console.log(e);
    }
  };

  const saveTable = () => {
    if(!productInfo || !tableName){
      return;
    }
    addTable({name: tableName, id: uuidv4(), data: productInfo})
  }

  const getKey2 = (data) => {
    let value
    let columns
    let addedColumns = new Array
    value = data[0];   
    columns = Object.keys(value)
    console.log(columns[0].toString())

    columns.map(column =>
      addedColumns.push({name: column,selector:column,sortable:true}) )

  
    
  setColumnsProduct(addedColumns);
 
    }
const setLocalTable = (data) => {
  
  setProductInfo(data);
  getKey2(data)
  setCustom(true)
}

const deleteTable = (id) => {
 let currentTables = tables.filter(table => table.id !== id);
  setCurrentTable(currentTables)
}

  
  
  
  return (
    <div>
      <div className="tableheaders">
        <span
          style={{
            cursor: "pointer",
            position: "absolute",
            left: "-5%",
            top: "35px",
            zIndex: 900,
            fontSize: "20px",
          }}
          onClick={fetchProducts}
        >
          ↻
        </span>
          
        <span style={{marginRight:'10px', cursor: 'pointer'}} onClick={()=> setShowInput(!showInput)}>🌐</span>
        { showInput ?
        <React.Fragment>
        <input  onChange={(e)=>setOnJson(e.target.value)}/>
        <button style={{marginRight: "3px" }} onClick={()=>{setCustom(true); fetchProductsCust(onJson)}}>import table</button>
       {productInfo ?
       <span onClick={()=> setShowSave(!showSave)}  style={{marginRight: "20px",cursor: 'pointer'}} >💾 </span>
        :null}
       </React.Fragment>
            :null}

            {showSave?
            <React.Fragment>
            <input placeholder={'give a table name'} onChange={(e)=> setTableName(e.target.value)}/>
            <button onClick={saveTable}>save table</button>
            </React.Fragment>
          :null}

      
          {showTable && tables?
         <div style={{display:'flex',flexDirection:'column',position:'absolute',zIndex:999,background:'white',border:'1px solid black',borderRadius:'20px',padding:'5px'}}>
           
           {tables.map(table => 
          
         <div style={{display:'flex',flexDirection:'row' ,marginTop:'5px',}}>
            <span style={{marginTop:'3px'}}>{table.name}</span>
            <button style={{marginLeft:'10px'}} onClick={() =>setLocalTable(table.data)}>Set table</button>
            <span  onClick={()=>deleteTable(table.id)}
            style={{color:'#8b0000',cursor:'pointer',marginTop:'3px',marginLeft:'3px'}}>x</span>
     
            </div>
            )     }
            </div>
          :null }
        
   
        <span  style={{cursor:'pointer'}} onClick={() =>setShowTable(!showTable)}>📄</span> 
      
        {custom ?  <input
            style={{ marginBottom: "10px" }}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={"search by id"}

          />
         
          :
        type !== "modal"  ? (
          <input
            style={{ marginBottom: "10px" }}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={
              type === "serial"
                ? "search by serial number"
                : "search by invoice number"
            }
          />
        ) : (
          <input
            style={{ marginBottom: "10px" }}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={"search by modal"}
          />
        )}
        
       {custom === false ?
       <React.Fragment>
         
        <button id="tablebutt" type="button" onClick={() => setType("invoice")}>
          search by invoice
        </button>
        <button id="tablebutt" type="button" onClick={() => setType("serial")}>
          search by serial
        </button>
        <button id="tablebutt" type="button" onClick={() => setType("modal")}>
          search by modal
        </button>
        
        </React.Fragment>
        :   <React.Fragment>
        <button id="tablebutt" type="button" onClick={() => setType("id")}>
          search by id
        </button>
        <button id="tablebutt" type="button" onClick={() => setType("786")}>
        stop id search
      </button>
       </React.Fragment> }
        </div>
      

      <div className="table1 hide-scroll">
        {productInfo && type !== "modal"  && custom === false ? (
          <DataTable
            columns={columnsProduct}
            data={type === "serial" ? filterProductS(filters) : filterProductI(filters)}
          />
        ) : null}

        {productInfo && type === "modal" && custom === false ? (
          <DataTable columns={columnsProduct} data={filterProductM(filters)} />
        ) : null}
        {custom && productInfo ?
           <DataTable columns={columnsProduct} data={ type=== 'id'? filterId() :productInfo} />
      :null}
      </div>
    </div>
  );
}

export default Products;
