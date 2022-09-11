class MyQueryHelper {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // search based on keywords
  search() {
    const keyword = this.queryStr.keyword
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i'
        }
      }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // paginate based on page and limit number
  paginate() {
    // eslint-disable-next-line radix
    const page = this.queryStr.page ? parseInt(this.queryStr.page, 10) : 1;
    const limit = this.queryStr.limit ? parseInt(this.queryStr.limit, 10) : 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = MyQueryHelper;

/*
 * // ! SEARCHING, SORTING, LIMIT & PAGINATION
 * // ? Search --> based on keywords [*IMPLEMENTED]
 * // ? Paginate --> based on page and limit number [*IMPLEMENTED]
 * // ? Sort --> based on acceding or defending order
 *
 */
