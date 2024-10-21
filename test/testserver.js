function devToll() {
  var script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/eruda";
  document.body.append(script);
  script.onload = function() { eruda.init(); }
};
//devToll();

let infoSus = () => {
  return ([1e7] + -4e3 + -8e3).replace(/[1408]/g, (n => (n ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> n / 100000).toString(16)));
};

let codeCheck = 0;

var inp = document.getElementsByClassName('inp')[0];
var inpCodePrem = document.getElementsByClassName('inp2')[0]; 


async function genCod() {

  let dataMeat = {
    loss: inpCodePrem.value,
    message: 'LMFAO',
    status: false,
    info: infoSus()
  };


  try {
    await fetch(`http://localhost:6969/generated-cod`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain',
        'x': 5
      },
      body: JSON.stringify(dataMeat)
    }).then(response => response.json()).then(data => {
      const dataReal = ([data.id] + '.' + data.Bi[0]);
      codeCheck = data.id;
      //getCod(codeCheck, infoSus)
      console.log(`               getCod(${codeCheck}, '${data.Bi[0]}')`);
      console.log(dataReal /*.replace(/\./g, 'Ⓞ').replace(/\-/g, '⌂⌂⌂')*/ )
      inp.value = dataReal
    })
  } catch (error) {
    console.error(error);
    };
};

function timeOut() {
  return (new Date().getHours() * 60 * 60) + (new Date().getMinutes() * 60) + new Date().getSeconds();
};


async function getCod(codeVerifi, infoEncod) {
  await fetch(`http://localhost:6969/c/?codes=${codeVerifi}&clientinfo=${btoa(infoEncod)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'funcTime': timeOut()
    }
  }).then(res => res.json()).then(data => {
    console.log(data)
    if (data.status == 'Success') {
       inp.value = '';
    }
  })
};



async function premCod() {
  await fetch(`http://localhost:6969/prem-cod`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'pass': 'cauvang'
    }
  });
}; 



let copy = ()=> {
  if (inp.value == '') {
    genCod();
    premCod();
  } else {
    getCod(inp.value.slice(0, 14), inp.value.slice(15, 23+15))
  }
  // console.log('Hello world');
};


const j = [1, 8, 9, 4, 0];

console.log(j.splice(2, 1), j)

/*let o = {};

let keyO = Object.keys(o);

keyO.forEach(key => {
  getCod(key, o[key][0]);
});*/

/*for (var z = 0; z < 1; z++) {
  setTimeout(() => {
    genCod();
  }, 100);
  setTimeout(() => {
    suu()
  }, 500);
};*/
/*const timestamp = new Date().getMinutes() * 60 + new Date().getSeconds();

let h = Date.now()
console.log( h)*/

/*passCheck('Enter ur password!')

function passCheck(input) {
  const pass = prompt(input);
  if (pass == '123456') {
    alert('success');
  } else {
    passCheck('Wrong password try again!');
  };
};*/