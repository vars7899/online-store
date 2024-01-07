// Default pending status update
export const $pendingHandler = (state) => {
  state.isLoading = true;
};

// Default rejection status update
export const $rejectionHandler = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
};

// Default fulfill status update
export const $fulfilledHandler = (state, action) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.message = action.payload.message;
};
