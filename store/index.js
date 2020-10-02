export const state=()=>({
    connected:false,
    users:0

})

export const mutations={
    connected_users(){
        store.state.users=+1;
        store.state.connected=true;
    }

}

export const actions={
    functions(context){
        context.commit('connected_users');

    }
}