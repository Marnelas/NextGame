import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
          baseURL: `${process.env.REACT_APP_URL}auth`,
          withCredentials: true
        });
    }

    signup = (username, password, email, imageUrl) => {
        return this.service.post('/signup', { username, password, email, imageUrl })
            .then(response => response.data)
    }

    login = (email, password) => {
        return this.service.post('/login', { email, password})
            .then(response => response.data)
            .catch(err=>console.log({err}))
    }

    logout = () => {
        return this.service.post('/logout', {})
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    }
    twitch = () => {
        return this.service.get("/twitch")
            
    
    }
     handleUpload = theFile => {
        return this.service.post('/upload', theFile, { withCredentials: true })
            .then(res => res.data)
            .catch(err => console.log(err));
    }
}