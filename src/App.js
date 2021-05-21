import React,{useRef,useState} from 'react';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';

import './App.scss';
import { emailSignInPending,signOutPending ,signUpPending,addProductPending} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import Login from './Login'
import Header from './Header'
import Upload from './Upload'
import Register from './Register'
import AddProduct from './Add-product'
import Products from './Products'

function App({currentUser,emailSignInPending,signOutPending,signUpPending,addProductPending}) {
const [showUpload,setShowUpload] = useState(false)
const [showRegister,setShowRegister] = useState(false)
const [showAddProduct, setShowAddProduct] = useState(false)


  const toggleUpload = () => {
    setShowUpload(!showUpload)
    setShowRegister(false)
    setShowAddProduct(false)
  }

  const toggleRegister = () => {
    setShowRegister(!showRegister)
    setShowUpload(false)
    setShowAddProduct(false)
  }

  const toggleAddProduct = () => {
    setShowAddProduct(!showAddProduct)
    setShowRegister(false)
    setShowUpload(false)
  }
  return (
    
    <div className="App">
      {
        currentUser ?
        <div>
        <Header toggleRegister ={toggleRegister} toggleAddProduct= {toggleAddProduct}
        toggleUpload={toggleUpload} currentUser={currentUser} signOutPending={signOutPending} />
        
        {showUpload ?
        <Upload />
        :null}

        {showRegister?
        <Register signUpPending={signUpPending} />
        :null}

        {showAddProduct?
        <AddProduct addProductPending={addProductPending} currentUser={currentUser}/>
      :null}
   
          <Products currentUser={currentUser}/>
    </div>


: <Login emailSignInPending = {emailSignInPending} />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  emailSignInPending: signinData => dispatch(emailSignInPending(signinData)),
  signOutPending: () => dispatch(signOutPending()),
  signUpPending: (signUpData) => dispatch(signUpPending(signUpData)),
  addProductPending :(productData) => dispatch(addProductPending(productData))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
