
$(function () {

  $('#loading').show();
  loadCoins();//load coins on program start
  $('#loading').hide();

  var i = 0;
  function move() {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
  }

// lines 28 to 100 - handeling different clicks on the menu 
  $(".btn-default").on('mouseenter', async function () {
    $(this).css({ "background-color": "blue", "color": "white" });
  });
  $(".btn-default").on('mouseleave', async function () {
    $(this).css({ "background-color": "white", "color": "green", "border": "2px solid #4CAF50" });
  });
  $(".btn-default").on('click', async function () {
    $('#myModal').modal('hide');
  });
  $(".modal-X-close").on('click', async function () {
    $('#myModal').modal('hide');
  });
  $(".active:contains('Home')").on('click', async function () {



    $("#coin-list").parent().show();
    $("#chartContainer").hide();
    $("#chartContainer1").hide();
    $("#chartContainer2").hide();
    $(".aboutMe").hide();
  });
  // $(".btn-outline-success").on('click', async function () {
  //   searchCoins();
  // });
  $(".active").on('mouseover', async function () {
    $(this).css({ "background-color": "white", "color": "white", "border": "2px solid #4CAF50" });

  });
  $(".active").on('mouseleave', async function () {
    $(this).css({ "background-color": "white", "color": "green", "border": "0px solid #4CAF50" });

  });



  $(".active:contains('Live Report')").on('mouseleave', async function () {
    $(this).css({ "background-color": "white", "color": "green", "border": "2px solid #4CAF50" });

  });

  $("a:contains('About')").on('click', async function () {
    move();
    $('#loading').show();
    $("#chartContainer").hide();
    $("#chartContainer1").hide();
    $("#chartContainer2").hide();
    $("#coin-list").parent().hide();
    let aboutMe = "";
    aboutMe = `<div>${allOfMyLove()} <br/> ${blackDog()}</div>`;
    $(aboutMe).appendTo(".aboutMe");
    $(".aboutMe").html(aboutMe);
    $(".aboutMe").show();
    $('#loading').hide();

  });

  $("a:contains('Live Report')").on('click', async function () {

    $("#chartContainer").show();
    $("#chartContainer1").show();
    $("#chartContainer2").show();
    $("#coin-list").parent().hide();
    $(".aboutMe").hide();
    loadReport();

  });

  $(".navbar-brand:contains('Mission 2')").on('click', async function () {
    alert(`searching for Mission 2`);
  });

  $(".btn-outline-success").on('click', function () { searchCoins() });

  // When the user clicks anywhere outside of the modal, close it




});


async function loadReport() {//deciding if the chart can be loaded or not based on coin selected

  CurrentSelectedCoinSymbolsForReport;
  if (CurrentSelectedCoinSymbolsForReport.length === 0) {
    innerHtml3 = `No coins selected`
    title = "Coins haven't selected - Please select one to 5 coins";
    lastNote = "Please select coins";
    printModal2(title, innerHtml3, lastNote);

    $("#coin-list").parent().show();
  } else {
    let coinString = "";
    createOngoingGraph = "";
    coinString = CurrentSelectedCoinSymbolsForReport[CurrentSelectedCoinSymbolsForReport.length - 1];
    coinString = coinString.slice(0, -1);

    move();



    //createReport(coinString);
    newReport(coinString);
    $(".coin-list").hide();
  }
}





////////////////////////////////////////more chart test//////////////////////////////////////////









let intervalId = -1;
let showChart = false;

function clearChart() {
  showChart = false;
}

