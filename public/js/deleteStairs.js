/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

//type is either 'password' or 'data'
export const deleteStairs = async (dataId) => {
  try {
    const url = `http://localhost:3000/api/v1/stairs/${dataId}`;

    const res = await axios({
      method: 'DELETE',
      url,
      data: null,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Wybrana kategoria została usunięta!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
