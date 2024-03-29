var request = require('request');
var fs = require('fs');

const stream = require('stream');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
const events = require('events');
var EventEmitter = new events.EventEmitter();

db.serialize(function() {

  db.run("CREATE TABLE if not exists user (id STRING, pw STRING)");
  //  var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
  ///    stmt.run( "처음ID", "처음PW");
  ///    stmt.run( "333", "33PW");
  ///  stmt.finalize();

  db.each("SELECT id, pw FROM user", function(err, row) {
    console.log(row.id + ": " + row.pw);
  });
  db.each("SELECT id, pw FROM user where id='qwe'", function(err, row) {
    console.log("db에 저장된 id는" + row.id);
  });
});

db.close();


function stop(n) {
  console.log(n);
  switch (n) {
    case 1:
      EventEmitter.emit("stop1");
      console.log("스탑 함수 호출");
      break;
    case 2:
      EventEmitter.emit("stop2");
      console.log("스탑 함수 호출");
      break;
    case 3:
      EventEmitter.emit("stop3");
      console.log("스탑 함수 호출");
      break;
    case 4:
      EventEmitter.emit("stop4");
      console.log("스탑 함수 호출");
      break;
    case 5:
      EventEmitter.emit("stop5");
      console.log("스탑 함수 호출");
      break;
  }
}

function resume(n) {
  console.log(n);
  switch (n) {
    case 1:
      EventEmitter.emit("resume1");
      console.log("리줌 함수 호출");
      break;
    case 2:
      EventEmitter.emit("resume2");
      console.log("리줌 함수 호출");
      break;
    case 3:
      EventEmitter.emit("resume3");
      console.log("리줌 함수 호출");
      break;
    case 4:
      EventEmitter.emit("resume4");
      console.log("리줌 함수 호출");
      break;
    case 5:
      EventEmitter.emit("resume5");
      console.log("리줌 함수 호출");
      break;
  }
}





function insultMember2() {
  var id = $('#id').val();
  var pw = $('#password').val();
  console.log("id는" + id);
  db = new sqlite3.Database('mydb.db');
  db.run("INSERT into user(id,pw) VALUES(?,?)", [id, pw], function(err, row) {});
  db.close();

  window.location.href = "finishedJoin.html";
};

function loginConfirm2() {
  var id = $('#id').val();
  var s_id = "'" + id + "'";
  var pw = $('#password').val();
  var pw = '' + pw;
  var d_id = '';
  var d_pw = '';
  console.log(id);
  console.log(pw);
  if (id == '') {
    alert("id를 입력하지 않으셨습니다.")
  } else if (pw == '') {
    alert("pw를 입력하지 않으셨습니다.")
  }
  if (id) {

    db = new sqlite3.Database('mydb.db');
    db.each("SELECT id, pw FROM user where id=" + s_id, function(err, row) {
      console.log("db에 저장된 id는" + row.id);
      console.log("db에 저장된 pw는" + row.pw);
      d_id = row.id;
      d_pw = row.pw;
      console.log("변수에 저장된 pw는" + d_pw);
      if ((id == row.id) && (pw == row.pw)) {
        window.location.href = "distribute_download.html?id=" + id;
      }
      ale();
      //else if(row.id=='undefined'){
      //   alert("비밀번호를 잘못 입력하셨습니다"); //
      // }
    });
    db.close();
  }


  function ale() {

    console.log("바깥에 pw는" + d_pw);
    console.log("바깥에 id는" + d_id);
    if (d_pw != pw) {
      alert("비밀번호를 잘못 입력하셨습니다");
    }
  }


}

function join() {
  location.href = "sign_up.html";
}


