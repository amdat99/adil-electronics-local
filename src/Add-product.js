import React, { useState, useEffect } from "react";

function AddProduct({ addProductPending, currentUser, setShowAddProduct,dataServer }) {
  const [productData, setProductData] = useState({
    serialNumber: "",
    invoiceNumber: "",
    modal: "",
    accessid: "",
    server: ''
  });

  const [id,setId] = useState('')

  const [onUpdate, setOnUpdate]= useState(false)

  const { serialNumber, invoiceNumber, modal } = productData;
 
  useEffect(() => {
    setProductData({...productData, server: dataServer})
  },[dataServer])

  useEffect(() => {
    if (currentUser) {
      setProductData({ ...productData, server: dataServer, accessid: currentUser[0].accessid });
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    if (!serialNumber || !invoiceNumber || !modal) {
      return;
    }
    addProductPending(productData);
    // if(error !== null){
    //     alert(error)
    // }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setProductData({ ...productData, [name]: value });
  };


  const updateProd = async () => {

    const {serialNumber, invoiceNumber, modal, accessid} = productData
    try {
      const response = await fetch(dataServer + "updateproduct", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serialNumber: serialNumber,
          invoiceNumber: invoiceNumber,
          modal: modal,
          accessid: accessid,
          id: id
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="addproduct">
      <span
        onClick={() => setShowAddProduct(false)}
        style={{
          color: "red",
          cursor: "pointer",
          position: "absolute",
          left: "98%",
        }}
      >
        x
      </span>

      <form className="" >
        {onUpdate?
           <input
           name="id"
           type="text"
           value={id}
           placeholder="Enter id to update"
           onChange={(e)=>setId(e.target.value)}
           label="id"
           className="sign-on-input"
           required
         />
      
      :null}
        <input
          name="serialNumber"
          type="text"
          value={serialNumber}
          placeholder="Enter Serial Number"
          onChange={handleChange}
          label="serialNumber"
          className="sign-on-input"
          
        />

        <input
          name="invoiceNumber"
          type="text"
          value={invoiceNumber}
          placeholder="Enter Invoice Number"
          onChange={handleChange}
          label="invoiceNumber"
          className="sign-on-input"
          
        />

        <input
          name="modal"
          type="text"
          value={modal}
          placeholder="Enter Modal"
          onChange={handleChange}
          label="modal"
          className="sign-on-input"
          
        />
        <div className="button">
          {onUpdate?
         <button  type="button" onClick={updateProd}>update</button> 
: <button onClick={handleSubmit} type="button"> Add </button>
}
<button style= {{ marginLeft:'7px'}}onClick = {() =>setOnUpdate(!onUpdate)}type="button">Toggle update</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
