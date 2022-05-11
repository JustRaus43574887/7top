const games = {
  LimitLottery5: "TRGCoM8ForcJhHXCE3RsWouF14V3rPixSu",
  LimitLottery15: "TArRpQXzAutbdn3rZfPmMQzHx2rn4uRGy5",
  LimitLottery50: "TSmijEjGX7F2MY9nUJbaiB1xqgVbN7bYvX",
  Everyweek5: "TYk1bmKpaASD8MHLXr6QipNYdtUAAHno4f",
  Everyweek50: "TKF9zmQpKHPgA9FxuSVHpogiucTGVRHBWN",
  Month5: "TVGniJKSx13v74zfwZL16pjvGUVf4xQynD",
  EveryYear5: "TBcYVCEM5Y2dXVGg7ojTyN6pHeuWnRThBf",
};

const addresses = {
  RefStorage: "TA2kGcLfZJhW8Mf6nBEjAQL2HLS8KwToE6",
  SevenTOP: "TQUWfMQmhuGGqYXfa3LNWXKAtoc1RZcgMV",
};

export const tronWeb = (
  state = { instance: null, ...games, ...addresses },
  action
) => {
  switch (action.type) {
    case "TRON_WEB":
      return { ...state, instance: action.payload };
    default:
      return state;
  }
};
