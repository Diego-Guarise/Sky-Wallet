import { createStore } from "redux";

const initialState = {
    password: false,
    address: [],
    seed: false,
    login: false,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PASSWORD":
            return {
                ...state,
                password: action.password,
            };
        case "SET_ADDRESS":
            return {
                ...state,
                address: action.address,
            };
        case "SET_LOGIN":
            return {
                ...state,
                login: action.login,
            };
        case "SET_SEED":
            return {
                ...state,
                seed: action.seed,
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

const getStore = () => {
    return store;
}

export default getStore;
