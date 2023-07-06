// import React from 'react';
// import { Dialog } from "primereact/dialog"
// import { Button } from "primereact/button"
// import { useState } from 'react';
// import pic from "../../images/richabus.jpg"
// const Dashboard = () => {
//     const [dialoge,setDialoge] = useState(false)

//     return (
//         <div>
//            <div>
//             <img 
//             style={{
//                 width: "200px",
//                 height: "200px",
//                 borderRadius:"50%",
//                 objectFit:"cover",


//             }}
//             onClick={()=>setDialoge(true)}
//             src={pic} alt="hello"/>
//             <Button >dialog</Button>
//            <div> <Dialog visible={dialoge}
//             header={()=>(<p htmlFor="" style={{border:'1px solid red'}} className='text-2xl font-semibold textColor'>Update profiel</p>)}
//             onHide={()=>setDialoge(false)}
//             ></Dialog></div>
//            </div>

//         </div>
//     );
// };

// export default Dashboard;
// import React, { Component } from 'react'

// import Dropzone from 'react-dropzone'
// import ReactCrop from 'react-image-crop'
// import '../../styles/customcrop.css';

// import {base64StringtoFile,
//     downloadBase64File,
//     extractImageFileExtensionFromBase64,
//     image64toCanvasRef} from '../common/ResuableUtils'

// const imageMaxSize = 1000000000 // bytes
// const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
// const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
// class Dashboard extends Component {
//     constructor(props){
//         super(props)
//         this.imagePreviewCanvasRef = React.createRef()
//         this.fileInputRef = React.createRef()
//         this.state = {
//             imgSrc: null,
//             imgSrcExt: null,
//             crop: {
//                 aspect: 1/1
//             }
//         }
//     }

//     verifyFile = (files) => {
//         if (files && files.length > 0){
//             const currentFile = files[0]
//             const currentFileType = currentFile.type
//             const currentFileSize = currentFile.size
//             if(currentFileSize > imageMaxSize) {
//                 alert("This file is not allowed. " + currentFileSize + " bytes is too large")
//                 return false
//             }
//             if (!acceptedFileTypesArray.includes(currentFileType)){
//                 alert("This file is not allowed. Only images are allowed.")
//                 return false
//             }
//             return true
//         }
//     }

//     handleOnDrop = (files, rejectedFiles) => {
//         if (rejectedFiles && rejectedFiles.length > 0){
//             this.verifyFile(rejectedFiles)
//         }


//         if (files && files.length > 0){
//              const isVerified = this.verifyFile(files)
//              if (isVerified){
//                  // imageBase64Data 
//                  const currentFile = files[0]
//                  const myFileItemReader = new FileReader()
//                  myFileItemReader.addEventListener("load", ()=>{
//                      // console.log(myFileItemReader.result)
//                      const myResult = myFileItemReader.result
//                      this.setState({
//                          imgSrc: myResult,
//                          imgSrcExt: extractImageFileExtensionFromBase64(myResult)
//                      })
//                  }, false)

//                  myFileItemReader.readAsDataURL(currentFile)

//              }
//         }
//     }


//     handleImageLoaded = (image) => {
//         //console.log(image)
//     }
//     handleOnCropChange = (crop) => {
//         this.setState({crop:crop})
//     }
//     handleOnCropComplete = (crop, pixelCrop) =>{
//         //console.log(crop, pixelCrop)

//         const canvasRef = this.imagePreviewCanvasRef.current
//         const {imgSrc}  = this.state
//         image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
//     }
//     handleDownloadClick = (event) => {
//         event.preventDefault()
//         const {imgSrc}  = this.state
//         if (imgSrc) {
//             const canvasRef = this.imagePreviewCanvasRef.current
        
//             const {imgSrcExt} =  this.state
//             const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)

      
//             const myFilename = "previewFile." + imgSrcExt

//             // file to be uploaded
//             const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
//             console.log(myNewCroppedFile)
//             // download file
//             downloadBase64File(imageData64, myFilename)
//             this.handleClearToDefault()
//         }
        

