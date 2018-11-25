const getters = {
    getAllCount(state) {
        var c = 0;
        state.car.forEach(item => {
            c += item.count
        });
        return c
    }
}

export default getters