let express = require('express');
let app = express();
app.listen(8002, function () {
  console.log('listen at 8002');
});

/*处理静态文件*/
app.use(express.static(__dirname));

/* request action */
app.get('/', function (req, res) {
  res.sendFile('./index.html', {root: __dirname});
});

app.all('*', function (req, res) {
  res.sendFile('./index.html', {root: __dirname});
});


