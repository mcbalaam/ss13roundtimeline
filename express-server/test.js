const axios = require('axios')

axios.get(`https://15f5-95-104-185-246.ngrok-free.app/api/rounds`)
.then(response => {
	console.log(response.data.length);
})
.catch(error => {
	console.error(error);
});