//     }

//     handleClearToDefault = event =>{
//         if (event) event.preventDefault()
//         const canvas = this.imagePreviewCanvasRef.current
//         const ctx = canvas.getContext('2d');
//         ctx.clearRect(0, 0, canvas.width, canvas.height)

//         this.setState({
//             imgSrc: null,
//             imgSrcExt: null,
//             crop: {
//                 aspect: 1/1
//             }

//         })
//         this.fileInputRef.current.value = null
//     }

//     handleFileSelect = event => {
//         // console.log(event)
//         const files = event.target.files
//         if (files && files.length > 0){
//               const isVerified = this.verifyFile(files)
//              if (isVerified){
//                  // imageBase64Data 
//                  const currentFile = files[0]
//                  const myFileItemReader = new FileReader()
//                  myFileItemReader.addEventListener("load", ()=>{
//                      // console.log(myFileItemReader.result)
//                      const myResult = myFileItemReader.result
//                      this.setState({
//                          imgSrc: myResult,
//                          imgSrcExt: extractImageFileExtensionFromBase64(myResult)
//                      })
//                  }, false)

//                  myFileItemReader.readAsDataURL(currentFile)

//              }
//         }
//     }
//   render () {
//       const {imgSrc} = this.state
//     return (
//       <div>
//         <h1>Drop and Crop</h1>

//         <input ref={this.fileInputRef} type='file' accept={acceptedFileTypes} multiple={false} onChange={this.handleFileSelect} />
//         {imgSrc !== null ? 
//             <div>
               

//                  <ReactCrop 
//                      src={imgSrc} 
//                      crop={this.state.crop} 
//                      onImageLoaded={this.handleImageLoaded}
//                      onComplete = {this.handleOnCropComplete}
//                      onChange={this.handleOnCropChange}/>

//                   <br/>
//                   <p>Preview Canvas Crop </p>
//                   <canvas ref={this.imagePreviewCanvasRef}></canvas>
//                   <button onClick={this.handleDownloadClick}>Download</button>
//                   <button onClick={this.handleClearToDefault}>Clear</button>
//               </div>

//            : 

//              <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} multiple={false} maxSize={imageMaxSize}>Drop image here or click to upload</Dropzone>
//          }
        
//       </div>
//     )
//   }
// }

// export default Dashboard

// import React, { Component } from 'react'

// import Dropzone from 'react-dropzone'
// import ReactCrop from 'react-image-crop'
// import '../../styles/customcrop.css';

// import {base64StringtoFile,
//     downloadBase64File,
//     extractImageFileExtensionFromBase64,
//     image64toCanvasRef} from '../common/ResuableUtils'

// const imageMaxSize = 1000000000 // bytes
// const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
// const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})
// class Dashboard extends Component {
//     constructor(props){
//         super(props)
//         this.imagePreviewCanvasRef = React.createRef()
//         this.fileInputRef = React.createRef()
//         this.state = {
//             imgSrc: null,
//             imgSrcExt: null,
//             crop: {
//                 aspect: 1/1
//             }
//         }
//     }

//     verifyFile = (files) => {
//         if (files && files.length > 0){
//             const currentFile = files[0]
//             const currentFileType = currentFile.type
//             const currentFileSize = currentFile.size
//             if(currentFileSize > imageMaxSize) {
//                 alert("This file is not allowed. " + currentFileSize + " bytes is too large")
//                 return false
//             }
//             if (!acceptedFileTypesArray.includes(currentFileType)){
//                 alert("This file is not allowed. Only images are allowed.")
//                 return false
//             }
//             return true
//         }
//     }

//     handleOnDrop = (files, rejectedFiles) => {
//         if (rejectedFiles && rejectedFiles.length > 0){
//             this.verifyFile(rejectedFiles)
//         }


