const express = require('express');

const app = express();
const port = 5000

app.get('/', (req, res) => {

  res.end(JSON.stringify({message: "you must be trying to access the '/api' route. Don't forget to do that and include the search params"})).status(404);
})

app.get('/api', (req, res) => {
  const currentDate = new Date()
  const hngInternDetail = {
    slack_name: req.query.slack_name ??'slack name here',
    current_day: currentDate.toLocaleString('en-us', {  weekday: 'long' }),
    utc_time: currentDate.toISOString().split('.')[0] +'Z',
    track: req.query.track ?? "track here",
    github_file_url: "https://github.com/oluwatobiloba1/Hng-stage1-task/blob/main/index.js",
    github_repo_url: "https://github.com/oluwatobiloba1/Hng-stage1-task",
    status_code: 200
}

app.get('*', (req, res) => {

  res.end(JSON.stringify({message: "you must be trying to access the '/api' route. Don't forget to do that and include the search params"})).status(404);
})


res.json(hngInternDetail).status(200)
})



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})