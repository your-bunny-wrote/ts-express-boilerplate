export const sendResponse = (req, res, status, data, meta = null) => {
  res.status(status).json({
    status,
    data,
    _meta: meta === null ? undefined : meta,
  });
};