//         if (files && files.length > 0){
//              const isVerified = this.verifyFile(files)
//              if (isVerified){
//                  // imageBase64Data 
//                  const currentFile = files[0]
//                  const myFileItemReader = new FileReader()
//                  myFileItemReader.addEventListener("load", ()=>{
//                      // console.log(myFileItemReader.result)
//                      const myResult = myFileItemReader.result
//                      this.setState({
//                          imgSrc: myResult,
//                          imgSrcExt: extractImageFileExtensionFromBase64(myResult)
//                      })
//                  }, false)

//                  myFileItemReader.readAsDataURL(currentFile)

//              }
//         }
//     }


//     handleImageLoaded = (image) => {
//         //console.log(image)
//     }
//     handleOnCropChange = (crop) => {
//         this.setState({crop:crop})
//     }
//     handleOnCropComplete = (crop, pixelCrop) =>{
//         //console.log(crop, pixelCrop)

//         const canvasRef = this.imagePreviewCanvasRef.current
//         const {imgSrc}  = this.state
//         image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
//     }
//     handleDownloadClick = (event) => {
//         event.preventDefault()
//         const {imgSrc}  = this.state
//         if (imgSrc) {
//             const canvasRef = this.imagePreviewCanvasRef.current
        
//             const {imgSrcExt} =  this.state
//             const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)

      
//             const myFilename = "previewFile." + imgSrcExt

//             // file to be uploaded
//             const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
//             console.log(myNewCroppedFile)
//             // download file
//             downloadBase64File(imageData64, myFilename)
//             this.handleClearToDefault()
//         }
        

//     }

//     handleClearToDefault = event =>{
//         if (event) event.preventDefault()
//         const canvas = this.imagePreviewCanvasRef.current
//         const ctx = canvas.getContext('2d');
//         ctx.clearRect(0, 0, canvas.width, canvas.height)

//         this.setState({
//             imgSrc: null,
//             imgSrcExt: null,
//             crop: {
//                 aspect: 1/1
//             }

//         })
//         this.fileInputRef.current.value = null
//     }

//     handleFileSelect = event => {
//         // console.log(event)
//         const files = event.target.files
//         if (files && files.length > 0){
//               const isVerified = this.verifyFile(files)
//              if (isVerified){
//                  // imageBase64Data 
//                  const currentFile = files[0]
//                  const myFileItemReader = new FileReader()
//                  myFileItemReader.addEventListener("load", ()=>{
//                      // console.log(myFileItemReader.result)
//                      const myResult = myFileItemReader.result
//                      this.setState({
//                          imgSrc: myResult,
//                          imgSrcExt: extractImageFileExtensionFromBase64(myResult)
//                      })
//                  }, false)

//                  myFileItemReader.readAsDataURL(currentFile)

//              }
//         }
//     }
//   render () {
//       const {imgSrc} = this.state
//     return (
//       <div>
//         <h1>testin2</h1>

//         <input ref={this.fileInputRef} type='file' accept={acceptedFileTypes} multiple={false} onChange={this.handleFileSelect} />
//         {/* {imgSrc !== null ? 
//             <div>
               

//                  <ReactCrop 
//                      src={imgSrc} 
//                      crop={this.state.crop} 
//                      onImageLoaded={this.handleImageLoaded}
//                      onComplete = {this.handleOnCropComplete}
//                      onChange={this.handleOnCropChange}/>

//                   <br/>
//                   <p>Preview Canvas Crop </p>
//                   <canvas ref={this.imagePreviewCanvasRef}></canvas>
//                   <button onClick={this.handleDownloadClick}>Download</button>
//                   <button onClick={this.handleClearToDefault}>Clear</button>
//               </div>

//            : 

//              <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} multiple={false} maxSize={imageMaxSize}>Drop image here or click to upload</Dropzone>
//          } */}


//         <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
//   Launch demo modal
// </button>


// <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//       {imgSrc !== null ? 
//             <div>
               

//                  <ReactCrop 
//                      src={imgSrc} 
//                      className='cropreact'
//                      crop={this.state.crop} 
//                      onImageLoaded={this.handleImageLoaded}
//                      onComplete = {this.handleOnCropComplete}
//                      onChange={this.handleOnCropChange}/>

