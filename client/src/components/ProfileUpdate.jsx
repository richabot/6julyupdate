// import React, { useEffect, useState } from 'react'

// const ProfileUpdate = () => {
//   const email = localStorage.getItem('email');
//   console.log("local", email)
//   const [updatedDetails, setUpdatedDetails] = useState(null);
//   const [success,setSuccess] =useState(false)
//   const [error,setError] = useState(false)
//   const [image, setImage] = useState(null);
//   const handleChangeImage = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };
//   useEffect(() => {
//     console.log(email, "locastorage")
//     const fetchUserDetails = async () => {

//       try {
//         const response = await fetch(`http://localhost:5000/api/users/data/${email}`);
//         const data = await response.json();
//         console.log(data, "sucessd data")
//         setUpdatedDetails(data);
//       } catch (error) {
//         console.log(error, "error");
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handleChange = (e) => {
//     setUpdatedDetails({
//       ...updatedDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     console.log("handlesubmit")
//     console.log(updatedDetails, "update details")
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/users/profile/profileUpdate', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedDetails),
//       });
//       console.log(response,"status in submit")
//       if(response.status==200)
//       {
//         setSuccess(true)
//       }
//       // const data = await response.json();
//       // console.log('Data updated successfully:', data);
//     } catch (error) {
//       console.log(error,"error in updating");
//       setError(true)
//     }
//   };

//   return (

//     <div>

//       {console.log(updatedDetails, "user details")}


//       {updatedDetails && <form onSubmit={handleSubmit}>
//         <div className='personalbox1'>
//           <div className="profile-container">
//             <div className="left-column">
//               {!image &&<div className="initial">M</div>}
//               {image && <img className='profilepic' src={URL.createObjectURL(image)} alt="Selected" />}
//                 <input type="file" accept="image/*" placeholder="edit" onChange={handleChangeImage} />
//             </div>
//             <div className="right-column">
//             <h5>Richa Shah</h5>
//               <p>richagshah03@gmail.com</p>
             
//             </div>
//           </div>
//         </div>
//         <div>
//           <h6 style={{ marginLeft: "28px" }}>client</h6>
//           <div className='personalbox1 personalbox2'>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='firstName'>First Name:</label>
//                 <input type="text"
//                   name="firstName"
//                   value={updatedDetails.firstName}
//                   onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='lastName'>Last Name:</label>
//                 <input type="text"
//                   name="lastName"
//                   value={updatedDetails.lastName}
//                   onChange={handleChange} />
//               </div>
//             </div>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='title'>Title:</label>
//                 <input type="text" name="title" value={updatedDetails.title} onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='title'>Username:</label>
//                 <input type="text"
//                   name="username"
//                   value={updatedDetails.username}
//                   onChange={handleChange} />
//               </div>

//             </div>
//           </div>
//         </div>


//         <div>
//           <h6 style={{ marginLeft: "28px" }}>Contact Info</h6>
//           <div className='personalbox1 personalbox2 personalbox3'>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='firstName'>Contact Phone</label>
//                 <input type="text" name="contact" value={updatedDetails.contact} onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='lastName'>Email address:</label>
//                 <input type="email" name="email" value={updatedDetails.email} disabled />
//               </div>
//             </div>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='title'>Country:</label>
//                 <input type="text" name="country" value={updatedDetails.country} onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='title'>State:</label>
//                 <input type="text" name="state" value={updatedDetails.state} onChange={handleChange} />
//               </div>
//             </div>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='title'>Street:</label>
//                 <input type="text" name="street" value={updatedDetails.street} onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='title'>City:</label>
//                 <input type="text" name="city" value={updatedDetails.city} onChange={handleChange} />
//               </div>
//             </div>
//             <div className='input-group'>
//               <label htmlFor='title'>Postal code:</label>
//               <input type="text" name="postalcode" value={updatedDetails.postalcode} onChange={handleChange} />
//             </div>
//           </div>
//         </div>
//         {error && <div className='alert alert-danger successalert'>Something went wrong</div>}
//         {success && <div className='alert alert-success successalert'>Profile updated Successfully</div>}
//         <button type="submit" className='profiletab1Save derexbtn' >Save </button>
//       </form>}

//     </div>


//   )
// }

// export default ProfileUpdate

// import React, { useEffect, useState } from 'react'

// const ProfileUpdate = () => {
//   const email = localStorage.getItem('email');
//   console.log("local", email)
//   const [updatedDetails, setUpdatedDetails] = useState(null);
//   const [success,setSuccess] =useState(false)
//   const [error,setError] = useState(false)
//   const [image, setImage] = useState(null);
//   const handleChangeImage = (e) => {
   
//     const file = e.target.files[0];
//     // console.log(file, "image");
//     setImage(file);
  
//     // Update the updatedDetails state with the image file
//     setUpdatedDetails((prevState) => ({
//       ...prevState,
//       image: file,
//     }));
//   };
//   useEffect(() => {
//     console.log(email, "locastorage")
//     const fetchUserDetails = async () => {

//       try {
//         const response = await fetch(`http://localhost:5000/api/users/data/${email}`);
//         const data = await response.json();
//         console.log(data, "sucessd data")
//         setUpdatedDetails(data);
//       } catch (error) {
//         console.log(error, "error");
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handleChange = (e) => {
//     setUpdatedDetails({
//       ...updatedDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

  

//   const handleSubmit = async (e) => {

//     // console.log(user)
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       Object.keys(updatedDetails).forEach((key) => {
//         formData.append(key, updatedDetails[key]);
//       });
//       // formData.append('image', image);
//       console.log("start")
//       // console.log(formData,"formdata")
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       console.log("done")
//       const response = await fetch('http://localhost:5000/api/users/profile/profileUpdate', {
//         method: 'PUT',
//         body: formData,
//       });

//       if (response.ok) {
//         setSuccess(true);
//       } else {
//         setError(true);
//       }
//     } catch (error) {
//       console.log(error, "error in updating");
//       setError(true);
//     }
//   };
  

//   return (

//     <div>

     


//       {updatedDetails && <form onSubmit={handleSubmit}>
//         <div className='personalbox1'>
//           <div className="profile-container">
//             <div className="left-column">
//               {/* {!image &&<div className="initial">M</div>} */}
//               {/* {updatedDetails.profilepic ? (
//                 <img className='profilepic' src={`http://localhost:5000/${updatedDetails.profilepic}`} alt="Profile" />
//               ) : (
//                 <p>M</p>
//               )}
//               {image && <img className='profilepic' src={URL.createObjectURL(image)} alt="Selected" />}
//               // <input type="file" accept="image/*" name="image" onChange={handleChangeImage} />
//               <img className='profilepic' src={`http://localhost:5000/${updatedDetails.profilepic}`} /> */}

// {updatedDetails.profilepic ? (
//   <img className='profilepic' src={`http://localhost:5000/${updatedDetails.profilepic}`} alt="Profile" />
// ) : (
//   <p>M</p>
// )}
// <input type="file" accept="image/*" name="image" onChange={handleChangeImage} />

//             </div>
//             <div className="right-column">
//               <h5>Richa Shah</h5>
//               <p>richagshah03@gmail.com</p>

//             </div>
//           </div>
//         </div>
//         <div>
//           <h6 style={{ marginLeft: "28px" }}>client</h6>
//           <div className='personalbox1 personalbox2'>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='firstName'>First Name:</label>
//                 <input type="text"
//                   name="firstName"
//                   value={updatedDetails.firstName}
//                   onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='lastName'>Last Name:</label>
//                 <input type="text"
//                   name="lastName"
//                   value={updatedDetails.lastName}
//                   onChange={handleChange} />
//               </div>
//             </div>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='title'>Title:</label>
//                 <input type="text" name="title" value={updatedDetails.title} onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='title'>Username:</label>
//                 <input type="text"
//                   name="username"
//                   value={updatedDetails.username}
//                   onChange={handleChange} />
//               </div>

//             </div>
//           </div>
//         </div>


//         <div>
//           <h6 style={{ marginLeft: "28px" }}>Contact Info</h6>
//           <div className='personalbox1 personalbox2 personalbox3'>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='firstName'>Contact Phone</label>
//                 <input type="text" name="contact" value={updatedDetails.contact} onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='lastName'>Email address:</label>
//                 <input type="email" name="email" value={updatedDetails.email} disabled />
//               </div>
//             </div>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='title'>Country:</label>
//                 <input type="text" name="country" value={updatedDetails.country} onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='title'>State:</label>
//                 <input type="text" name="state" value={updatedDetails.state} onChange={handleChange} />
//               </div>
//             </div>
//             <div className='input-row'>
//               <div className='input-group'>
//                 <label htmlFor='title'>Street:</label>
//                 <input type="text" name="street" value={updatedDetails.street} onChange={handleChange} />
//               </div>
//               <div className='input-group'>
//                 <label htmlFor='title'>City:</label>
//                 <input type="text" name="city" value={updatedDetails.city} onChange={handleChange} />
//               </div>
//             </div>
//             <div className='input-group'>
//               <label htmlFor='title'>Postal code:</label>
//               <input type="text" name="postalcode" value={updatedDetails.postalcode} onChange={handleChange} />
//             </div>
//           </div>
//         </div>
//         {error && <div className='alert alert-danger successalert'>Something went wrong</div>}
//         {success && <div className='alert alert-success successalert'>Profile updated Successfully</div>}
//         <button type="submit" className='profiletab1Save derexbtn' >Save </button>
//       </form>}

//     </div>


//   )
// }

// export default ProfileUpdate


import React, { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';


const ProfileUpdate = () => {
  const email = localStorage.getItem('email');
  console.log("local", email)
  const [updatedDetails, setUpdatedDetails] = useState(null);
  const [success,setSuccess] =useState(false)
  const [error,setError] = useState(false)
  const [image, setImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const cropped = useSelector((state)=>state.auth.croppedFile)

  console.log(cropped,"cropped")
  const handleProfileUpdateClick = () => {
    setShowCrop(true);
  };

  const handleChangeImage = (e) => {
   
    const file = e.target.files[0];
    // console.log(file, "image");
    setImage(file);
  
    // Update the updatedDetails state with the image file
    setUpdatedDetails((prevState) => ({
      ...prevState,
      image: file,
    }));
  };
  useEffect(() => {
    console.log(email, "locastorage")
    const fetchUserDetails = async () => {

      try {
        const response = await fetch(`http://localhost:5000/api/users/data/${email}`);
        const data = await response.json();
        console.log(data, "sucessd data")
        setUpdatedDetails(data);
      } catch (error) {
        console.log(error, "error");
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

    // console.log(user)
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(updatedDetails).forEach((key) => {
        formData.append(key, updatedDetails[key]);
      });
      formData.append('image', cropped);
      console.log("start")
      // console.log(formData,"formdata")
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      console.log("done")
      const response = await fetch('http://localhost:5000/api/users/profile/profileUpdate', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error, "error in updating");
      setError(true);
    }
  };
 
  return (

    <div>
{/* onSubmit={handleSubmit} */}
   

      {updatedDetails && <form  onSubmit={handleSubmit}>
        <div className='personalbox1'>
          <div className="profile-container">
            <div className="left-column">
           

{/* {!cropped && updatedDetails.profilepic && (
  <img className='profilepic' src={`http://localhost:5000/${updatedDetails.profilepic}`} alt="Profilepic" />
)} */}
{!cropped && updatedDetails.profilepic && (
  <img className='profilepic' src={updatedDetails.profilepic.endsWith('.png') ? updatedDetails.profilepic : `http://localhost:5000/${updatedDetails.profilepic}`} alt="Profilepic" />
)}

{console.log(cropped,showCrop,"true")}
{/* {cropped==null &&  !showCrop &&<p className='profilepic'>p</p>} */}
{cropped && <img className='profilepic' src={URL.createObjectURL(cropped)} alt="Profile" />}
{/* <input type="file" accept="image/*" name="image" onChange={handleChangeImage} /> */}

            </div>
            <div className="right-column">
              <h5>Richa Shah</h5>
              <p>richagshah03@gmail.com</p>
              <button type ="button" onClick={handleProfileUpdateClick}>Edit</button>
            </div>
          </div>
        </div>
     
        <div>

        {showCrop && <Dashboard />}
    


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

{/* Render the button to trigger profile update */}


          <h6 style={{ marginLeft: "28px" }}>client</h6>
          <div className='personalbox1 personalbox2'>
            <div className='input-row'>
              <div className='input-group'>
                <label htmlFor='firstName'>First Name:</label>
                <input type="text"
                  name="firstName"
                  value={updatedDetails.firstName}
                  onChange={handleChange} />
              </div>
              <div className='input-group'>
                <label htmlFor='lastName'>Last Name:</label>
                <input type="text"
                  name="lastName"
                  value={updatedDetails.lastName}
                  onChange={handleChange} />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <label htmlFor='title'>Title:</label>
                <input type="text" name="title" value={updatedDetails.title} onChange={handleChange} />
              </div>
              <div className='input-group'>
                <label htmlFor='title'>Username:</label>
                <input type="text"
                  name="username"
                  value={updatedDetails.username}
                  onChange={handleChange} />
              </div>

            </div>
          </div>
        </div>


        <div>
          <h6 style={{ marginLeft: "28px" }}>Contact Info</h6>
          <div className='personalbox1 personalbox2 personalbox3'>
            <div className='input-row'>
              <div className='input-group'>
                <label htmlFor='firstName'>Contact Phone</label>
                <input type="text" name="contact" value={updatedDetails.contact} onChange={handleChange} />
              </div>
              <div className='input-group'>
                <label htmlFor='lastName'>Email address:</label>
                <input type="email" name="email" value={updatedDetails.email} disabled />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <label htmlFor='title'>Country:</label>
                <input type="text" name="country" value={updatedDetails.country} onChange={handleChange} />
              </div>
              <div className='input-group'>
                <label htmlFor='title'>State:</label>
                <input type="text" name="state" value={updatedDetails.state} onChange={handleChange} />
              </div>
            </div>
            <div className='input-row'>
              <div className='input-group'>
                <label htmlFor='title'>Street:</label>
                <input type="text" name="street" value={updatedDetails.street} onChange={handleChange} />
              </div>
              <div className='input-group'>
                <label htmlFor='title'>City:</label>
                <input type="text" name="city" value={updatedDetails.city} onChange={handleChange} />
              </div>
            </div>
            <div className='input-group'>
              <label htmlFor='title'>Postal code:</label>
              <input type="text" name="postalcode" value={updatedDetails.postalcode} onChange={handleChange} />
            </div>
          </div>
        </div>
        {error && <div className='alert alert-danger successalert'>Something went wrong</div>}
        {success && <div className='alert alert-success successalert'>Profile updated Successfully</div>}
        <button type="submit" className='profiletab1Save derexbtn' >Save </button>
      </form>}

    </div>


  )
}

export default ProfileUpdate








