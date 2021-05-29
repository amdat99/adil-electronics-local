import React,{useState} from 'react';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';

import './App.scss';
import { emailSignInPending, setCurrentTable, addTable, signOutPending ,signUpPending,addProductPending, setOnFetch,setFileServer,setDataServer} from './redux/user/user.actions';
import { selectCurrentUser, selectTables, onFetch, selectCurrentTable, selectFileServer, selectDataServer } from './redux/user/user.selectors';

import Login from './Login'
import Header from './Header'
import Upload from './Upload'
import Register from './Register'
import AddProduct from './Add-product'
import Products from './Products'
import DeleteUser from './Delete-user'
import DeleteListing from './Delete-listing';
import Email from './Email'
import Connection from './Connection'
import Pdf from './Pdf'
import Sockets from './Sockets'

function App({currentUser,emailSignInPending,signOutPending,signUpPending,
  addProductPending,dataServer,fileServer, setFileServer, setDataServer,setCurrentTable, addTable,tables, currentTable}) {

const [showUpload,setShowUpload] = useState(false)
const [showRegister,setShowRegister] = useState(false)
const [showAddProduct, setShowAddProduct] = useState(false)
const [showDelete, setShowDelete] = useState(false)
const [showDeleteProd, setShowDeleteProd] = useState(false)
const [showEmail, setShowEmail] = useState(false)
const [showConnections, setShowConnections] = useState(false)
const [showPdf, setShowPdf] = useState(false)
const [showLive, setShowLive] = useState(false)


  const toggleUpload = () => {
    setShowUpload(!showUpload)
    setShowRegister(false)
    setShowAddProduct(false)
  }

  const toggleRegister = () => {
    setShowUpload(false)
    setShowAddProduct(false)
  }

  const onRegister = () => {
    setShowRegister(!showRegister)
    setShowDelete(false)
    setShowDeleteProd(false)
  }
  const onDelete = () => {
    setShowDelete(!showDelete)
    setShowRegister(false)
    setShowDeleteProd(false)
 }

 const onDeleteProd = () => {
  setShowDelete(false)
  setShowRegister(false)
  setShowDeleteProd(!showDeleteProd)
}

  const toggleAddProduct = () => {
    setShowAddProduct(!showAddProduct)
    setShowRegister(false)
    setShowUpload(false)
    setShowDelete(false)
    setShowDeleteProd(false)
  }
  const toggleEmail = () => {
    setShowEmail(!showEmail)
    setShowConnections(false)
  }
  const toggleConnection = () => {
    setShowConnections(!showConnections)
    setShowEmail(false)
  }

  const togglePdf = () => {
    setShowPdf(!showPdf)
  }

  const toggleLive = () => {
    setShowLive(!showLive)
  }

  return (
    
    <div className="App">
      {
        currentUser ?
        
        <div>

          
        <Header toggleRegister ={toggleRegister} toggleAddProduct= {toggleAddProduct} onRegister={onRegister}
        toggleUpload={toggleUpload} currentUser={currentUser} signOutPending={signOutPending} onDelete={onDelete}  currentUser={currentUser}
        onDeleteProd={onDeleteProd} toggleEmail={toggleEmail} toggleConnection={toggleConnection} togglePdf={togglePdf}  fileServer={fileServer}
        toggleLive={toggleLive}/>


        
        {showUpload ?
        <Upload fileServer={fileServer} setShowUpload={setShowUpload} />
        :null}

        {showRegister?
        <Register  dataServer ={dataServer } currentUser={currentUser} signUpPending={signUpPending} setShowRegister={setShowRegister} />
        :null}

        {showDelete?
        <DeleteUser dataServer={dataServer} currentUser={currentUser} setShowDelete={setShowDelete}/>
        :null}

        {showDeleteProd?
        <DeleteListing dataServer={dataServer} currentUser={currentUser} setShowDeleteProd={setShowDeleteProd}/>
        :null}

        {showAddProduct?
        <AddProduct dataServer={dataServer} currentUser={currentUser} addProductPending={addProductPending} setShowAddProduct={setShowAddProduct} setOnFetch={setOnFetch}/>
        :null}

        {showEmail?
        <Email dataServer={dataServer} currentUser={currentUser}setShowEmail={setShowEmail}/>
        :null}

        {showConnections?
        <Connection  setShowConnections={setShowConnections} />
      :null}
      
        {showPdf?
        <Pdf setShowPdf ={setShowPdf}/>
        :null}

    
        <div id= {showLive? null: 'hide'}>
        <Sockets dataServer={dataServer} currentUser={currentUser} setShowLive={setShowLive} />
        </div>
   
          <Products currentTable={currentTable} setCurrentTable={setCurrentTable} tables={tables} addTable={addTable} dataServer={dataServer} currentUser={currentUser} onFetch={onFetch}/>

          
    </div>


: <Login emailSignInPending = {emailSignInPending} dataServer={dataServer} />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  onFetch: onFetch,
  dataServer: selectDataServer,
  fileServer : selectFileServer,
  tables: selectTables,
  currentTable: selectCurrentTable
})

const mapDispatchToProps = dispatch => ({
  emailSignInPending: signinData => dispatch(emailSignInPending(signinData)),
  signOutPending: () => dispatch(signOutPending()),
  signUpPending: (signUpData) => dispatch(signUpPending(signUpData)),
  addProductPending :(productData) => dispatch(addProductPending(productData)),
  setOnFetch: (data) => dispatch(setOnFetch(data)),
  setDataServer:(server) => dispatch(setDataServer(server)),
  setFileServer:(server) => dispatch(setFileServer(server)),
  addTable:(table) => dispatch(addTable(table)),
  setCurrentTable:(table) => dispatch(setCurrentTable(table)),
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
