const getters = {
  
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  reviewController: state => state.reviewController.reviewController,
}
export default getters
