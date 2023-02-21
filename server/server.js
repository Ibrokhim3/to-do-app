const http = require("http");
const fs = require("fs");
const { v4 } = require("uuid");

const options = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

let app = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/tasks") {
      let tasks = JSON.parse(fs.readFileSync("tasks.json"), "utf-8");
      res.writeHead(200, options);
      res.end(JSON.stringify(tasks));
    }
  }
  console.log(req.method);
  if (req.method === "POST") {
    if (req.url === "/tasks") {
      req.on("data", (chunk) => {
        let { task } = JSON.parse(chunk);

        let tasks = JSON.parse(fs.readFileSync("tasks.json"), "utf-8");

        tasks.push({
          task,
        });

        fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 4));

        res.writeHead(201, options);
        res.end(
          JSON.stringify({
            msg: "Task was added",
          })
        );
      });
    }
  }
});

app.listen(3005, () => {
  console.log("Server is running on the port 3005");
});
