

let navigator;

export const setNavigator = (navFn) => {
  navigator = navFn;
};

export const navigate = (...args) => {
  if (navigator) {
    navigator(...args);
  } else {
    console.warn('Navigator is not set');
  }
};
