import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import './AddGear.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { TextField } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl, Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { TextareaAutosize } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';




function AddReview() {

  const dispatch = useDispatch();
  const history = useHistory();
  const userImage = useSelector(store => store.imageReducer);
  const user = useSelector((store) => store.user);
  const [previewSource, setPreviewSource] = useState();
  const [makeModel, setMakeModel] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [review, setReview] = useState('');
  const [img, setImg] = useState('');

  const uploadImage = () => {
    console.log('TESTING UPLOAD IMAGE', img);
    let imageToSend = new FormData();
    imageToSend.append('file', img);
    console.log(imageToSend);
    dispatch({ type: 'SEND_IMAGE', payload: imageToSend });
  }


  const makeIn = () => {
    console.log('in makeIn:')
    setMakeModel(event.target.value)
    console.log(makeModel);
  }
  const yearIn = () => {
    console.log('in yearIn:')
    setYear(event.target.value)
    console.log(year);
  }
  const reviewIn = () => {
    console.log('in yearIn:')
    setReview(event.target.value)
    console.log(review);
  }
  const typeIn = () => {
    console.log('in typeIn:')
    setType(event.target.value)
    console.log(type);
  }


  const setGear = () => {


    console.log(makeModel);
    console.log(year);
    console.log(type);
    console.log(userImage);
    console.log(review);

    if (makeModel == "") {
      alert('Please add Make/Model before continuing')
    } else if (type == "") {
      alert('Please add Type before continuing')
    } else if (year == "") {
      alert('Please add Year before continuing')
    } else if (review == "") {
      alert('Please add Review before continuing')
    }
    else {

      let gearPost = {
        title: makeModel,
        type_id: type,
        year: year,
        review: review,
        image: userImage,
        user_id: user.id,
      };
      axios.post('/api/AddGear', gearPost).then((response) => {
        console.log(response.data);
        history.push('/profile')

      }).catch((err) => {
        console.log(err);
        alert('err posting fbp');
      })
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setImg(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    }
  };

  return (
    <div className="addContainer">
      <h2>- Add Gear -</h2>
      <br />
      <div>
        <br />
        <span className='previewImg'>
        {previewSource && (<img src={previewSource} alt="chosen" style={{ height: '200px' }} />)}
        </span>
      </div>
      <Input color='primary' variant='contained' type="file" name='image' onChange={handleFileInputChange} />
      <br />
      <br />
      <Button color='primary' variant='contained' onClick={uploadImage} >Upload File</Button>
      <br />
      <br />
      <TextField className='textfield' type="text" onChange={makeIn}  label="Gear make/model" variant="standard" />
      <br />
      <br />
      <select onChange={typeIn} >
        <option value=""selected disabled hidden>Gear Type</option>
        <option value="Guitar">Guitar</option>
        <option value="Amp">Amp</option>
        <option value="Accessory">Accessory</option>
      </select>


      <br />
      <TextField className='textfield' type="text" onChange={yearIn} label="Year" variant="standard" />
      <br />
      <TextField
        className='textfield'
        type="text"
        onChange={reviewIn}
        label="Review"
        multiline
        minRows={6}
        variant="standard" />
      <br />
      <Button variant='contained' color="primary" className='btn' onClick={setGear} >Submit</Button>
    </div>
  );
};


export default AddReview;