//                   <br/>
//                   <p>Preview Canvas Crop </p>
//                   <canvas style={{borderRadius:"50%",height:"90px"}}  ref={this.imagePreviewCanvasRef}></canvas>
//                   <button onClick={this.handleDownloadClick}>Download</button>
//                   <button onClick={this.handleClearToDefault}>Clear</button>
//               </div>

//            : 

//              <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes} multiple={false} maxSize={imageMaxSize}>Drop image here or click to upload</Dropzone>
//          }
//       </div>
//       <div class="modal-footer">
        
//       </div>
//     </div>
//   </div>
// </div>
        
//       </div>
//     )
//   }
// }

// export default Dashboard
import React, { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import '../../styles/customcrop.css';
import {
  base64StringtoFile,
  downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef,
} from '../common/ResuableUtils';
import { saveCroppedFile } from '../../actions/authActions';
import { useDispatch } from 'react-redux';

const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes
  .split(',')
  .map((item) => item.trim());

const Dashboard = () => {
  const imagePreviewCanvasRef = useRef();
  const fileInputRef = useRef();
  const [imgSrc, setImgSrc] = useState(null);
  const [imgSrcExt, setImgSrcExt] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const dispatch = useDispatch()
  const verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert(`This file is not allowed. ${currentFileSize} bytes is too large`);
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert('This file is not allowed. Only images are allowed.');
        return false;
      }
      return true;
    }
  };

  const handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyFile(rejectedFiles);
    }

    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener('load', () => {
          const myResult = myFileItemReader.result;
          setImgSrc(myResult);
          setImgSrcExt(extractImageFileExtensionFromBase64(myResult));
        }, false);

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  const handleImageLoaded = (image) => {
    // console.log(image)
  };

  const handleOnCropChange = (crop) => {
    setCrop(crop);
  };

  const handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = imagePreviewCanvasRef.current;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
  };

  const handleDownloadClick = (event) => {
    event.preventDefault();
    if (imgSrc) {
      const canvasRef = imagePreviewCanvasRef.current;
      const imageData64 = canvasRef.toDataURL(`image/${imgSrcExt}`);
      const myFilename = `previewFile.${imgSrcExt}`;

      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      console.log(myNewCroppedFile);
      dispatch(saveCroppedFile(myNewCroppedFile));
    //   downloadBase64File(imageData64, myFilename);
      handleClearToDefault();
    }
  };

  const handleClearToDefault = (event) => {
    if (event) event.preventDefault();
    const canvas = imagePreviewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setImgSrc(null);
    setImgSrcExt(null);
    setCrop({ aspect: 1 / 1 });

    fileInputRef.current.value = null;
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener('load', () => {
          const myResult = myFileItemReader.result;
          setImgSrc(myResult);
          setImgSrcExt(extractImageFileExtensionFromBase64(myResult));
        }, false);

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  return (
    <div className='bordermodal'>
      <h6>Edit Display Pic</h6>

      <input
      style={{display:"none"}}
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        multiple={false}
        onChange={handleFileSelect}
      />

      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {imgSrc !== null ? (
                <div>
                  <ReactCrop
                    src={imgSrc}
                    className="cropreact"
                    crop={crop}
                    onImageLoaded={handleImageLoaded}
                    onComplete={handleOnCropComplete}
                    onChange={handleOnCropChange}
                  />

                  <br />
                  <p>Preview Canvas Croping </p>
                  <canvas
                    style={{ borderRadius: '50%', height: '90px' }}
                    ref={imagePreviewCanvasRef}
                  ></canvas>
                  <button onClick={handleDownloadClick}>Download</button>
                  <button onClick={handleClearToDefault}>Clear</button>
                </div>
              ) : (
                <Dropzone
                  onDrop={handleOnDrop}
                  accept={acceptedFileTypes}
                  multiple={false}
                  maxSize={imageMaxSize}
                >
                  Drop image here or click to upload
                </Dropzone>
              )}
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
