import axios from '../plugins/axios';

export async function getCities(CITY_INDEX) {
    try {
        const res = await axios.get(`location/get-cities/${CITY_INDEX}`);
        return res;
    } catch(err) {
        console.log(err);
        Promise.reject(err);
    }
}

export async function getCitiesDb(CITY_INDEX) {
    try {
      let count = 0;
      let arr;
      await getCities(CITY_INDEX).then((res) => {
        Object.values(res).reduce((acc, item) => {
          acc[item] = ++count;
          arr = acc;
          return acc;
        }, {});
      });
      
      return arr;
    } catch (error) {
      return Promise.reject(error);
    }
  }

