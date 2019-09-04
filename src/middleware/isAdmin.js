export default function (context) {
  console.log('[Middleware] isAdmin', context.store.getters['users/isAdmin']);
  if (!context.store.getters['users/isAdmin']) {
    context.redirect('/login');
  }
}
