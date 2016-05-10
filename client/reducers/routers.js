// import update from 'react/lib/update';

export default function routeReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_ROUTER':
      return [...state, action.router];
    case 'CREATE_ENDPOINT':
      return state.slice().map(router => {
        if (router.id === action.routerId) {
          const newRouter = Object.assign({}, router);
          newRouter.endpoints.push(action.endpoint);
          return newRouter;
        }
        return router;
      });
    case 'MOVE_ENDPOINT':
      // Determine if Endpoint is moving within the same router
      if (action.sourceRouterIndex === action.targetRouterIndex) {
        return state.map((router, index) => {
          if (index === action.sourceRouterIndex) {
            // Find the index of the endpoint within array
            const sourceEndpointIndex = router.endpoints
              .findIndex(endpoint =>
                endpoint.id === action.sourceId
              );
            // Make a copy of the endpoint
            const sourceEndpoint = Object.assign({}, router.endpoints[sourceEndpointIndex]);
            // Make a copy of the endpoints array & remove the old endpoint
            const newEndpoints = router.endpoints.slice();
            newEndpoints.splice(sourceEndpointIndex, 1);
            // Find the index of the targeted endpoint in the endpoints array
            const targetEndpointIndex = router.endpoints
              .findIndex(endpoint =>
                endpoint.id === action.targetId
              );
            // Insert the source endpoint into the endpoints array
            newEndpoints.splice(targetEndpointIndex, 0, sourceEndpoint);
            // Update the router with the new endpoints
            return Object.assign({}, router, {
              endpoints: newEndpoints,
            });
          }
          return router;
        });
      }
      return state;
    default:
      return state;
  }
}
