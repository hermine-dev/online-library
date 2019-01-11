import axiosApi from '../../axiosApi'

// initial state
const state = {};

// getters
const getters = {};

// actions
const actions = {
    search({commit, state}, payload) {
        return axiosApi.post(`/books/search`, {q: payload.q})
        .then(response => {
            return response.data
        })
        .catch(e => {
            return e.response
        });
    }
};

// mutations
const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