function download_file(event, filename){
//  var id = '';
    //
    // this.stop = function stop(){
    //   req3.pause();
    //   console.log("calleddddd!!!");
    //  }
  var fileSize = '';
  var fileURL;
  var finalPath;

  var a = event.currentTarget;
  var td = a.parentElement;
  var tr = td.parentElement;
  var id = '';
  var test = '';
  test = '' + tr.querySelector('.test > a').getAttribute('class');

  var progressBar;
  var display;
  progressBar = tr.querySelector('progress');
  display = tr.querySelector('span');
  progressBar.value = 0;
  display.innerText = '0%';
  // Save variable to know progress
  var received_bytes = 0;
  var total_bytes = 0;

  EventEmitter.on("stop1", function() {
    req1.pause();
    console.log("스탑 함수 실행");
  })
  EventEmitter.on("resume1", function() {
    req1.resume();
    console.log("리쥼 함수 실행");
  })
  EventEmitter.on("stop2", function() {
    req2.pause();
    //req.unpipe();
    console.log("스탑 함수 실행");
  })
  EventEmitter.on("resume2", function() {
    req2.resume();
    console.log("리쥼 함수 실행");
  //  req.pipe(out);
  })

    EventEmitter.on("stop3", function() {
      req3.pause();
      //req.unpipe();
      console.log("스탑 함수 실행");
    })
    EventEmitter.on("resume3", function() {
      req3.resume();
      console.log("리쥼 함수 실행");
    //  req.pipe(out);
    })

    EventEmitter.on("stop5", function() {
      req5.pause();
      console.log("스탑 함수 실행");
    })
    EventEmitter.on("resume5", function() {
      req5.resume();
      console.log("리쥼 함수 실행");
    })



  if(filename=='10Mb.dat'){
    console.log("10Mb.dat");
    fileSize=filename
   fileURL = "http://www.ovh.net/files/10Mb.dat";
   finalPath = "./download/10Mb.dat";
   var req1 = request({
     method: 'GET',
     uri: fileURL
   });
   var out = fs.createWriteStream(finalPath);
   req1.pipe(out);



   req1.on('response', function(data) {
     // Change the total bytes value to get progress later.
     total_bytes = parseInt(data.headers['content-length']);
     progressBar.max = total_bytes;
   });

   req1.on('data', function(chunk) {

     // Update the received bytes
     progressBar.max = total_bytes;
     received_bytes += chunk.length;
     progressBar.value = received_bytes;

     display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'
 //console.log( received_bytes);
   //  console.log('tota l data.' + total_bytes);
     //  console.log('Received'+chunk.length+' bytes of data.');
     //showProgress(received_bytes, total_bytes);
   });
   req1.on('error', function(err) {
     console.log(err);
   })

   req1.on('end', function() {
     var subW;
     subW = test.substring(9, 18).trim();
     $("." + subW).text('다운로드끝');
   });

   process.on('uncaughtException', function(err) {
     console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
     console.log(err);
   })

  }

  else if(filename=='100mb.bin'){
    fileSize=filename
    fileURL = "http://speedtest-ny.turnkeyinternet.net/100mb.bin";
    finalPath = "./download/100mb.bin";
    var req2 = request({
      method: 'GET',
      uri: fileURL
    });

    var out = fs.createWriteStream(finalPath);
    req2.pipe(out);

    req2.on('response', function(data) {
      // Change the total bytes value to get progress later.
      total_bytes = parseInt(data.headers['content-length']);
      progressBar.max = total_bytes;
    });

    req2.on('data', function(chunk) {

      // Update the received bytes
      progressBar.max = total_bytes;
      received_bytes += chunk.length;
      progressBar.value = received_bytes;

      display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'
  //console.log( received_bytes);
    //  console.log('tota l data.' + total_bytes);
      //  console.log('Received'+chunk.length+' bytes of data.');
      //showProgress(received_bytes, total_bytes);
    });
    req2.on('error', function(err) {
      console.log(err);
    })

    req2.on('end', function() {
      var subW;
      subW = test.substring(9, 18).trim();
      $("." + subW).text('다운로드끝');
    });

    process.on('uncaughtException', function(err) {
      console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
      console.log(err);
    });
  }
  else if(filename=='500MB.test'){
    fileSize=filename
    fileURL = "http://nl.altushost.com/500MB.test";
    finalPath = "./resources/500MB.test";
    var req3 = request({
      method: 'GET',
      uri: fileURL
    });

    var out = fs.createWriteStream(finalPath);
    req3.pipe(out);
    EventEmitter.on("stop3", function() {
      req3.pause();
      console.log("스탑 함수 실행");
    })
    EventEmitter.on("resume3", function() {
      req3.resume();
      console.log("리쥼 함수 실행");
    })
    req3.on('response', function(data) {
      // Change the total bytes value to get progress later.
      total_bytes = parseInt(data.headers['content-length']);
      progressBar.max = total_bytes;
    });

    req3.on('data', function(chunk) {

      // Update the received bytes
      progressBar.max = total_bytes;
      received_bytes += chunk.length;
      progressBar.value = received_bytes;

      display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'

    });
    req3.on('error', function(err) {
      console.log(err);
    })

    req3.on('end', function() {
      var subW;
      subW = test.substring(9, 18).trim();
      $("." + subW).text('다운로드끝');
    });

    process.on('uncaughtException', function(err) {
      console.log('!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
      console.log(err);
    });

  }
  else if(filename=='1000mb.bin'){
    fileSize=filename
    fileURL = "http://speedtest-ny.turnkeyinternet.net/" + fileSize;
    finalPath = "./download/" + fileSize;
    console.log(fileSize);
    var req4 = request({
      method: 'GET',
      uri: fileURL
    });
    var out = fs.createWriteStream(finalPath);
    req4.pipe(out);
    EventEmitter.on("stop4", function() {
      req4.pause();
      console.log("스탑 함수 실행");
    })
    EventEmitter.on("resume4", function() {
      req4.resume();
      console.log("리쥼 함수 실행");
    })
    req4.on('response', function(data) {
      // Change the total bytes value to get progress later.
      total_bytes = parseInt(data.headers['content-length']);
      progressBar.max = total_bytes;
    });

    req4.on('data', function(chunk) {

      // Update the received bytes
      progressBar.max = total_bytes;
      received_bytes += chunk.length;
      progressBar.value = received_bytes;

      display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'
//  console.log( received_bytes);
    //  console.log('tota l data.' + total_bytes);
      //  console.log('Received'+chunk.length+' bytes of data.');
      //showProgress(received_bytes, total_bytes);
    });
    req4.on('error', function(err) {
      console.log(err);
    })

    req4.on('end', function() {
      var subW;
      subW = test.substring(9, 18).trim();
      $("." + subW).text('다운로드끝');
    });

    process.on('uncaughtException', function(err) {
      console.log('!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
      console.log(err);
    });
  }
  else if(filename=='10GBtest.zip'){
    fileSize=filename
    fileURL = "http://lg-tor.fdcservers.net/10GBtest.zip";
    finalPath = "./resources/10GBtest.zip";
    var req5 = request({
      method: 'GET',
      uri: fileURL
    });
  }



  //----------------------------------------------------------------------------파일 이어받기 기능 삭제가능
//  var fileSizeInBytes=0;
//  total_bytes=104857600;

//  fs.stat(finalPath, function(err, data) {
  //if (err) {

  //}
  //----------------------------------------------------------------------------파일 이어받기 기능 삭제가능
/*
  else {

    console.log('it exists');
    var stats = fs.statSync(finalPath)
    fileSizeInBytes = stats.size;
    if(fileSizeInBytes>1){
      console.log("원래있던 사이즈는"+fileSizeInBytes);
    //  console.log('tota l data.' + total_bytes);
    received_bytes = fileSizeInBytes;
    console.log("받아논 사이즈는"+received_bytes);
    }
    req = request({
      method: 'GET',
      uri: fileURL,
       headers:{
     'Range': 'bytes='+fileSizeInBytes+'-'}
   });


     var out = fs.createWriteStream(finalPath);
     //var temp= 104857000;
     //req.headers.Range='bytes=104800000-' //헤더 변경하는 방법
     //req.headers.Range='bytes='+temp+'-'; // 변수로 헤더 변경 방법
     req.pipe(out);

     EventEmitter.on("stop2", function() {
       req.pause();
       //req.unpipe();
       console.log("스탑 함수 실행");
     })
     EventEmitter.on("resume2", function() {
       req.resume();
       console.log("리쥼 함수 실행");
     //  req.pipe(out);
     })
     EventEmitter.on("stop4", function() {
       req.pause();
       console.log("스탑 함수 실행");
     })
     EventEmitter.on("resume4", function() {
       req.resume();
       console.log("리쥼 함수 실행");
     })

     req.on('response', function(data) {
       // Change the total bytes value to get progress later.
    //   total_bytes = parseInt(data.headers['content-length']);
       progressBar.max = total_bytes;
     });
     console.log("토탈바이트는"+total_bytes);
    console.log("받아논 바이트는 "+received_bytes);
     req.on('data', function(chunk) {

       // Update the received bytes

       progressBar.max = total_bytes;
       received_bytes += chunk.length;
       progressBar.value = received_bytes;

       display.innerText = Math.round((progressBar.value / progressBar.max) * 1000) / 10 + '%'
   console.log( received_bytes);
     //  console.log('tota l data.' + total_bytes);
       //  console.log('Received'+chunk.length+' bytes of data.');
       //showProgress(received_bytes, total_bytes);
     });
     req.on('error', function(err) {
       console.log(err);
     })

     req.on('end', function() {
       var subW;
       subW = test.substring(9, 18).trim();
       $("." + subW).text('다운로드끝');


     });

     process.on('uncaughtException', function(err) {
       console.log('!!!!!!!!!!!!!!!!!!!!!! uncaughtException !!!!!!!!!!!!!!!!!!!')
       console.log(err);
     })

  }
  //----------------------------------------------------------------------------파일 이어받기 기능 삭제가능

*/
//  });


  //폴더에 저장된 파일이 있는지 확인.
  // const stats ; = fs.statSync(finalPath)
  // console.log(stats);
  // if(stats){
  //  const fileSizeInBytes = stats.size
  //  //console.log(stats);
  //  if(fileSizeInBytes){
  //    console.log(fileSizeInBytes);
  //    console.log('tota l data.' + total_bytes);
  //  }
  // }


}
