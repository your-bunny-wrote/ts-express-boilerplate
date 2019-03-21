export const sendResponse = (req, res, status, data, meta = null) => {
  if (data.errors !== undefined) {
    return res.status(status).json({
      status,
      errors: data.errors,
    });
  }
  res.status(status).json({
    status,
    data,
    _meta: meta === null ? undefined : meta,
  });
};
