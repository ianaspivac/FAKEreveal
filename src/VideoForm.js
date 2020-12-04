import React from 'react';
import axios from 'axios';
import './VideoForm.css';

export default class VideoForm extends React.Component {

  state = {

    deepfake_status: null,
    uploaded: null,
    selectedFile: null,
    loaded: null
  };

  onFileChange = event => {

    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button) 
  onFileUpload = (event) => {
    event.preventDefault();

    // Create an object of formData 
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file 
    console.log(this.state.selectedFile);

    /* 
    const response = await axios.post(``, formData);
      axios.get(``)
      .then(res => {
        var deepfake_status=false;
        this.setState({loaded:true,uploaded:true,deepfake_status:deepfake_status});
      })
    */

    var deepfake_status = false;
    this.setState({ loaded:false,uploaded: true, deepfake_status: deepfake_status });

  };

  fileData = () => {
    if (this.state.uploaded) {
      if (this.state.loaded) {
        if (this.state.deepfake_status) {
          return (
            <div>
              <h3>This video does contain deepfake.</h3>
            </div>);
        }
        else {
          return (<div>
            <h3>This video doesn't contain deepfake.</h3>
          </div>);
        }
      }
      else{
        return (<div>
          <p>Loading...</p>
        </div>);
      }
    } else {
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
