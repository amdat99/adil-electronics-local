import React ,{useState,useEffect} from 'react';

function AddProduct({addProductPending,currentUser}) {
    const [productData, setProductData] = useState({ serialNumber: "", invoiceNumber: "" ,modal:'',accessid:''});

    const {serialNumber, invoiceNumber,modal} = productData;
     useEffect(()=>{
        if (currentUser){
            setProductData({...productData,accessid:currentUser[0].accessid})
        }
     },[currentUser])

 

    const handleSubmit = async (event) => {
        if(!serialNumber||!invoiceNumber||!modal) {
            return;
        }
      event.preventDefault();
      addProductPending(productData);
      // if(error !== null){
      //     alert(error)
      // }
    };
  
    const handleChange = (event) => {
      const { value, name } = event.target;
  
      setProductData({ ...productData, [name]: value });
    };

    console.log(currentUser[0].accessid)
    return (
        <div className='addproduct'>
           
        <form className="sign-on-container" onSubmit={handleSubmit}>

          <input
            name="serialNumber"
            type="text"
            value={serialNumber}
            placeholder="Enter Serial Number"
            onChange={handleChange}
            label="serialNumber"
            className="sign-on-input"
            required
          />
  
          <input
            name="invoiceNumber"
            type="text"
            value={invoiceNumber}
            placeholder="Enter Invoice Number"
            onChange={handleChange}
            label="invoiceNumber"
            className="sign-on-input"
            required
          />

            <input
            name="modal"
            type="text"
            value={modal}
            placeholder="Enter Modal"
            onChange={handleChange}
            label="modal"
            className="sign-on-input"
            required
          />
          <div className="button">
            <button type="submit"> Add </button>
          </div>
        </form>
      </div>
    )
}

export default AddProduct;