/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
// const request = new XMLHttpRequest();

// const getOldPhotos = (name) => {
//   const gallery = document.getElementById(name);
//   console.log('gallery', gallery);
//   const oldImages = [...gallery.querySelectorAll('img')];

//   oldImages.map(async (item) => {
//     item.getAttribute('class');
//   });

//   const oldImagesArr = oldImages.map((item) => item.className);

//   return oldImagesArr;
// };
// const test = getOldPhotos('domki-do-apiterapii');

// console.log('test', test);

//type is either 'password' or 'data'
export const addPhoto = async (data, dataId, options) => {
  try {
    const url = `http://localhost:3000/api/v1/stairs/${dataId}`;
    console.log('dataAdd', data);
    console.log('dataAdd', options);

    // request.addEventListener(
    //   'load',
    //   function (evt) {
    //     console.log(evt);
    //   },
    //   false
    // );

    // request.open('GET', `http://localhost:3000/api/v1/stairs/${options}`, true),
    //   request.send();

    // const oldImages = await getOldPhotos(options);
    // console.log('oldImages', oldImages);
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Nowe zdjęcia dodane!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
