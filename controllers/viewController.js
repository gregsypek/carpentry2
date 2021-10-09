exports.getHomePage = (req, res) => {
  res.status(200).render('home', {
    title: 'Schody Zaliński',
  });
};

exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Nasza oferta',
  });
};
exports.getStairs = (req, res) => {
  res.status(200).render('stairs', {
    title: 'Schody proste',
  });
};
