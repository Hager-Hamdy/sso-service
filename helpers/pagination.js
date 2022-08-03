const getPagination = (currentPage, pageSize) => {
  const limit = pageSize ? +pageSize : 10;
  const offset = currentPage ? (currentPage-1) * limit : 0;
  return {limit, offset};
}

const getPagingData = (data, currentPage, pageSize) => {
  const { count: totalItems, rows } = data;
  const _currentPage = currentPage ? +currentPage : 1;
  const totalPages = Math.ceil(totalItems / pageSize);
  return { totalItems, data: rows, totalPages, currentPage: _currentPage };
}

module.exports = {
  getPagination,
  getPagingData
}