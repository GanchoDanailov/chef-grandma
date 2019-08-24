export default function (context) {
  console.log('[Middleware] isAuthenticated', context.store.getters['users/isAuthenticated']);
  if (!context.store.getters['users/isAuthenticated']) {
    context.redirect('/');
  }
}
