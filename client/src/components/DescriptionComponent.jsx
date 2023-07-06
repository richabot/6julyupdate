import React, { useState } from 'react'
import jwtDecode from 'jwt-decode';
import { changePassword } from '../actions/authActions';
import { useSelector } from 'react-redux';
import { GET_ERRORS } from '../actions/types';
// import "../styles/form.css"
const DescriptionComponent = () => {
  const email = localStorage.getItem("email");
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const errorMsg = useSelector((state) => state.errors);

  const handlePasswordChange = async () => {
    const email = localStorage.getItem('email');

    console.log("email", email)
    try {
      console.log("trying ....")
      const response = await changePassword(email, currentPassword, newPassword);
      console.log(response, "response in profile ama")
      if (errorMsg) {
        let errors = {};
        errors.password = errorMsg;
        // Handle the errors as needed
      } else {
        console.log("success")
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <form onSubmit={handlePasswordChange}>

        <input
          type="text"
          placeholder='Current Password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{
            marginBottom: '10px', display: 'block', margin: " 20px"

          }}
        />
        <input
          type="text"
          value={newPassword}
          placeholder='New Password'
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            marginBottom: '10px', display: 'block', margin: "20px"
          }}
        />
        <button type="submit" className='derexbtn' style={{ margin: " 23px;" }}>
          Change
        </button>
      </form>
    </div>

  )
}

export default DescriptionComponent