function newReport(listOfCoins) {             //Report of coins selected 
  const arrayOfCoins = listOfCoins.split(",");
  showChart = true;
  const liveReportDataArray = [];

  for (const coin of selectedCoins) {
    liveReportDataArray.push({
      type: "line",
      xValueType: "dateTime",
      yValueFormatString: "###.00$",
      xValueFormatString: "hh:mm:ss TT",
      showInLegend: true,
      name: coin,
      dataPoints: []
    })
  }

  var options = {

    title: {
      text: "Cryptocurrencies live report"
    },
    axisX: {
      title: "chart updates every 2 seconds"
    },
    axisY: {
      suffix: "$"
    },
    toolTip: {
      enabled: true,       //disable here
      animationEnabled: true, //disable here
      //shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      fontSize: 22,
      fontColor: "dimGrey",
      itemclick: toggleDataSeries
    },
    data: liveReportDataArray
  };

  var chart = $("#chartContainer2").CanvasJSChart(options);

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }

  var updateInterval = 2000;

  var time = new Date;
  var today = new Date();
  var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // starting at 10.00 am
  time.setHours(today.getHours());
  time.setMinutes(today.getMinutes());
  time.setSeconds(today.getSeconds());
  time.setMilliseconds(today.getMilliseconds());
  //clearing the chart
  function updateChart() {

    if (!showChart) {

      $("#chartContainer2").CanvasJSChart().destroy();
      chart = null;
      clearInterval(intervalId);
      intervalId = -1;
      return;
    }
    time.setTime(time.getTime() + updateInterval);
    //debugger;

    let url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${listOfCoins}&tsyms=USD&api_key=549e2783449188ee72b1c291775bfa420c0a8f1cdf689747827255344ddb6fc9`;
    for (let coin of selectedCoins) {
      // url += coin + ","
    }


    // index = 0;
    $.ajax(
      {
        type: 'GET',
        datatype: 'json',
        url: url,
        success: function (data) {
          //debugger;

          for (coin in data) {

            //debugger;
            const index = 0;
            const index2 = arrayOfCoins.findIndex((element) => element === coin);//getting coin index for the graph 

            // debugger;
            liveReportDataArray[index2].dataPoints.push({
              x: time.getTime(),
              y: data[coin].USD,

            });
            liveReportDataArray[index2].legendText = ` ${coin}: ${data[coin].USD}$`//Title data (legend)


          }
          $("#chartContainer2").CanvasJSChart().render();
        },
        error: function (error) {
          console.log("error : ", error);
        }
      }
    );



  }
  //interval function to run every 2 seconds
  updateChart();
  intervalId = setInterval(function () { updateChart() }, updateInterval);


}



  //////////////////////////////////////end of more chart test/////////////////////////////////////



function update() {
  var element = document.getElementById("myprogressBar");
  var width = 1;
  var identity = setInterval(scene, 10);
  function scene() {
    if (width >= 100) {
      clearInterval(identity);
    } else {
      width++;
      element.style.width = width + '%';
    }
  }
}

async function loadCoins() {


  move();
  try {
    let url = "https://api.coingecko.com/api/v3/coins/";
    const allCoins = await getDataAsync(url);

    let id = 1;
    let toggleSwitch = `
       <label class='switch'>
          <input type="checkbox">
         <span class="slider round"></span>
       </label>
` ;
    $('#chartContainer').empty();
    $('#coin-list').empty();
    allCoins.forEach(coin => {
      $('#coin-list').append(createCoinCard(coin));
    })

  }

  catch (err) {
    //.text(JSON.stringify(moreInfo))
    alert("Error: " + JSON.stringify(err.message));
  }
}

function getDataAsync(url) {
  return $.get(url);
}


/**
 * 
 * added data-coin-sym attribute for each checkbox
 * @param {*} singleCoin 
 * @param {*} checked 
 * @returns 
 */
function createCoinCard(singleCoin,checked=false) {// object that stores the coin details
const htmlChecked=checked===true?"checked":"";
  const $coin = $(`<div class="col">
  <div class="card" style="width: 19rem; height:19rem;margin:15px; border: 1px solid black; text-align:center">
    <div class="card-body" style="justify-content:center">
      <h5 class="card-title">${singleCoin.symbol.toUpperCase()}</h5>
        <div class ="form-check form-switch"> 
          <input class="form-check-input" type="checkbox" ${htmlChecked} data-coin-sym="${singleCoin.symbol}" >
         </div>
         <p class="card-text">${singleCoin.name}</p>
         <button class="toggle-more-info btn btn-primary majorpoints ">More Info</button>
         <div class="more-info" style="display: none; width: 17rem; height:8rem;margin:2px; border: 1px solid black; overflow:auto" >hey</div>
    </div>
  </div>
</div>`);

  $coin.find("input[type=checkbox]").on("click", console.log);
  $coin.find("input[type=checkbox]").on("click", function () { favoriteCoinsToStore(singleCoin,this) });// pushing selected coins to the graph
  //$coin.find(".btn-outline-success").on("click", function() {favoriteCoinsToSearch(this)} );
  let isMoreInfoOpen = false; let moreInfo = "";
  $coin.find('.toggle-more-info').on("click", async function () {
    document.onreadystatechange = move();
    if (!isMoreInfoOpen) {
      $('#loading').show();
      let url = `https://api.coingecko.com/api/v3/coins/${singleCoin.id}`;
      const coinFromSessionStorage = sessionStorage.getItem(`${singleCoin.name}`)
      if (coinFromSessionStorage === null) {

        const coinMoreInfo = await getDataAsync(url);
        setTimeout(() => {
          sessionStorage.removeItem(coinMoreInfo.name)
        }, 120000);
        moreInfo = {
          id: coinMoreInfo.id,
          img: coinMoreInfo.image.thumb,
          eur: coinMoreInfo.market_data.current_price.eur,
          usd: coinMoreInfo.market_data.current_price.usd,
          ils: coinMoreInfo.market_data.current_price.ils
        }
        const coinToStorage = JSON.stringify(moreInfo);
        sessionStorage.setItem(`${coinMoreInfo.name}`, coinToStorage);


      }
      else {

        coinMoreInfo = JSON.parse(coinFromSessionStorage);
        moreInfo = {
          id: coinMoreInfo.id,
          img: coinMoreInfo.img,
          eur: coinMoreInfo.eur,
          usd: coinMoreInfo.usd,
          ils: coinMoreInfo.ils
        }
      }
      $('#loading').hide();

      //const moreInfo = await getDataAsync(url);


      const moreInfoHtml = $(`<div><img src="${moreInfo.img}"/></br>
                             Current market data prices:</br> 
                             EUR: ${moreInfo.eur}&#8364;</br>
                             USD: ${moreInfo.usd}&#36;</br>
                             ILS: ${moreInfo.ils}&#8362;</br>
                             </div>    `);
      // $coin.find('.more-info').text(JSON.stringify(moreInfo));
      $coin.find('.more-info').html(moreInfoHtml);

    }
    isMoreInfoOpen = !isMoreInfoOpen;
    $coin.find('.more-info').slideToggle();
  });

  return $coin;


}

