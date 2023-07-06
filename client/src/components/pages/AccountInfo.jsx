import React, { useEffect, useState } from 'react';
import Navbarnav from './Navbarnav';

const AccountInfo = () => {
    const email = localStorage.getItem('email');
   
    const [updatedDetails, setUpdatedDetails] = useState(null);
    useEffect(() => {
      
        const fetchUserDetails = async () => {

            try {
                const response = await fetch(`http://localhost:5000/api/users/data/${email}`);
                const data = await response.json();
             
                setUpdatedDetails(data);
            } catch (error) {
               
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
     
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/profile/profileUpdate', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDetails),
            });
            const data = await response.json();
         
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
              <Navbarnav />
            {updatedDetails &&
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='personalbox1' style={{ height: " 221px" }}>
                            <div className='input-row'>
                                <div className='input-group'>
                                    <label htmlFor='Email'>Email:</label>
                                    <input type="text"
                                        name="email"
                                        value={updatedDetails.email}
                                        onChange={handleChange} />
                                </div>
                                <div className='input-group'>
                                    <label htmlFor='lastName'>Language:</label>
                                    <input type="text"
                                        name="language"
                                        value={updatedDetails.language}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-row'>
                                <div className='input-group'>
                                    <label htmlFor='timezone'>Timezone</label>
                                    <input type="text" name="timezone" value={updatedDetails.timezone} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" style={{ display: "block", margin: "auto" }} className='derexbtn'>Save</button>
                </form>}
        </div>

    );
};

export default AccountInfo;