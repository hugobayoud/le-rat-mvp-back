import { Timestamp } from 'firebase/firestore';
import { signOut, getAuth } from 'firebase/auth';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ref, onValue, push, child, update, remove } from 'firebase/database';

import { useAuthState, database } from '../utils/firebase.config';

const groupId = 'one';

/**
 * Expense DATA STRUCTURE
 *    description: string,
 *    purchaser: userId,
 *    timestamp: timestamp,
 *    total: number,
 *    beneficiaries: {
 *      userId: true
 *    }
 *
 *
 * https://www.robinwieruch.de/react-hooks-fetch-data/
 */

function ExpensesPage() {
  const expenseAmount = useRef();
  const expenseDescription = useRef();
  const { user } = useAuthState();
  const [expenses, setExpenses] = useState({});

  const expensesMemo = useMemo(() => {
    return expenses;
  }, []);

  useEffect(() => {
    const groupExpensesRef = ref(database, `expenses/${groupId}`);
    onValue(groupExpensesRef, (snapshot) => {
      const res = snapshot.val() ?? {};
      console.log(res);

      setExpenses(Object.entries(res));
    });
  }, [expensesMemo]);

  const handleNewExpense = async (e) => {
    e.preventDefault();

    const userId = user.uid;

    const data = {
      description: expenseDescription.current.value ?? 'no-description',
      total: +expenseAmount.current.value * 100,
      beneficiaries: {
        [userId]: true,
      },
      purchaser: userId,
      timestamp: Timestamp.fromDate(new Date()),
    };

    const newExpenseKey = push(
      child(ref(database), `/expenses/${groupId}`)
    ).key;

    try {
      update(ref(database, `/expenses/${groupId}/${newExpenseKey}`), data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogout()}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
      <h3>Hello {user?.displayName}!</h3>

      <form onSubmit={(e) => handleNewExpense(e)}>
        <input
          type="text"
          placeholder="description"
          name="expense description"
          id="expense-description"
          ref={expenseDescription}
        />
        <input
          type="number"
          placeholder="amount"
          name="expense amount"
          min="0"
          id="expense-amount"
          ref={expenseAmount}
          required
        />
        <button type="submit">+++</button>
      </form>

      <hr />

      <ExpensesList expenses={expenses} />
    </div>
  );
}

async function handleLogout() {
  const auth = getAuth();

  await signOut(auth);
}

function handleDeleteExpense(e, expenseId) {
  e.preventDefault();

  remove(ref(database, `/expenses/${groupId}/${expenseId}`));
}

function ExpensesList({ expenses }) {
  if (!expenses?.length) {
    return <div>No expenses yet</div>;
  }

  const expensesItems = expenses.map((expense, index) => {
    const [key, value] = expense;

    return (
      <li className="expense-item" key={key}>
        {`${value.description} | ${value.total / 100}€   `}
        <button onClick={(e) => handleDeleteExpense(e, key)}>X</button>
      </li>
    );
  });

  return <ul className="expenses-list">{expensesItems}</ul>;
}

export default ExpensesPage;
