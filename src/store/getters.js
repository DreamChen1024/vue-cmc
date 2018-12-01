const getters = {
    getAllCount(state) {
        var c = 0;
        state.car.forEach(item => {
            c += item.count
        });
        return c
    },
    getGoodsCount(state) {
        var o = {}
        state.car.forEach(item => {
            o[item.id] = item.count
        })
        return o
    },
    getGoodsSelected(state) {
        var s = {}
        state.car.forEach(item => {
            s[item.id] = item.selected
        })
        return s
    },
    getGoodsCountAndAmount(state) {
        var c = {
            count: 0, //勾选的数量
            amount: 0 //勾选的总价
        }
        state.car.forEach(item => {
            console.log(state.car)
            if(item.selected) {
                c.count += item.count
                c.amount += item.price * item.count
            }
        })
        return c
    }
}

export default getters