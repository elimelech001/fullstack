const expess = require("express");
const app = expess();
const cors = require('cors')

const {
  rename,
  copyFile,
  fileDelete,
  folderDelete,
  getFile,
  getFolder,
  getInfo
} = require("./middlares");

app.use(expess.json());
app.use(cors()) 
app.put("*",rename);

app.post("*", copyFile);

app.delete("*", fileDelete, folderDelete);

app.get("*/info",getInfo);
app.get("*", getFile,getFolder);

app.listen(5000, () => {
  console.log(`listining on port 5000`);
});
