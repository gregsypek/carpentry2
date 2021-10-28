/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
// import Stairs from '../models/stairModel';

// type is either 'password' or 'data'
export const deletePhotos = async (id, name, index) => {
  try {
    // req.body.index = index;

    console.log('hejlklk');
    const url = `http://localhost:3000/api/v1/stairs/${id}/${name}`;
    // console.log('req.body', req.body);
    // console.log('paraa', req.params);

    // console.log(req.body);

    const res = await axios({
      method: 'DELETE',
      url,
      // data: { id, name, index },
      // data: { images: images.splice(`${index - 1}`, 1) },
    });

    // data: null,

    // data: {
    //   images: images.splice(`${index - 1}`, 1),
    // },
    // });

    // if (res.data.status === 'success') {
    //   showAlert('success', 'Zdjęcie zostało usunięte!');
    // }
  } catch (err) {
    // console.log(err);
    showAlert('error', err.response.data.message);
  }
};
// export const deletePhotos = async (id, name, index) => {
//   try {
//     // req.body.index = index;

//     console.log('hejlklk');
//     const url = `http://localhost:3000/api/v1/stairs/${id}/${name}`;
//     // console.log('req.body', req.body);
//     // console.log('paraa', req.params);

//     // console.log(req.body);

//     const res = await axios({
//       method: 'DELETE',
//       url,
//       data: {
//         images: images[index],
//       },

//       // data: null,

//       // data: {
//       //   images: images.splice(`${index - 1}`, 1),
//       // },
//     });

//     // if (res.data.status === 'success') {
//     //   showAlert('success', 'Zdjęcie zostało usunięte!');
//     // }
//   } catch (err) {
//     console.log(err);
//     // showAlert('error', err.response.data.message);
//   }
// };

// export const deletePhotos = async (id, name) => {
//   try {
//     // req.body.index = index;

//     console.log('hej');
//     const url = `http://localhost:3000/api/v1/stairs/${id}/${name}`;
//     // console.log('req.body', req.body);
//     console.log('paraa', req.body.params);
//     const res = await axios({
//       method: 'PATCH',
//       url,

//       data: {
//         images,
//       },
//       // data: null,

//       // data: {
//       //   images: images.splice(`${index - 1}`, 1),
//       // },
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Zdjęcie zostało usunięte!');
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
