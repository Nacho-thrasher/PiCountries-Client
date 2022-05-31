import axios from 'axios';

export const GET_ALL = 'GET_ALL';
export const GET_ONE = 'GET_ONE';
export const CREATE_ACTIVITIES = 'CREATE_ACTIVITE';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_COUNTRIES_BY_ACTIVITY = 'GET_COUNTRIES_BY_ACTIVITY';
export const CLEAN_ACTIVITY = 'CLEAN_ACTIVITY';
export const GET_BY_NAME = 'GET_BY_NAME';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const CLEAN_MESSAGE = 'CLEAN_MESSAGE';

export const getAll = () => {
    return async (dispatch)=> {
        const res = await axios.get('http://localhost:3001/api/countries');
        const resActivities = await axios.get('http://localhost:3001/api/activities');
        dispatch({ type: GET_ALL, payload: [res.data, resActivities.data] });
    }
    //? why dispatch twice when fire once?
    
}
// export const getAll = () => {
//     //? two with promises axios
//     return (dispatch) => {
//         axios.get('http://localhost:3001/api/countries')
//         .then(res => {
//             axios.get('http://localhost:3001/api/activities')
//             .then(resActivities => {
//                 dispatch({ type: GET_ALL, payload: [res.data, resActivities.data] });
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//         })
// }}


export const getByName = (name) => {
    return async (dispatch)=> {
        const res = await axios.get(`http://localhost:3001/api/countries?name=${name}`);
        dispatch({ type: GET_BY_NAME, payload: res.data });
    }
}
export const getOne = (id) => {
    return async (dispatch)=> {
        const res = await axios.get(`http://localhost:3001/api/countries/${id}`);
        dispatch({ type: GET_ONE, payload: res.data });
    }
}
export const getActivities = () => {
    return async (dispatch)=> {
        const res = await axios.get('http://localhost:3001/api/activities');
        dispatch({ type: GET_ACTIVITIES, payload: res.data });
    }
}
export const addActivities = (activities, countries)=>{
    return async (dispatch)=>{
        const res = await axios.post('http://localhost:3001/api/activities', [activities, countries]);
        dispatch({ type: CREATE_ACTIVITIES, payload: res.data });
    }
}
export const getCountriesByActivity = (activity) => {
    return async (dispatch)=> {
        const res = await axios.get(`http://localhost:3001/api/countryActivity/${activity}`);
        dispatch({ type: GET_COUNTRIES_BY_ACTIVITY, payload: res.data });
    }
}
export const deleteActivity = (id) => {
    return async (dispatch)=> {
        const res = await axios.delete(`http://localhost:3001/api/activities/${id}`);
        dispatch({ type: DELETE_ACTIVITY, payload: res.data });
    }
}
//? clean activity
export const cleanActivity = () => {
    return async (dispatch)=> {
        dispatch({ type: CLEAN_ACTIVITY, payload: [] });
    }
}
//? clean message
export const cleanMessage = () => {
    return async (dispatch)=> {
        dispatch({ type: CLEAN_MESSAGE, payload: null });
    }
}

//# Login
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
//? action
export const login = (email, password) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:3001/api/auth', { email, password });
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    }
}

