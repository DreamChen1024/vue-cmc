const mutations = { // this.$store.commit('方法的名称', '传递唯一的参数')
    addToCar(state, carInfo) {
        // 点击加入购物车，把商品信息，保存到store 中的 car 上
        // 1.如果购物车中，之前就已经有了这个对应的商品了， 那么，只需要更新数量
        // 2. 如果没有，则直接把 商品数据， push 到 car 中

        //假设在购物车中， 没有找到对应的商品
        let flag = false

        state.car.some(item => {
            if (item.id == carInfo.id && item.count < carInfo.stock) {
                item.count += parseInt(carInfo.count)
                flag = true
                return true
            }
        })


        //如果最终，循环完毕，得到的 flag 还是 false， 则把商品数据直接 push 到购物车中
        if(!flag) {
            state.car.push(carInfo)
        }

        // 当更新car 之后， 把car 数组， 存储到本地的 localStorage 中
        localStorage.setItem('car', JSON.stringify(state.car))
    },
    buyAdd(state, id) {
        state.car.some(item => {
            if(item.id == id && item.count < item.stock) {
                item.count++ 
            }
        })
        localStorage.setItem('car', JSON.stringify(state.car))
    },
    buySub(state, id) {
        state.car.some(item => {
            if(item.id == id && item.count > 1) {
                item.count-- 
            }
        })
        localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeForCar(state, id) {
        //根据id, 从state 中的购物车中删除对应的那条商品数据
        state.car.some((item, i) => {
            if(item.id == id) {
                state.car.splice(i, 1)
                return true;
            }
        })
        // 将删除完毕后的,最新的购物车数据,同步到本地存储中
        localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
        state.car.some(item => {
            if(item.id == info.id) {
                item.selected = info.selected
            }
        })
    }

}
export default mutations