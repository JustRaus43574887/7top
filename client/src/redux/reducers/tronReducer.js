export const contract = (state = null, action) => {
  switch (action.type) {
    case "CONTRACT":
      return action.payload;
    default:
      return state;
  }
};

export const balance = (state = 0, action) => {
  switch (action.type) {
    case "BALANCE":
      return action.payload;
    case "BALANCE_PANDING":
      return 0;
    default:
      return state;
  }
};

export const owners = (
  state = { total: 0, cursor: null, hasMore: false, owners: [] },
  action
) => {
  switch (action.type) {
    case "OWNERS":
      return action.payload;
    case "LOAD_MORE_OWNERS":
      return {
        ...action.payload,
        owners: [...state.owners, ...action.payload.owners],
      };
    case "BUY":
      return {
        ...state,
        total: state.total + 1,
        owners:
          state.total === state.owners.length
            ? [
                ...state.owners,
                { ...action.payload, cursorKey: state.owners.length },
              ]
            : state.owners,
      };
    default:
      return state;
  }
};

export const winners = (state = [], action) => {
  switch (action.type) {
    case "WINNERS_PANDING":
      return [];
    case "WINNERS":
      return action.payload;
    default:
      return state;
  }
};

export const balls = (state = {}, action) => {
  switch (action.type) {
    case "BALLS_PANDING":
      return {};
    case "BALLS":
      return action.payload[0];
    default:
      return state;
  }
};
