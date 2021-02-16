import axios from '../plugins/axios';

export async function getCountries() {
    try {
        const res = await axios.get('/location/get-countries');
        return res;
    } catch(err) {
        console.log(err);
        Promise.reject(err);
    }
}

export async function getCountriesDb() {
    try {
      let count = 0;
      let arr;
      await getCountries().then((res) => {
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

