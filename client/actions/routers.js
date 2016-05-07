import uuid from 'node-uuid';

export const CREATE_ROUTER = 'CREATE_ROUTER';
export function createRouter(router) {
  return {
    type: CREATE_ROUTER,
    router: {
      id: uuid.v4(),
      startPoint: '/',
      endpoints: [],
      ...router,
    },
  };
}

export const MOVE_ROUTER = 'MOVE_ROUTER';
export function moveRouter({ sourceId, targetId }) {
  return {
    type: MOVE_ROUTER,
    sourceId,
    targetId,
  };
}
