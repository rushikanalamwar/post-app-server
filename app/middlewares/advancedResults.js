const advancedResults = (model, populate) => async (req, res, next) => {
  try {
    let query;
    let reqQuery = { ...req.query, deleted: false };
    switch (model.collection.collectionName) {
      default:
        break;
    }

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in|and|or)\b/g,
      (match) => `$${match}`
    );

    // Finding resource
    query = model.find(JSON.parse(queryStr));
    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-updatedAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    if (req.query.limit || req.query.page) {
      query = query.skip(startIndex).limit(limit);
    }
    if (populate) {
      populate.map((p) => {
        query = query.populate(p);
      });
    }

    //query = query.cache({ expire: 15 * 60 })
    // Executing query
    const results = await query;

    // Pagination result
    const pagination = {};

    if (req.query.limit || req.query.page) {
      if (endIndex < total) {
        pagination.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit,
        };
      }
    }

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = advancedResults;
