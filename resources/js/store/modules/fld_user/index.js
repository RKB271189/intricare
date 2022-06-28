function initialstate() {
    return {
        loading: false,
        user: [],
        crt_updt_user: {
            id: null,
            name: null,
            email: null,
            phoneno: null,
            gender: 'male',
            image: null,
        },        
    }
}
const getters = {
    loading: state => state.loading,
    user: state => state.user,
    crt_updt_user: state => state.crt_updt_user,
}

const actions = {
    fetchdata({ commit }) {
        commit('setloading', true);
        axios.get('/user/summary')
            .then((response) => {
                let details = response.data;
                console.log(details);
                commit('setuser', details);
            }).catch((error) => {
                //Display error in sweet alert
            }).finally(() => {
                commit('setloading', false);
            })
    },
    deletedata({ commit }, value) {
        commit('setloading', true);
        return new Promise((resolve, reject) => {
            let id = value;
            let message = '';
            axios.get('/user/delete/' + id)
                .then((response) => {
                    message = response.data;
                }).catch(error => {
                    reject(error.response.data);
                }).finally(() => {
                    commit('setloading', false);
                    resolve(message);
                });
        });
    },
    createdata({ commit, state }) {
        commit('setloading', true);
        let message = '';
        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.crt_updt_user);
            let data = new FormData();
            data.append('name', params.name);
            data.append('email', params.email);
            data.append('phoneno', params.phoneno);
            data.append('gender', params.gender);
            data.append('image', params.image);
            let config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post('/user/create', data, config)
                .then((response) => {
                    message = response.data;
                }).catch(error => {
                    reject(error.response.data);
                }).finally(() => {
                    commit('setloading', false);
                    resolve(message);
                });
        });
    },
    fetcheditdata({ commit }, value) {
        commit('setloading', true);
        axios.get('/user/get/' + value)
            .then((response) => {
                let details = response.data;
                commit('mutateuser', details);
            }).catch((error) => {
                //Display error in sweet alert                
            }).finally(() => {
                commit('setloading', false);
            });
    },
    updatedata({ commit, state }) {
        commit('setloading', true);
        let message = '';
        return new Promise((resolve, reject) => {
            let params = _.cloneDeep(state.crt_updt_user);
            let data = new FormData();
            data.append('id', params.id);
            data.append('name', params.name);
            data.append('email', params.email);
            data.append('phoneno', params.phoneno);
            data.append('gender', params.gender);
            data.append('image', params.image);
            let config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post('/user/update', data, config)
                .then((response) => {
                    message = response.data;
                }).catch(error => {
                    reject(error.response.data);
                }).finally(() => {
                    commit('setloading', false);
                    resolve(message);
                });
        });
    },
    resetstate({ commit }) {
        commit('resetstate');
    },
    setname({ commit }, value) {
        commit('mutatename', value);
    },
    setemail({ commit }, value) {
        commit('mutateemail', value);
    },
    setphone({ commit }, value) {
        commit('mutatephone', value);
    },
    setgender({ commit }, value) {
        commit('mutategender', value);
    },
    setimage({ commit }, value) {
        commit('mutateimage', value);
    }
}

const mutations = {
    resetstate(state) {
        state = Object.assign(state, initialstate());
    },
    setloading(state, status) {
        state.loading = status;
    },
    setuser(state, user) {
        state.user = user;
    },
    mutatename(state, value) {
        state.crt_updt_user.name = value;
    },
    mutateemail(state, value) {
        state.crt_updt_user.email = value;
    },
    mutatephone(state, value) {
        state.crt_updt_user.phoneno = value;
    },
    mutategender(state, value) {
        state.crt_updt_user.gender = value;
    },
    mutateuser(state, user) {
        state.crt_updt_user = user;
    },
    mutateimage(state, value) {
        state.crt_updt_user.image = value;
    }
}

export default {
    namespaced: true,
    state: initialstate,
    getters,
    actions,
    mutations
}