let allCheckedCoions = [];
var countChecked = function () {
  var n = $("input:checked").length;

  if (n === 6) {

    $(this).prop("checked", false);
    allCheckedCoions = Object.entries($("input:checked").parent().prev());
    allCheckedCoions.splice(-2);


    console.log(allCheckedCoions.reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + allCheckedCoions[currentIndex][1].outerText + ',';
    }, ""));
  }
  console.log(allCheckedCoions.reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + allCheckedCoions[currentIndex][1].outerText + ',';
  }, ""));
};

let CurrentSelectedCoinSymbolsForReport = [];
let selectedCoins = [];
let coinsNames = [];
function favoriteCoinsToStore(coin,top) {
  let currentCoin = $(top);
  countChecked();
  console.log(top);

  if (top.checked === true) {

    if (selectedCoins.length < 5) {
      selectedCoins.push(currentCoin);  //push coins to coins for the graph
      coinsNames.push(coin);

      // console.log(coinsNames.reduce((accumulator, currentValue, currentIndex, array) => {
      //   return accumulator + coinsNames[currentIndex][1].outerText + ',';
      // }, ""));
    } else {

      // **** You can do this with alert or modal **** //

      //alert("Cannot select more than 5 coins");
      //top.checked = false;
      // return;

      // **** you have to push the 6th element, otherwise you cant remove it....
      selectedCoins.push(currentCoin);  
      coinsNames.push(coin);

      const innerHTMLCoin = $('<div></div>');
      let innerTextCoinName = "";
      // for (const iterator of selectedCoins) {
      //   console.log($(iterator).parent().parent().parent().html());
        
      //   innerHTMLCoin += $(iterator).parent().parent().parent().html();

      // }

      //create a new element to display in the modal
      for (const iterator of coinsNames) {
        innerHTMLCoin.append(createCoinCard(iterator,true));
      }
      console.log(innerHTMLCoin);
      title = "Coins selected - Please select one to 5 coins";
      lastNote = "Please select no more than 5 coins";

      printModal(title, innerHTMLCoin, lastNote);

    }
  } else {//false -user wants to remove a coin from selected coins
    let coinIndex = selectedCoins.findIndex(function (coinInArray) {
      if (coinInArray === currentCoin) {
        return true;
      } else {
        return false;
      }
    })
    selectedCoins.splice(coinIndex, 1);

    // iterate over all coins (two) with thew same attribute
    // and set their checkbox to false
    $(`[data-coin-sym=${coin.symbol}]`).each(function(){
      $(this).prop("checked", false);
    })

    let coinNameIndex=coinsNames.findIndex(function (coinInArray) {
      if (coinInArray.symbol === coin.symbol) {
        return true;
      } else {
        return false;
      }
    });
    coinsNames.splice(coinNameIndex,1);// We  have two arrays to control the tata in the graph and the data of all coins in modal 

  }

//debugger;
  selectedCoins = Object.entries($("input:checked").parent().prev());
  selectedCoins.splice(-2);

  CurrentSelectedCoinSymbolsForReport = [];
  console.log(selectedCoins.reduce((accumulator, currentValue, currentIndex, array) => {
    // for (const iterator of object) {

    // }
    CurrentSelectedCoinSymbolsForReport[currentIndex] = accumulator + selectedCoins[currentIndex][1].outerText + ',';

    return accumulator + selectedCoins[currentIndex][1].outerText + ',';
  }, ""));
  for (const iterator of CurrentSelectedCoinSymbolsForReport) {

  }


}

