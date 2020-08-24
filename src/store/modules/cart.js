import { addGoodsApi, initCartApi } from "@/api/ShopCart.js";
import { Message } from "element-ui";

const cart = {
    state: {
        goods_arr: []
    },
    mutations: {
        ADD_GOODS: (state, goods) => {
            for (const sGoods of state.goods_arr) {
                if (goods.dataUuid == sGoods.dataUuid) {
                    return;
                }
            }
            state.goods_arr.push(goods)
        },
        DEL_GOODS: (state, goodsId) => {
            let gi = 0
            for (let i = 0; i < state.goods_arr.length; i++) {
                if (state.goods_arr[i].dataUuid == goodsId) {
                    gi = i;
                    break;
                }
            }
            state.goods.splice(gi, 1)
        }
    },
    actions: {
        addGoods({ commit }, goods) {
            commit('ADD_GOODS', goods);
            return new Promise((resolve, reject) => {
                addGoodsApi(goods).then(res => {
                    Message.success({
                        message: '添加成功',
                        duration: 500
                    })
                    resolve(true);
                }).catch(e=> {
                    commit('DEL_GOODS', goods.dataUuid)
                    reject(false);
                })
            })
        },
        initCart({ commit }, data) {
            return new Promise((resolve, reject) => {
                initCartApi(data.username).then(res => {
                    for (const goods of res) {
                        const goodsItem = {
                            dataUuid: goods.dataUuid,
                            username: data.username,
                            type: goods.type,
                            price: goods.price,
                            sellerName: goods.sellerName,
                            name: goods.name,
                            cartUuid: goods.cartUuid
                        }
                        commit('ADD_GOODS', goodsItem)
                        resolve(true);
                    }
                })
            })
        }
    }
}

export default cart;