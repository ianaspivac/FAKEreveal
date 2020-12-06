import React from 'react';
import axios from 'axios';
import './VideoForm.css';

export default class VideoForm extends React.Component {

  state = {
    deepfake_status: null,
    uploaded: null,
    selectedFile: null,
    loaded: false
  };

  onFileChange = event => {

    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button) 
  onFileUpload = (event) => {
    this.setState({deepfake_status:null,uploaded:false,loaded:false});

    // Create an object of formData 
    const formData = new FormData();

   // Update the formData object 
   formData.append(
    "file",
    this.state.selectedFile,
  );

  // Details of the uploaded file 
  console.log(this.state.selectedFile);

  const headers = { "Content-Type": "multipart/form-data" }

  const response = axios.post(`http://127.0.0.1:5000/api`, formData, {headers :headers}).then(res => {
  console.log(res);   
  this.setState({loaded:true,uploaded:true,deepfake_status:res.data.status});
  })
  };

  fileData = () => {
    if (this.state.uploaded) {
      if (this.state.loaded) {
        if (this.state.deepfake_status) {      
          return (<div>
            <h3>{this.state.deepfake_status}</h3>
          </div>);    
      }}
      else{
        return (<div>
          <p>Loading...</p>
        </div>);
      }
     }else {
      return (
        <div>
          <br />
          <p>Choose before Pressing the Verify button</p>
        </div>
      );
    }
  };

  render() {

    return (
      <div className="VideoForm">
        <div className="form-container">
          <h2>
            Upload a video to verify
            </h2>
          <div>
            <form onSubmit={this.onFileUpload} >
              <input type="file" accept="video/*" onChange={this.onFileChange} required/>
              <input type="submit" value="Verify" />
            </form>
          </div>
          {this.fileData()}
        </div>
      </div>
    );
  }
} 
