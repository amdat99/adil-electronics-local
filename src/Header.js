import React from 'react';

function Header({toggleUpload,currentUser,signOutPending,toggleRegister, toggleAddProduct}) {
    return (
        <div className='headercont hover'>
            <span className='headerlink'  onClick={toggleUpload}>Upload</span>
            <span onClick={toggleAddProduct}className='headerlink' >Add Product</span>
            {currentUser[0].name ==='admin'?
            <span onClick={toggleRegister}className='headerlink' >Add account</span>
            
        :null}
            <span onClick={signOutPending}style={{position: 'fixed',right:30}}>Sign Out</span>
        </div>
    );
}

export default Header;