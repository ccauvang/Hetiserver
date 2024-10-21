const router = require('express').Router();

let verifyObject = {};
let verifyResCode = {};
let codePrem = [];

function atob(input) {
  return input != undefined ? Buffer.from(input, 'base64').toString() : 'Siuuuuuuuuuuuui';
};

function timeOut() {
  return (new Date().getHours() * 60 * 60) + (new Date().getMinutes() * 60) + new Date().getSeconds();
};

function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function generatedCodePrem() {
  codePrem.unshift('0000-0000-0000'.replace(/[0]/g, (n => (n ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> n / 10).toString(16))));
};

function generatedId(inputCode) {
 
  const freshCode = ('0000-0000-0000'.replace(/[0]/g, (n => (n ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> n / 10).toString(16))));
      
  if (freshCode !== inputCode) {
    return freshCode;
  } else {
    generatedId(freshCode);
  };
};

router.get('/prem-cod', (req, res) => {
  generatedCodePrem();
  const password = req.header('pass');
  const key = 'cauvang';
  if (password == key) {
    console.log(codePrem[0])
    //codePrem.pop();
  };
});

router.post('/generated-cod', (req, res) => {
  const bodyData = req.body;
  const headerCount = req.headersCount;
  const reqPremCode = bodyData.loss
  var dataX = Number(req.header('x')) < 20 ? 20 : Number(req.header('x'));

  if (codePrem.indexOf(reqPremCode) != -1) {
    dataX = 0;
    codePrem.splice(codePrem.indexOf(reqPremCode), 1);
  };

  const timestamp = timeOut();
  const codeResponse = '0000000000'.replace(/[0]/g, (n => (n ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> n / 10).toString(16).toUpperCase()));

  res.set('Content-Type', 'application/json');
  res.set('funcTime', '0.3');

  const clienHostName = req.header('referer') || req.header('origin');
  var cdnId = generatedId('');
  
  // console.log('id:  ' + bodyData.info, 'host:  ' + clienHostName, 'data:  ' + JSON.stringify(bodyData));
  //console.log(req);''
  if (!verifyObject[cdnId]) {
    
    verifyResCode[codeResponse] = cdnId;
    
    verifyObject[cdnId] = [bodyData.info, clienHostName, timestamp + dataX, codeResponse, 1];
  } else {
    cdnId = generatedId(cdnId);
    
    verifyResCode[codeResponse] = cdnId;
    
    verifyObject[cdnId] = [bodyData.info, clienHostName, timestamp + dataX, codeResponse, 1];
  }
console.log(verifyResCode)

  const dataRes = {
    hi: 'Hello World',
    id: cdnId,
    code: dataX * 1e3,
    Bi: [bodyData.info, 'Err'],
    Suu: headerCount
  };

  // console.log(verifyObject);

  res.status(303).json(dataRes);
});

router.get('/c/', (req, res) => {
  const codeQuery = req.query.codes
  const clientInfoQuery = atob(req.query.clientinfo);
  const verifyObj = verifyObject[codeQuery];
  const funcTime = timeOut();
  var err = '';

  if (!verifyObj) {
    err = 'Not found'
  } else if (verifyObj[0] != clientInfoQuery) {
    err = 'Not match'
  } else if (!(verifyObj[2] < funcTime)) {
    err = `Wait a ${verifyObj[2] - funcTime} seconds!`
  } else {
    err = 'Something wrong!';
  }

  res.set({
    'Content-Type': 'application/json',
    'WTF': verifyObj ? verifyObj[2] : 0
  });

  if (verifyObj && (verifyObj[0] === clientInfoQuery) && (verifyObj[2] < funcTime)) {
    if (verifyObj[4] == 0) {
      res.json({ "!": verifyObj[3] });
      delete verifyObject[codeQuery];
    } else {
      console.log(verifyObject)
      res.json({ HP: 100, status: 'Success', result: verifyObj[3] });
      verifyObj[4] = 0;
    };
    console.log('Equal')
  } else {
    res.json({ HP: 0, status: 'Failed', error: err });
    console.log('Not equal', err)
  };
  // console.log(verifyObject)

});

module.exports = router;