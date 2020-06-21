import React, { createContext, useReducer } from "react";
import TransactionReducer from './transReducer';

const initialTransactions = [
    { amount: 500, desc: "Salary",id:0 },
    { amount: -100, desc: "Utiiliy Bills",id:1 },
    

]

export const TransactionContext = createContext(initialTransactions);

export const TransactionProvider = ({children})=> {
    let [state, dispatch] = useReducer(TransactionReducer, initialTransactions);

    function addTransaction(transObj){
        dispatch({
            type: "ADD_TRANSACTION",
            payload: { 
                
                amount: transObj.amount, 
                desc: transObj.desc,
                id:transObj.id, 
            }
        })
    }
    function delTransaction(transObj){
        dispatch({
            type: "DEL_TRANSACTION",
            payload: {id:transObj.id}
            
        })
    }

    return(
        <TransactionContext.Provider value={{
            transactions: state,
            addTransaction,
            delTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}