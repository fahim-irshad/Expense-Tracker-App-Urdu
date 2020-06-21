import React, { useContext, useState } from 'react';
import { TransactionContext } from './transContext';


function Child() {
    let { transactions, addTransaction,delTransaction } = useContext(TransactionContext);
    let [newDesc, setDesc] = useState("");
    let [newAmount, setAmount] = useState(0);
    console.log(transactions)

    const handleAddition = (event) => {
        event.preventDefault();
        if (Number(newAmount) === 0) {
            alert("Please enter correct value");
            return false;
        }
        addTransaction({
            
            amount: Number(newAmount),
            desc: newDesc,
            id:transactions.length,
        });

        setDesc('');
        setAmount(0)
    }
    
    const getIncome = () => {
        let income = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount > 0)
                income = income + transactions[i].amount
        }
        return income;
    }

    const getExpense = () => {
        let expense = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount < 0)
                expense += transactions[i].amount
        }
        return expense;
    }

    return (
        <div className="container">
            <h1 className="text-center">Expense Tracker</h1>

            <h3>Your Balance <br /> ${getIncome() + getExpense()}</h3>

            <div className="expense-container">
                <h3>INCOME <br /> ${getIncome()}</h3>
                <h3>EXPENSE <br /> ${getExpense()}</h3>
            </div>

            <h3>History</h3>
            <hr />

            <ul className="trnsaction-list">
                {transactions.map((transObj,idx) => {
                    return (<li key={idx}>
                        <span>{transObj.desc}</span>
                        <span>${transObj.amount}</span>
                        <button className="delete-btn" type="button" onClick={() => delTransaction({id:transObj.id})}>
      x
    </button>
                    </li>
                    )
                })}

            </ul>

            <h3>Add new transaction</h3>
            <hr />

            <form className="transaction-form" onSubmit={handleAddition}>
                <label>
                    Description <br />
                    <input type="text"
                        value={newDesc}
                        placeholder="Enter Transaction Details"
                        onChange={(ev) => setDesc(ev.target.value)}
                        required />
                </label>

                <br />
                <label>
                    Amount (+ve Income, -ve Expense)<br />
                    <input type="number"
                        value={newAmount}
                        placeholder="Amount(+v Income, -ve Expense)"
                        onChange={(ev) => setAmount(ev.target.value)}
                        required />
                </label>
                <br />
                <input type="submit" value="Add Transaction" />
            </form>
        </div>
    );
}

export default Child;