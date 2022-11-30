const fs = require("fs").promises;
const { pathJoin, typeFile } = require("./folder_info");

function rename(req, res) {
  const url = req.url.split("/");
  url.pop();
  const oldDirName = pathJoin(req.url);
  const newDirName = pathJoin(`${url.join("/")}/${req.body.name}`);
  fs.rename(oldDirName, newDirName)
    .then((e) => res.send("file renamed"))
    .catch((err) => res.status(404).send(err));
}

function copyFile(req, res) {
  const url = req.url.split("/");
  url.pop();
  const oldDirName = pathJoin(req.url);
  const newDirName = pathJoin(`${url.join("/")}/${req.body.name}`);
  fs.copyFile(oldDirName, newDirName)
    .then((e) => res.send("file copied"))
    .catch((err) => res.status(404).send(err));
}

function fileDelete(req, res, next) {
  const url = req.url.split("/");
  const file = url[url.length - 1].split(".")[1];
  if (typeFile(req)) {
    fs.unlink(pathJoin(req.url))
      .then((e) => res.send("file deleted"))
      .catch((err) => res.status(404).send(err));
  } else next();
}

function folderDelete(req, res, next) {
  fs.rmdir(pathJoin(req.url))
    .then((e) => res.send("file deleted"))
    .catch((err) => res.status(404).send(err));
}

function getFile(req, res, next) {
  const url = req.url.split("/");
  const file = url[url.length - 1].split(".")[1];
  if (typeFile(req)) {
    res.sendFile(pathJoin(req.url));
  } else next();
}

function getFolder(req, res) {
  fs.readdir(pathJoin(req.url), {
    withFileTypes: true,
  })
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
}

const getInfo = (req, res) => {
  const path = pathJoin(req.url).substring(
    0,
    pathJoin(req.url).indexOf("info")
  );
  fs.stat(path)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
};
module.exports = {
  rename,
  copyFile,
  fileDelete,
  folderDelete,
  getFile,
  getFolder,
  getInfo,
};
