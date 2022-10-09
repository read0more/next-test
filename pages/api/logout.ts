import { withSessionRoute } from 'lib/withSession';

export default withSessionRoute(async (req, res) => {
  req.session.destroy();
  let redirectTo = req.query?.redirectTo;
  redirectTo = Array.isArray(redirectTo) ? redirectTo[0] : redirectTo;

  if (redirectTo) {
    return res.redirect(redirectTo);
  }

  res.send({ ok: true });
});
