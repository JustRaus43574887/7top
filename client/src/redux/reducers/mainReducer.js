const languageState = {
  ok: true,
  result: {
    _id: "5f0a1a3e793aef3e6c947ba1",
    language: "english",
    translation: {
      header: {
        text: "How it works",
        left: [
          "SevenTop - decentralized blockchain lottery on a smart contract with guaranteed payment of the winnings!",
          "The draw among ten participants — only one can become a winner. Purchasing a ticket, you get a sequential number in the list of participants, after selling the tenth ticket, the smart contract will randomly pick one winner and send the prize 85% of the collected amount to their wallet automatically.",
          "The rest of the games apply the same principle, but the number of participants is not limited; the draw takes place after time, and the winner is randomly determined. Each participant can easily check the draw’s fairness by the simple formula Within the famous independent live lottery, a combination of numbers is determined from 6 balls. 6 numbers drawn in a direct sequence make one integer, and the winner will depend on the remainder of the division of this number (MOD) by the number of participants. The second winner is determined in the same manner, but the composed number is used in reverse order. 10 minutes prior to the beginning of the live broadcast of the lottery, the sale of tickets is suspended, and the number of participants is recorded and cannot be changed.",
          "7TOP has a referral program. You can invite your friends, and, if your friend wins, you will definitely receive from 2.5 to 5% of the total draw amount, even if you did not participate in it.",
        ],
        right: [
          "Four drawing options are available on the main page:\r\n1) one winner out of ten\r\n2) drawing every week\r\n3) every 4 weeks\r\n4) every year.\r\nThe amount of winnings can exceed $250,000",
          "*You can purchase an unlimited number of tickets, thus increasing your chance to win!",
          "The prize is 85% of the collected amount, if the number of tickets is less than 10. If there are more than 10 tickets, the smart contract will determine 2 winners, and the prize will be 62,5% (the first place) and 22,5% (the second place) of the total collected amount. Laterеthe smart contract will automatically distribute the funds among the winners. Hence, you participate in a fair and open lottery!",
        ],
      },
      guarantee: {
        text: "THE PAYMENT TO THE WINNER IS GUARANTEED!",
        left: [
          "Smart contracts are published on the Tron and Ethereum blockchain networks (International decentralized cryptocurrencies).",
          "All transactions are made from member wallets.",
          "There is no way to influence the random algorithm of determining the winner in a smart contract.",
        ],
        right: [
          "All the transactions are public. Amounts are collected on a smart contract, instant payments after the drawing, cheating is excluded.",
          "It is impossible to change the algorithm or remove a participant from the list of applicants.",
          "It is easy to understand and immerse yourself in the world of cryptology even for those who have not encountered such projects!",
        ],
      },
      tronGuide: [
        "For visit 7top.org Download the Tronlink app or Google Chrome extension",
        "The Mobile Tronlink wallet App has a browser inside, with it you can Sign in 7top.org website",
        "You need 10trx for first SignUp",
      ],
    },
    page: {
      allgames: [
        "Max",
        "PLAY",
        "day",
        "hour",
        "Every week",
        "Every 4 weeks",
        "Super game",
        "Human",
        "Every year",
      ],
      account: [
        "Winners",
        "My friends",
        "All",
        "My wallet",
        "Login",
        "Registration",
        "Telegram chat",
      ],
      game: [
        "d",
        "h",
        "min",
        "sec",
        "Sum total",
        "Total participants",
        "BUY",
        "My tickets",
        "List of winners",
      ],
      winners: {
        first: "First",
        second: "Second",
        winner: "winner",
      },
    },
  },
};

export const currentLang = (
  state = localStorage.getItem("lang") || "english",
  action
) => {
  switch (action.type) {
    case "CURRENT_LANG":
      return action.payload;
    default:
      return state;
  }
};

export const me = (state = null, action) => {
  switch (action.type) {
    case "ME":
      return action.payload;
    case "ME_ERROR":
      localStorage.removeItem("token");
      return null;
    default:
      return state;
  }
};

export const allgames = (state = null, action) => {
  switch (action.type) {
    case "ALLGAMES":
      return action.payload;
    case "ALL_GAMES_PANDING":
      return state;
    default:
      return state;
  }
};

export const language = (state = languageState, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return action.payload;
    case "CHANGE_LANGUAGE_PANDING":
      return state;
    default:
      return state;
  }
};

const usersState = {
  allUsersLength: undefined,
  cursor: 0,
  hasMore: false,
  allUsers: [],
  loading: false,
  success: false,
};
export const users = (state = usersState, action) => {
  switch (action.type) {
    case "USERS_SUCCESS":
      return { ...state, success: false };
    case "USERS":
      return { ...action.payload, success: true, loading: false };
    case "USERS_LOADING":
      return { ...state, loading: true };
    case "LOAD_MORE_USERS":
      return {
        ...action.payload,
        loading: false,
        success: true,
        allUsers: [...state.allUsers, ...action.payload.allUsers],
      };
    default:
      return state;
  }
};

const friendsState = {
  total: undefined,
  cursor: 0,
  hasMore: false,
  friends: [],
  loading: false,
  success: false,
};
export const friends = (state = friendsState, action) => {
  switch (action.type) {
    case "FRIENDS_SUCCESS":
      return { ...state, success: false };
    case "FRIENDS":
      return { ...action.payload, success: true, loading: false };
    case "FRIENDS_LOADING":
      return { ...state, loading: true };
    case "LOAD_MORE_FRIENDS":
      return {
        ...action.payload,
        loading: false,
        success: true,
        friends: [...state.friends, ...action.payload.friends],
      };
    default:
      return state;
  }
};

const allWinnersState = {
  cursor: "",
  currentContract: "LimitLottery5",
  currentName: "FirstWinner",
  winners: [],
  loading: true,
  success: false,
};
export const allWinners = (state = allWinnersState, action) => {
  switch (action.type) {
    case "ALL_WINNERS_SUCCESS":
      return { ...state, success: false };
    case "ALL_WINNERS":
      return { ...action.payload, success: true, loading: false };
    case "ALL_WINNERS_LOADING":
      return { ...state, loading: true };
    case "LOAD_MORE_ALL_WINNERS":
      return {
        ...action.payload,
        loading: false,
        success: true,
        winners: [...state.winners, ...action.payload.winners],
      };
    default:
      return state;
  }
};
