const glob = require("glob");
const config = require("config");
const path = require("path");
const jwt = require("jsonwebtoken");

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  cursorKey = "_id",
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex((item) => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item[cursorKey] ? item[cursorKey] : getCursor(item);

    // if there's still not a cursor, return false by

    return itemCursor ? cursor == itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

module.exports.getAvatarPath = ({ id = 0 }) => {
  const folderPath = path.resolve("avatars", "");
  const files = glob.sync(folderPath + `/${id}.*`);

  if (files.length > 0) {
    return "/static" + files[0].substring(config.get("slicePath"));
  } else {
    const defaultImgPath = path.resolve("avatars", "", "noavatar.jpg");
    return "/static" + defaultImgPath.substring(config.get("slicePath"));
  }
};

module.exports.verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({
      success: false,
      message: "No token provided",
    });

  try {
    const verified = jwt.verify(token, config.get("jwtSecret"));
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};
