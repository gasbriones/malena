var axios = require('axios');
module.exports = {
    getData: function (src){
        return axios.get(src);
    }
}
