import { DECREASE, INCREASE, CLEAR_CART, REMOVE, GET_TOTALS } from "./actions"

const reducer = (state, action) => {
    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] }
    }

    if (action.type === INCREASE) {
        let tempCart = state.cart.map(cartItem => {
            if (cartItem.id === action.payload.id) {
                cartItem = { ...cartItem, amount: cartItem.amount + 1 }
            }
            return cartItem
        })
        return { ...state, cart: tempCart }
    }

    if (action.type === DECREASE) {
        let tempCart = state.cart.map(cartItem => {
            if (cartItem.id === action.payload.id) {
                cartItem = { ...cartItem, amount: cartItem.amount - 1 }
            }
            return cartItem
        })


        return { ...state, cart: tempCart }
    }

    if (action.type === REMOVE) {
        return {
            ...state, cart: state.cart.filter((cartItem) =>
                cartItem.id !== action.payload.id)
        }
    }

    // calculating cart items in total and total price
    if (action.type === GET_TOTALS) {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {

            const { price, amount } = cartItem
            const itemTotal = price * amount

            cartTotal.total += itemTotal
            cartTotal.amount += amount
            return cartTotal
        }, {
            total: 0,
            amount: 0
        })
        total = parseFloat(total.toFixed(2))
        return { ...state, total, amount }
    }
    return state
}

export default reducer


// There is an error on the switch statement
    // switch (action.type) {
    //     case CLEAR_CART: return { ...state, cart: [] }; break;
    //     case INCREASE: return console.log("INCREASEd"); break;
    //     case DECREASE: return console.log("DECREASEd"); break;
    //     case REMOVE: return console.log("REMOVEd"); break;
    //     default: return state
    // }