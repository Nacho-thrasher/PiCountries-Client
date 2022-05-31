import { GET_ALL, GET_ONE, 
        CREATE_ACTIVITIES, GET_ACTIVITIES, 
        GET_COUNTRIES_BY_ACTIVITY, CLEAN_ACTIVITY, 
        GET_BY_NAME, DELETE_ACTIVITY, 
        CLEAN_MESSAGE, LOGIN_SUCCESS
} from '../actions/index';

const initialState = {
    countries: [],
    country: {},
    countriesByName: [],
    activities: [],
    activity: [],
    user: null,
    message: null
}
//? mejor en countries all porq puedo tener un boton para resetear filtro
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                countries: action.payload[0],
                activities: action.payload[1]
            }
        case GET_ONE:
            console.log(action.payload.error);
            if (action.payload.error) {
                window.location.href = '/404-notFound';
            }
            return {
                ...state,
                country: action.payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case CREATE_ACTIVITIES:
            return {
                ...state,
                activity: action.payload,
                activities: [...state.activities, action.payload]
            }
        case GET_COUNTRIES_BY_ACTIVITY:
            return {
                ...state,
                countriesByActivity: action.payload
            }
        case CLEAN_ACTIVITY:
            return {
                ...state,
                activity: []
            }
        case GET_BY_NAME:
            return {
                ...state,
                countriesByName: action.payload
            }
        case DELETE_ACTIVITY:
            const actRes = state.activities.filter((act) => act.id_actividad !== action.payload.id);
            return {
                ...state,
                activities: [...actRes],
                message: action.payload.message
            }
        case CLEAN_MESSAGE:
            return {
                ...state,
                message: null
            }
        case LOGIN_SUCCESS:
        //? si resp ok es true, entonces el usuario esta logueado, setlocalstorage token y user
            if (action.payload.ok) {
                localStorage.setItem('token', action.payload.token);
                return {
                    ...state,
                    user: action.payload.usuario
                }
            }
            else{
                console.log(action.payload.message);
                return {
                    ...state,
                    message: action.payload.message
                }
            }                               
        
        default:
            return state;
    }
}
export default reducer;

//case LOGIN_SUCCESS:
// return localStorage.setItem('token', action.payload.token);