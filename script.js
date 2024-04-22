'use strict';

//////////////////////////////////////////////////////////////////
// DATA
// We have different data now!
const account1 = {
  owner: 'Angelina Erege',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2019-05-27T17:01:17.194Z',
    '2019-07-11T23:36:17.929Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-03-08T14:11:59.604Z',
    '2020-03-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'ph-NG', // de-DE
};

const account2 = {
  owner: 'Ogochukwu Erege',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-01-25T14:18:46.235Z',
    '2019-02-05T16:33:06.386Z',
    '2019-03-10T14:43:26.374Z',
    '2019-04-25T18:49:59.371Z',
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-02-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Emmanuel Erege',
  movements: [100, 955.2, -306.5, 2500, -642.21, -133.9, 79.9, 1300],
  interestRate: 1.7, // %
  pin: 1122,

  movementsDates: [
    '2023-02-18T09:15:04.904Z',
    '2023-05-01T10:17:24.185Z',
    '2023-05-07T17:01:17.194Z',
    '2023-07-11T23:36:17.929Z',
    '2023-10-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-00T14:11:59.604Z',
    '2024-03-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'imo-NG', // de-DE
};

const account4 = {
  owner: 'Nelson Erege',
  movements: [1000, -235, -306.5, 2500, 604.21, -173, 80, 1300],
  interestRate: 1.7, // %
  pin: 2244,

  movementsDates: [
    '2023-01-10T09:15:04.904Z',
    '2023-03-09T10:17:24.185Z',
    '2023-04-07T17:01:17.194Z',
    '2023-08-20T23:36:17.929Z',
    '2023-10-18T21:31:17.178Z',
    '2023-12-25T07:42:02.383Z',
    '2024-02-04T14:11:59.604Z',
    '2024-03-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'ph-NG', // de-DE
};

const accounts = [account1, account2, account3, account4];

//////////////////////////////////////////////////////////////////
// APP
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// LEC 16)
// 1.
const startLogOutTimer = function () {
  // 3.
  // There is always this 1s delay after the app loads and the start of the timer. And also between logins. So let's export the timer callback into its own function, and run it right away
  const tick = function () {
    let minutes = String(parseInt(time / 60, 10)).padStart(2, '0');
    let seconds = String(parseInt(time % 60, 10)).padStart(2, '0');
    // console.log(minutes, seconds);

    // Displaying time in element and clock
    labelTimer.textContent = `${minutes}:${seconds}`;

    // Finish timer
    if (time === 0) {
      // We need to finish the timer, otherwise it will run forever
      clearInterval(timer);

      // We log out the user, which means to fade out the app
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }

    // Subtract 1 second from time for the next iteration
    time--;
  };

  // Setting time to 5 minutes in seconds
  let time = 10 * 60;
  // let time = 10;

  tick();
  const timer = setInterval(tick, 1000);

  // LATER
  return timer;
};

const printWelcome = function (name) {
  const now = new Date();
  const greetings = new Map([
    [[6, 7, 8, 9, 10], 'Good Morning'],
    [[11, 12, 13, 14], 'Good Day'],
    [[15, 16, 17, 18], 'Good Afternoon'],
    [[19, 20, 21, 22], 'Good Evening'],
    [[23, 0, 1, 2, 3, 4, 5], 'Good Night'],
  ]);

  const arr = [...greetings.keys()].find(key => key.includes(now.getHours()));
  const greet = greetings.get(arr);
  labelWelcome.textContent = `${greet}, ${name}!`;
};

// LEC 9)
// 2.
const formatMovementDate = function (date, locale) {
  // LEC 12) add locale
  const calcDaysPassed = (date1, date2) =>
    Math.round((date1 - date2) / (60 * 60 * 24 * 1000));
  const now = new Date();
  const daysPassed = calcDaysPassed(now, date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// LEC 8)
// const printMovements = function(movements) {
const printMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const mov = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  mov.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // LEC 8)
    let printDate = '';
    if (account.movementsDates) {
      const date = new Date(account.movementsDates[i]);

      // LEC 9)
      printDate = formatMovementDate(date, account.locale);
      // const day = `${date.getDate()}`.padStart(2, '0');
      // // Remember that MONTHS are 0-based!
      // const month = `${date.getMonth() + 1}`.padStart(2, '0');
      // const year = date.getFullYear();
      // printDate = `${day}/${month}/${year}`;
    }

    // LEC 14)
    // Now we can finally use the user's locale and account currency!
    // const formattedMov = new Intl.NumberFormat(account.locale, {
    //   style: 'currency',
    //   currency: account.currency,
    //   // currency: 'USD',
    // }).format(mov);
    const formattedMov = formatCur(mov, account.locale, account.currency);

    // LEC 4) + 14)
    // <div class="movements__value">${mov.toFixed(2)}€</div>
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${printDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// printMovements(account1.movements);
printMovements(account1);

const createUsernames = function (accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

// LEC 14)
// const calcPrintBalance = function(movements) {
const calcPrintBalance = function (account) {
  const balance = account.movements.reduce((accum, cur) => accum + cur, 0);
  currentAccount.balance = balance;

  // LEC 4)
  // labelBalance.textContent = `${balance}€`;
  // labelBalance.textContent = `${balance.toFixed(2)}€`;

  // LEC 14)
  labelBalance.textContent = formatCur(
    balance,
    account.locale,
    account.currency
  );
};

const calcPrintSummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  // LEC 4) The .20 looks a lot nicer that the .2 we had before
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  // LEC 14)
  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  // LEC 4)
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  // LEC 14)
  labelSumOut.textContent = formatCur(
    Math.abs(out),
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (currentAccount.interestRate / 100))
    .filter(int => int > 1)
    .reduce((acc, cur) => acc + cur, 0);
  // LEC 4)
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;

  // LEC 14)
  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency
  );
};

//////////////////////////////////////////////////////////////////
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount && currentAccount.pin === +inputLoginPin.value) {
    console.log(currentAccount);

    // Reset input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Log in!
    containerApp.style.opacity = 100;

    // LEC 16)
    // 2.
    // If there is already a timer, then cancel it!
    if (timer) clearInterval(timer);

    // 1.
    // Start 5 minutes timer to log out user automatically)
    timer = startLogOutTimer();

    // 2.

    // Print welcome message
    // LEC 10)
    // labelWelcome.textContent = `Welcome back, ${
    //   currentAccount.owner.split(' ')[0]
    // }!`;
    printWelcome(`${currentAccount.owner.split(' ')[0]}`);

    // LEC 12)
    // 1.
    // Set current date and time!
    const now = new Date();
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Test with JD first, then with JS

    // Print movements
    // LEC 8)
    printMovements(currentAccount);

    // LEC 14)
    // Print balance
    calcPrintBalance(currentAccount);

    // Print summary
    calcPrintSummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);
  const amount = +inputTransferAmount.value;

  if (
    receiver &&
    amount &&
    currentAccount.balance >= amount &&
    receiver.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);

    // LEC 8)
    // 3.
    currentAccount.movementsDates.push(new Date());
    receiver.movementsDates.push(new Date());

    // LEC 8)
    printMovements(currentAccount);

    // LEC 14)
    calcPrintBalance(currentAccount);
    calcPrintSummary(currentAccount);
    clearInterval(timer);
    timer = startLogOutTimer();
  }

  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (currentAccount.movements.some(mov => mov >= amount / 10) && amount > 0) {
    currentAccount.movements.push(amount);

    // LEC 8)
    // 3.
    currentAccount.movementsDates.push(new Date());

    // LEC 15)
    // 5.
    setTimeout(() => {
      // LEC 8)
      printMovements(currentAccount);

      // LEC 14)
      calcPrintBalance(currentAccount);
      calcPrintSummary(currentAccount);
    }, 2500);

    // LEC 16)
    // 4.
    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function () {
  printMovements(currentAccount, !sorted);

  // if (!sorted) {
  //   printMovements(currentAccount.movements.slice().sort((a, b) => a - b));
  // } else {
  //   printMovements(currentAccount);
  // }
  sorted = !sorted;
});

// let sorted = false;
// btnSort.addEventListener('click', function () {
//   if (!sorted) {
//     // We need to create a copy, otherwise the original array will be mutated, and we don't want that
//     printMovements(currentAccount.movements.slice().sort((a, b) => a - b));
//     // Here, for example, I'm using slice and not ... because I'm in the middle of a chain here, and so it's more useful to just keep chaining
//   } else {
//     printMovements(currentAccount.movements);
//   }
//   // We need to flip sorted, so that in the next click, the opposite happens
//   sorted = !sorted;
// });