for (const iterator of CurrentSelectedCoinSymbolsForReport) {

}

$(".modal-close").on('click', async function () {
  let innerHTMLCoin = "";
  $("#myModal").modal("hide");

});

$(".modal-X-close").on('click', async function () {

  $("#myModal").modal("hide");

});




////////////////////////////////////////seconed chart test////////////////////////////////


function allOfMyLove() {
  $('#loading').show();
  let lyrics = `<h1>All My Love<h1><br/>
    <h3>Led Zeppelin</h3><br/>
    <iframe width="790" height="444" src="https://www.youtube.com/embed/cdERUjC0rYw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>
    <g-expandable-content jsname="WbKHeb" jscontroller="Ah7cLd" jsaction=";rcuQ6b:npT2md" jsshadow="" aria-hidden="false" data-eb="0" data-mt="0" data-quie="" style="transition: none 0s ease 0s;"><span jsname="zXitYb" jsslot=""><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Should I fall out of love, my fire in the light</span><br><span jsname="YS01Ge">To chase a feather in the wind</span><br><span jsname="YS01Ge">Within the glow that weaves a cloak of delight</span><br><span jsname="YS01Ge">There moves a thread that has no end</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">For many hours and days that pass ever soon</span><br><span jsname="YS01Ge">The tides have caused the flame to dim</span><br><span jsname="YS01Ge">At last the arm is straight, the hand to the loom</span><br><span jsname="YS01Ge">Is this to end or just begin?</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love</span><br><span jsname="YS01Ge">All of my love to you, oh</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, oh</span><br><span jsname="YS01Ge">All of my love to you</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">The cup is raised, the toast is made yet again</span><br><span jsname="YS01Ge">One voice is clear above the din</span><br><span jsname="YS01Ge">Proud Arianne one word, my will to sustain</span><br><span jsname="YS01Ge">For me, the cloth once more to spin, oh</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, oh</span><br><span jsname="YS01Ge">All of my love to you</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, yes</span><br><span jsname="YS01Ge">All of my love to you </span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Yours is the cloth, mine is the hand that sews time</span><br><span jsname="YS01Ge">His is the force that lies within</span><br><span jsname="YS01Ge">Ours is the fire, all the warmth we can find</span><br><span jsname="YS01Ge">He is a feather in the wind, oh</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, oh</span><br><span jsname="YS01Ge">All of my love to you</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, ooh yes, all of my love to you now</span><br><span jsname="YS01Ge">All of my love, all of my love</span><br><span jsname="YS01Ge">All of my love, love, sometimes, sometimes</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Sometimes, sometimes, oh love</span><br><span jsname="YS01Ge">Hey, hey, hey</span><br><span jsname="YS01Ge">Hey, hey, hey</span><br><span jsname="YS01Ge">Ooh yeah, it's all my love</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">All of my love, all of my love, to you now</span></div><div jsname="U8S5sf" class="ujudUb WRZytc"><span jsname="YS01Ge">All of my love, all of my love</span><br><span jsname="YS01Ge">all of my love to, to you, you, you, yeah</span><br><span jsname="YS01Ge">I get a little bit lonely</span></div></span></g-expandable-content>
    <img src="polo/Polo1_2.jpg" alt="Polo" width="20%" height="20%"><br/>
    <img src="polo/Polo2_2.jpg" alt="Polo Love" width="20%" height="20%">`
  return lyrics;
}
function blackDog() {
  let lyrics = `
    <iframe width="790" height="593" src="https://www.youtube.com/embed/jL2CVek1ZS0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>
    <div><div class="kp-header" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ3z4oAHoECAkQAQ"><div><h2 class="Uo8X3b OhScic zsYMMe"></h2></div><div class="kp-hc"><div class="Hhmu2e wDYxhc NFQFxe viOShc LKPcQc" data-md="16" style="clear:none" data-hveid="CAoQAA" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQhygwAHoECAoQAA"><div class="Ftghae iirjIb"><div class="SPZz6b"><h2 class="qrShPb kno-ecr-pt PZPZlf mfMhoc" data-local-attribute="d3bn" data-attrid="title" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ3B0oADAAegQIChAB"><span>Black Dog</span></h2><div class="wwUB2c PZPZlf" data-attrid="subtitle"><span data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ2kooATAAegQIChAC"><a href="/search?rlz=1C1CHZN_enIL947IL947&amp;sxsrf=ALeKk02aeNURrfPwuR_bqRrEqiyksmrNxQ:1626442188366&amp;q=Led+Zeppelin&amp;stick=H4sIAAAAAAAAAONgVuLQz9U3MMk2MF3EyuOTmqIQlVpQkJqTmQcARJWgyxsAAAA&amp;sa=X&amp;ved=2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQMTAAegQIChAD" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQMTAAegQIChAD">Led Zeppelin</a></span></div></div></div></div><i class="GdltXd" jscontroller="yMbBpb" style="display:none" jsaction="rcuQ6b:npT2md"></i></div></div><div class="SALvLe farUxc mJ2Mod"><div class="i4J0ge"><div class="siXlze yp1CPe wDYxhc NFQFxe" data-attrid="kc:/music/recording_cluster:lyrics" data-md="113" style="clear:none"><div data-hveid="CAsQAA" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQsEwwAXoECAsQAA"><div class="uHNKed"><div class="Oh5wg"><div class="PZPZlf" data-lyricid="Musixmatch91937"><div jsname="Vinbg" class="bbVIQb"><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Hey hey mama said the way you move</span><br><span jsname="YS01Ge">Gonna make you sweat, gonna make you groove</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Ah, ah, child, way you shake that thing</span><br><span jsname="YS01Ge">Gonna make you burn, gonna make you sting.</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Hey hey baby when you walk that way</span><br><span jsname="YS01Ge">Watch your honey drip, can't keep away</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Oh yeah, oh yeah, oh, ah, ah</span><br><span jsname="YS01Ge">Oh yeah, oh yeah, oh, ah, ah.</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">I gotta roll, can't stand still</span><br><span jsname="YS01Ge">Got a flamin' heart, can't get my fill</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Eyes that shine, burnin' red</span><br><span jsname="YS01Ge">Dreams of you all through my head</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Ah ah, ah ah, ah ah, ah ah, ah ah, ah ah, ahhh</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Hey, baby, whoa baby, pretty baby</span><br><span jsname="YS01Ge">Darlin' makes 'em do me now</span><br><span jsname="YS01Ge">Hey, baby, oh baby, pretty baby</span><br><span jsname="YS01Ge">Move me like you're doin' now</span></div><div jsname="U8S5sf" class="ujudUb"><span jsname="YS01Ge">Didn't take too long 'fore I found out</span><br><span jsname="YS01Ge">What people mean by down and out</span></div><div jsname="U8S5sf" class="ujudUb WRZytc OULBYb"><span jsname="YS01Ge">Spent my money, took my car</span><br><span jsname="YS01Ge">Started tellin' her friends she gonna be a</span><span>… </span></div></div><div jsname="WbKHeb" class="bbVIQb"><div jsname="U8S5sf" class="ujudUb u7wWjf" data-mh="-1"><span jsname="YS01Ge">Spent my money, took my car</span><br><span jsname="YS01Ge">Started tellin' her friends she gonna be a star</span></div><div jsname="U8S5sf" class="ujudUb WRZytc xpdxpnd" data-mh="220" data-mhc="1" style="max-height: 220px;"><span jsname="YS01Ge">I don't know, but I been told</span><br><span jsname="YS01Ge">A big-legged woman ain't got no soul</span><br><span jsname="YS01Ge">Oh yeah, oh yeah, ah, ah, ah</span><br><span jsname="YS01Ge">Oh yeah, oh yeah, ah, ah, ah</span><br><span jsname="YS01Ge">All I ask for when I pray</span><br><span jsname="YS01Ge">A steady rollin' woman won't come my way</span><br><span jsname="YS01Ge">Need a woman gonna hold my hand</span><br><span jsname="YS01Ge">Tell me no lies, make me a happy man</span><br><span jsname="YS01Ge">Ah ah, ah ah, ah ah, ah ah, ah ah, ah ah, ahhh.</span><br><span jsname="YS01Ge">Ah, yeah!</span></div></div></div><div class="j04ED"><br/>Source:&nbsp;<br/><a href="https://www.musixmatch.com/" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ5s4FKAAwAXoECAsQAQ" ping="/url?sa=t&amp;<br/><br/>source=web&amp;rct=j&amp;url=https://www.musixmatch.com/&amp;ved=2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQ5s4FKAAwAXoECAsQAQ">Musixmatch</a><br/></div><div class="xpdxpnd PZPZlf" data-lyricid="Musixmatch91937" data-mh="58" data-ved="2ahUKEwjF44mn2efxAhVk5OAKHaxVCCAQycMBKAEwAXoECAsQAg" data-mhc="1" style="max-height: 58px;"><div class="auw0zb">Songwriters: Plant R A / Page James Patrick / Baldwin John</div><div class="auw0zb">Black Dog lyrics © Mushroom Music Pty. Ltd., Flames Of Albion Music, Inc.</div></div></div></div></div></div></div></div></div>
    <br/><img src="polo/Polo3_2.jpg" alt="Polo Love" width="20%" height="20%">
    `
  return lyrics;

}




