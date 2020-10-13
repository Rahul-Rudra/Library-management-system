module.exports = function paginatedResults(model) {
  return async (req, res, next) => {
    const sortBy = req.query.sortBy;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalData = await model.countDocuments().exec();
    const totalPage = Math.ceil(totalData / limit);
    //console.log(totalPage); console.log(totalData);
    if (page > totalPage) {
      return res.status(404).json({ msg: "does not exists" });
    }
    const results = {};
    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model
        .find()
        .sort(sortBy)
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
};
