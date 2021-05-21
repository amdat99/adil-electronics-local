import React,{useState,useEffect} from 'react';
import DataTable from 'react-data-table-component';

function Products({currentUser}) {

const [productInfo, setProductInfo] = useState(null)
const[ searchFilter,setSearchFilter] = useState('')
const [type, setType] = useState('serial')


const columns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Serial Number',
      selector: 'serialnum',
      sortable: true,
      right: true,
    },
    {
        name: 'Invoice Number',
        selector: 'invoicenum',
        sortable: true,
        right: true,
      },
      {
        name: 'Modal',
        selector: 'modal',
        sortable: true,
        right: true,
      },
      {
        name: 'Date',
        selector: 'date',
        sortable: true,
        right: true,
      },
  ];
// const columns = [
//     {
//       name: 'Title',
//       selector: 'title',
//       sortable: true,
//     },
//     {
//       name: 'Year',
//       selector: 'year',
//       sortable: true,
//       right: true,
//     },
//   ];


useEffect(() =>{
    if(currentUser){
        fetchProducts()
    }
},[currentUser])


const filterProductS = () => {
    return productInfo.filter((data)=>{
        return data.serialnum.toLowerCase().toString().includes(searchFilter.toLowerCase())
    })
}

const filterProductI = () => {
    return productInfo.filter((data)=>{
        return data.invoicenum.toLowerCase().toString().includes(searchFilter.toLowerCase())
    })
}
const filterProductM = () => {
    return productInfo.filter((data)=>{
        return data.modal.toLowerCase().toString().includes(searchFilter.toLowerCase())
    })
}

const fetchProducts  = async () => {

  
    try {
     
          const response = await fetch('http://localhost:7500/fetchproducts',{
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessid: currentUser[0].accessid
            }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
          setProductInfo(data)
          
      }
    } catch (e) {
      console.log(e);
    }
  }

  console.log(productInfo)

    return (
        <div style={{width:'70%' ,position:'absolute' ,top:'10%',marginLeft:'5%'}}>  
       
       {type !== 'modal'?
       <input onChange={(e)=>setSearchFilter(e.target.value)}
        placeholder={type==='serial'? 'search by serial number' : 'search by invoice number'}/>     
    :     <input onChange={(e)=>setSearchFilter(e.target.value)}
    placeholder={'search by modal'}/>  }
    
        <button id='tablebutt' type="button" onClick={()=>setType('invoice')}>search by invoice</button>
        <button id='tablebutt' type="button" onClick={()=>setType('serial')}>search by Serial</button>
        <button id='tablebutt' type="button" onClick={()=>setType('modal')}>search by Modal</button>

{productInfo && type !== 'modal' ?
<DataTable
        title="Product Data"
        columns={columns}
        data={ type==='serial' ?filterProductS(): filterProductI()}
      />
:null}

{productInfo && type==='modal'?


<DataTable
        title="Product Data"
        columns={columns}
        data={ filterProductM()}
      />
:null}

        </div>
    );
}

export default Products;