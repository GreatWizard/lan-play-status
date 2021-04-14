const koa = require("koa");
const serve = require("koa-static");

const app = new koa();

app.use(serve("../dist"));

app.listen(8080, () => {
  console.log("listening on port 8080");
});
