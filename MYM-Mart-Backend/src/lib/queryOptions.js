class MyQueryOptions {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // search products based on keywords
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

  // paginate products based on page number and limit number
  paginate() {
    const page = this.queryStr.page ? parseInt(this.queryStr.page, 10) : 1;
    const limit = this.queryStr.limit ? parseInt(this.queryStr.limit, 10) : 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = MyQueryOptions;

/*
 * // ! SEARCHING, SORTING, LIMIT & PAGINATION
 * // ? Search --> products based on keywords [*IMPLEMENTED]
 * // ? Paginate --> products based on page number and limit number [*IMPLEMENTED]
 * // ? Sort --> products based on price (High to Low)
 * // ? Sort --> products based on price (Low to High)
 * // ? Sort --> products based on name (A to Z)
 * // ? Sort --> products based on name (Z to A)
 * // ? Sort --> products based on createdAt (Newest to Oldest)
 * // ? Sort --> products based on createdAt (Oldest to Newest)
 * // ? Sort --> products based on most rated products
 * // ? Sort --> products based on most sold products
 *
 */