//$(".btn-outline-success").on('click', async function () 
$(".btn-outline-success").on('click', function () { searchCoins() });
function searchCoins() {
   debugger;
  let innerHtml3 = "";
  var inputVal = false;
  let searchCoin = "";
  searchCoin = $("input").val();
  let searchResult, title, lastNote = "";

  let str = $("input").val().toUpperCase();



  let cardsShown = true;
  if (str !== "" && cardsShown === true) {

    $(".card-title")
      .filter(function () {
        return $(this).text() !== str;
      })
      .parent()
      .parent()
      .hide();


    cardsShown = false;
    inputVal = true;
    innerHtml3 = $(".card-title")
      .filter(function () {
        return $(this).text() === str;
      })
      .parent().parent().html();
    title = "search result";
    lastNote = "Search result found";
    printModal2(title, innerHtml3, lastNote);
    $(".home-button").on('click', function () {
      $(".card-title").parent()
        .parent()
        .show();
    });
  }
  else if (str !== "" && cardsShown === false) {

    $(".card-title").parent()
      .parent()
      .show();
    $(".card-title")
      .filter(function () {
        return $(this).text() !== str;
      })
      .parent()
      .parent()
      .show();
    cardsShown === true;
    inputVal = false;
    innerHtml3 = $(".card-title")
      .filter(function () {
        return $(this).text() === str;
      })
      .parent().parent().html();
    title = "search result";
    lastNote = "Search result found";
    printModal2(title, innerHtml3, lastNote);
  }
  else {
    $(".card-title")
      .filter(function () {
        return $(this).text() !== str;
      })
      .parent()
      .parent()
      .show();
    inputVal = false;

  }




};
function printModal(title, body, lastNote) {

  $(".modal-title").html(title)
  $(".modal-body").append(body.children());
  $(".modal-last-note").html(lastNote);
  $("#myModal").modal("show");
}

function printModal2(title, body, lastNote) {

  $(".modal-title").html(title)
  $(".modal-body").append(body);
  $(".modal-last-note").html(lastNote);
  $("#myModal").modal("show");
}
    // const paralx0 = document.getElementById("paralx0");
    // paralx0.wrapper.onscroll = function () {
    //   let y = wrapper.scrollTop;
    //   paralx0.style.top = 1800 - y * 0.5 + "px";
    //   paralx1.style.top = 1200 - y * 0.75 + "px";
    //   paralx2.style.top = 800 + y * 0.5 + "px";
    // };

