const routes = (app) => {

    app.route('/contact')
    .get((req, res) =>
       res.send('Get request successfull.')
    )
    .post((req, res) =>
      res.send('Post request successfull.')
    )

    app.route('/contact/contactid')
    .put((req, res) =>
      res.send('Put request successfull.')
    )
    .delete((req, res) =>
      res.send('Delete request successfull.')
    )
}

export default routes;
