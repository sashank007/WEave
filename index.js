require([
  "esri/tasks/Locator",
  "esri/Map",
  "esri/views/MapView",
  "esri/tasks/ServiceAreaTask",
  "esri/tasks/support/ServiceAreaParameters",
  "esri/tasks/support/RouteParameters",
  "esri/tasks/RouteTask",
  "esri/tasks/support/FeatureSet",
  "esri/Graphic",
  "esri/layers/FeatureLayer",
  "esri/symbols/PictureFillSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/geometry/Point"
], function(
  Locator,
  Map,
  MapView,
  ServiceAreaTask,
  ServiceAreaParams,
  RouteParameters,
  RouteTask,
  FeatureSet,
  Graphic,
  FeatureLayer,
  PictureFillSymbol,
  PictureMarkerSymbol,
  Point
) {
  var map = new Map({
    //basemap: "topo-vector"
    basemap: "streets-navigation-vector"
  });

  var polygons_stack = [];
  var today = new Date();
  var crimeID,
    crimeIntensity,
    crimeDescription,
    crimeLat,
    crimeLongit,
    crimeTime;
  var suspectEthnicity,
    suspectHeightFeet,
    suspectHeightInches,
    suspectAge,
    suspectOtherComments;
  var userName, userAge, userSex;
  var inputCrimeID, newSightingLat, newSightingLongit, newSightingTime;

  document.getElementById("btn_crime_form").onclick = function fun() {
    newCrimeForm();
  };
  document.getElementById("new_suspect_form").onclick = function fun() {
    newSuspectForm();
  };
  document.getElementById("hide_all").onclick = function fun() {
    hideSuspectForm();
    hideCrimeForm();
    hideCrimeReportResults();
    hideSuspectSightingReportResults();
  };

  function newCrimeForm() {
    hideSuspectForm();
    document.getElementById("crimelabel00").style.display = "block";
    document.getElementById("crimelabel01").style.display = "block";
    document.getElementById("crimelabel02").style.display = "block";
    document.getElementById("crimelabel03").style.display = "block";
    document.getElementById("crimelabel04").style.display = "block";
    document.getElementById("crimelabel1").style.display = "block";
    document.getElementById("crimelabel2").style.display = "block";
    document.getElementById("crimelabel3").style.display = "block";
    document.getElementById("crimelabel4").style.display = "block";
    document.getElementById("crimelabel5").style.display = "block";
    document.getElementById("crimelabel6").style.display = "block";
    document.getElementById("crimelabel7").style.display = "block";
    document.getElementById("crimelabel8").style.display = "block";
    document.getElementById("crimelabel9").style.display = "block";
    document.getElementById("crimetext00").style.display = "block";
    document.getElementById("crimetext01").style.display = "block";
    document.getElementById("crimetext02").style.display = "block";
    document.getElementById("crimetext03").style.display = "block";
    document.getElementById("crimetext04").style.display = "block";
    document.getElementById("crimetext1").style.display = "block";
    document.getElementById("crimetext2").style.display = "block";
    document.getElementById("crimetext3").style.display = "block";
    document.getElementById("crimetext4").style.display = "block";
    document.getElementById("crimetext5").style.display = "block";
    document.getElementById("crimetext6").style.display = "block";
    document.getElementById("crimetext7").style.display = "block";
    document.getElementById("submitnewcrimebutton").style.display = "block";
  }

  function hideCrimeForm() {
    document.getElementById("crimelabel00").style.display = "none";
    document.getElementById("crimelabel01").style.display = "none";
    document.getElementById("crimelabel02").style.display = "none";
    document.getElementById("crimelabel03").style.display = "none";
    document.getElementById("crimelabel04").style.display = "none";
    document.getElementById("crimelabel1").style.display = "none";
    document.getElementById("crimelabel2").style.display = "none";
    document.getElementById("crimelabel3").style.display = "none";
    document.getElementById("crimelabel4").style.display = "none";
    document.getElementById("crimelabel5").style.display = "none";
    document.getElementById("crimelabel6").style.display = "none";
    document.getElementById("crimelabel7").style.display = "none";
    document.getElementById("crimelabel8").style.display = "none";
    document.getElementById("crimelabel9").style.display = "none";
    document.getElementById("crimetext00").style.display = "none";
    document.getElementById("crimetext01").style.display = "none";
    document.getElementById("crimetext02").style.display = "none";
    document.getElementById("crimetext03").style.display = "none";
    document.getElementById("crimetext04").style.display = "none";
    document.getElementById("crimetext1").style.display = "none";
    document.getElementById("crimetext2").style.display = "none";
    document.getElementById("crimetext3").style.display = "none";
    document.getElementById("crimetext4").style.display = "none";
    document.getElementById("crimetext5").style.display = "none";
    document.getElementById("crimetext6").style.display = "none";
    document.getElementById("crimetext7").style.display = "none";
    document.getElementById("submitnewcrimebutton").style.display = "none";
  }

  function newSuspectForm() {
    hideCrimeForm();
    hideCrimeReportResults();

    document.getElementById("suspectlabel1").style.display = "block";
    document.getElementById("suspecttext1").style.display = "block";
    document.getElementById("suspectlabel2").style.display = "block";
    document.getElementById("suspecttext2").style.display = "block";
    document.getElementById("suspectlabel3").style.display = "block";
    document.getElementById("suspecttext3").style.display = "block";
    document.getElementById("suspectconfirmdetailsbutton").style.display =
      "block";
  }

  function newSuspectForm() {
    hideCrimeForm();
    hideCrimeReportResults();

    document.getElementById("suspectlabel1").style.display = "block";
    document.getElementById("suspecttext1").style.display = "block";
    document.getElementById("suspectlabel2").style.display = "block";
    document.getElementById("suspecttext2").style.display = "block";
    document.getElementById("suspectlabel3").style.display = "block";
    document.getElementById("suspecttext3").style.display = "block";
    document.getElementById("suspectconfirmdetailsbutton").style.display =
      "block";
  }

  //function to hide elements of the suspect form. Used in Hide All Info button.
  function hideSuspectForm() {
    document.getElementById("suspectlabel1").style.display = "none";
    document.getElementById("suspecttext1").style.display = "none";
    document.getElementById("suspectlabel2").style.display = "none";
    document.getElementById("suspecttext2").style.display = "none";
    document.getElementById("suspectlabel3").style.display = "none";
    document.getElementById("suspecttext3").style.display = "none";
    document.getElementById("suspectconfirmdetailsbutton").style.display =
      "none";
  }

  function getsetCrimeData() {
    document.getElementById("header").style.display = "block";
    document.getElementById("resultstext1").style.display = "block";
    document.getElementById("resultstext11").style.display = "block";
    document.getElementById("resultstext12").style.display = "block";
    document.getElementById("resultstext13").style.display = "block";
    document.getElementById("resultstext2").style.display = "block";
    document.getElementById("resultstext3").style.display = "block";
    document.getElementById("resultstext4").style.display = "block";
    document.getElementById("resultstext5").style.display = "block";
    document.getElementById("resultstext6").style.display = "block";
    document.getElementById("resultstext7").style.display = "block";
    document.getElementById("resultstext8").style.display = "block";
    document.getElementById("resultstext9").style.display = "block";
    document.getElementById("resultstext10").style.display = "block";
    document.getElementById("mutable1").style.display = "block";
    document.getElementById("mutable11").style.display = "block";
    document.getElementById("mutable12").style.display = "block";
    document.getElementById("mutable13").style.display = "block";
    document.getElementById("mutable2").style.display = "block";
    document.getElementById("mutable3").style.display = "block";
    document.getElementById("mutable4").style.display = "block";
    document.getElementById("mutable5").style.display = "block";
    document.getElementById("mutable6").style.display = "block";
    document.getElementById("mutable7").style.display = "block";
    document.getElementById("mutable8").style.display = "block";
    document.getElementById("mutable9").style.display = "block";
    document.getElementById("mutable10").style.display = "block";

    hideCrimeForm();

    crimeIntensity = document.getElementById("crimetext1").value;
    userName = document.getElementById("crimetext00").value;
    userSex = document.getElementById("crimetext01").value;
    userAge = document.getElementById("crimetext02").value;
    crimeLat = document.getElementById("crimetext03").value;
    crimeLongit = document.getElementById("crimetext04").value;
    crimeDescription = document.getElementById("crimetext2").value;
    suspectEthnicity = document.getElementById("crimetext3").value;
    suspectHeightFeet = document.getElementById("crimetext4").value;
    suspectHeightInches = document.getElementById("crimetext5").value;
    suspectAge = document.getElementById("crimetext6").value;
    suspectOtherComments = document.getElementById("crimetext7").value;
    crimeID = Math.round(10000 + Math.random() * 10000);

    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var location = crimeLat + "," + crimeLongit;

    document.getElementById("mutable1").innerHTML = crimeID; //crime.cID
    document.getElementById("mutable11").innerHTML = userName;
    document.getElementById("mutable12").innerHTML = userSex;
    document.getElementById("mutable13").innerHTML = userAge;
    document.getElementById("mutable2").innerHTML = crimeIntensity; //crime.cIntensity
    document.getElementById("mutable3").innerHTML = crimeDescription; //crime.cDescription
    document.getElementById("mutable4").innerHTML = suspectEthnicity; //crime.sEthnicity
    document.getElementById("mutable5").innerHTML = suspectHeightFeet; //crime.sHeightFeet
    document.getElementById("mutable6").innerHTML = suspectHeightInches; //crime.sHeightInches
    document.getElementById("mutable7").innerHTML = suspectAge; //crime.sAge
    document.getElementById("mutable8").innerHTML = suspectOtherComments; //crime.sOtherComments
    document.getElementById("mutable9").innerHTML = location;
    document.getElementById("mutable10").innerHTML = time; //crime.cTimeHours + ":" + crime.cTimeMinutes + ":" + crime.cTimeSeconds

    crimeTime = time;
  }

  function getSetReportData() {
    document.getElementById("header2").style.display = "block";
    document.getElementById("suspectresultstext1").style.display = "block";
    document.getElementById("suspectmutable1").style.display = "block";
    document.getElementById("suspectresultstext2").style.display = "block";
    document.getElementById("suspectmutable2").style.display = "block";
    document.getElementById("suspectresultstext3").style.display = "block";
    document.getElementById("suspectmutable3").style.display = "block";
    document.getElementById("suspectresultstext4").style.display = "block";
    document.getElementById("suspectmutable4").style.display = "block";

    hideSuspectForm();

    inputCrimeID = document.getElementById("suspecttext1").value;
    newSightingLat = document.getElementById("suspecttext2").value;
    newSightingLongit = document.getElementById("suspecttext3").value;
    newSightingTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    document.getElementById("suspectmutable1").innerHTML = inputCrimeID;
    document.getElementById("suspectmutable2").innerHTML = newSightingLat;
    document.getElementById("suspectmutable3").innerHTML = newSightingLongit;
    document.getElementById("suspectmutable4").innerHTML = newSightingTime;
  }

  function hideCrimeReportResults() {
    document.getElementById("header").style.display = "none";
    document.getElementById("resultstext1").style.display = "none";
    document.getElementById("resultstext11").style.display = "none";
    document.getElementById("resultstext12").style.display = "none";
    document.getElementById("resultstext13").style.display = "none";
    document.getElementById("resultstext2").style.display = "none";
    document.getElementById("resultstext3").style.display = "none";
    document.getElementById("resultstext4").style.display = "none";
    document.getElementById("resultstext5").style.display = "none";
    document.getElementById("resultstext6").style.display = "none";
    document.getElementById("resultstext7").style.display = "none";
    document.getElementById("resultstext8").style.display = "none";
    document.getElementById("resultstext9").style.display = "none";
    document.getElementById("resultstext10").style.display = "none";
    document.getElementById("mutable1").style.display = "none";
    document.getElementById("mutable11").style.display = "none";
    document.getElementById("mutable12").style.display = "none";
    document.getElementById("mutable13").style.display = "none";
    document.getElementById("mutable2").style.display = "none";
    document.getElementById("mutable3").style.display = "none";
    document.getElementById("mutable4").style.display = "none";
    document.getElementById("mutable5").style.display = "none";
    document.getElementById("mutable6").style.display = "none";
    document.getElementById("mutable7").style.display = "none";
    document.getElementById("mutable8").style.display = "none";
    document.getElementById("mutable9").style.display = "none";
    document.getElementById("mutable10").style.display = "none";
  }

  function hideSuspectSightingReportResults() {
    document.getElementById("header2").style.display = "none";
    document.getElementById("suspectresultstext1").style.display = "none";
    document.getElementById("suspectmutable1").style.display = "none";
    document.getElementById("suspectresultstext2").style.display = "none";
    document.getElementById("suspectmutable2").style.display = "none";
    document.getElementById("suspectresultstext3").style.display = "none";
    document.getElementById("suspectmutable3").style.display = "none";
    document.getElementById("suspectresultstext4").style.display = "none";
    document.getElementById("suspectmutable4").style.display = "none";
  }

  var prev_x = null;
  var prev_y = null;

  var createNewPoint = function(x, y, uri) {
    var point = new Point(y, x);

    var graphic = new Graphic({
      geometry: point,
      symbol: {
        type: "picture-marker", // autocasts as new PictureMarkerSymbol()
        url: uri,
        width: "40px",
        height: "40px"
      }
    });

    view.graphics.add(graphic);
    console.log("adding new point : ", view.graphics.toArray());
    // createGraphic("start",point);
  };

  var allAlerts_array = [];
  var isDistancePoint = false;
  var distancePointers = [];
  var prev_alerts_length = 0;

  var alertMapPoint = null;
  document.getElementById("btn").onclick = function fun() {
    getRoute();
  };

  document.getElementById("get_distances").onclick = function fun() {
    isDistancePoint = !isDistancePoint;
    var btn = document.getElementById("get_distances");
    if (isDistancePoint) {
      document.body.style.cursor = "pointer";

      btn.style.backgroundColor = "red";
    } else {
      document.body.style.cursor = "default";
      btn.style.backgroundColor = "#007bff";
    }
  };

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-111.928001, 33.424564],
    zoom: 11
  });

  var prev_alert_x = null;
  var prev_alert_y = null;

  function my_callb(x, y) {
    if (x != prev_alert_x && y != prev_alert_y) {
      prev_alert_x = x;
      prev_alert_y = y;
      var point = new Point(y, x);
      var locationGraphic = createGraphic("start", point);
      createNewPoint(
        33.40074973530103,
        -111.9532251746038,
        "https://cdn.icon-icons.com/icons2/582/PNG/512/woen-2_icon-icons.com_55032.png"
      );
      createNewPoint(
        33.40167893328508,
        -111.9281069105834,
        "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-2-512.png"
      );
      createNewPoint(
        33.42836887317751,
        -111.97027188065627,
        "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-4-512.png"
      );
      var graphicsArr = view.graphics.toArray();
      console.log("new suspect spotted :", locationGraphic);
      alertMapPoint = graphicsArr[0];
      var duration_of_alert = 5;
      var driveTimeCutoffs = [duration_of_alert];
      var serviceAreaParams = createServiceAreaParams(
        locationGraphic,
        driveTimeCutoffs,
        view.spatialReference
      );
      console.log("duration of alert : ", duration_of_alert);
      executeServiceAreaTask(serviceAreaParams);
      setInterval(() => {
        duration_of_alert = duration_of_alert + 1;

        driveTimeCutoffs = [duration_of_alert];
        var serviceAreaParams = createServiceAreaParams(
          locationGraphic,
          driveTimeCutoffs,
          view.spatialReference
        );
        executeServiceAreaTask(serviceAreaParams);
      }, 60000);
      // createPopUp(point);
    }
  }

  setInterval(() => getAlert(my_callb), 5000);

  // task for getting drive time area
  var serviceAreaTask = new ServiceAreaTask({
    url:
      "https://utility.arcgis.com/usrsvcs/appservices/1OMa1lF2EYi4VW8K/rest/services/World/ServiceAreas/NAServer/ServiceArea_World/solveServiceArea"
  });

  // task for getting routing

  var routeTask = new RouteTask({
    url:
      "https://utility.arcgis.com/usrsvcs/appservices/37XeLU6q64gs3IV4/rest/services/World/Route/NAServer/Route_World/solve"
  });

  //locator task for popups
  var locatorTask = new Locator({
    url:
      "https://utility.arcgis.com/usrsvcs/appservices/NswB8BYB8p3in6Al/rest/services/World/GeocodeServer/reverseGeocode"
  });

  view.on("click", function(event) {
    if (isDistancePoint) {
      var locationGraphic = createGraphic("distance_nodes", event.mapPoint);

      distancePointers.push();
    } else if (view.graphics.length === 0 && !isDistancePoint) {
      var locationGraphic = createGraphic("start", event.mapPoint);
      createNewPoint(
        33.40074973530103,
        -111.9532251746038,
        "https://cdn.icon-icons.com/icons2/582/PNG/512/woen-2_icon-icons.com_55032.png"
      );
      createNewPoint(
        33.40167893328508,
        -111.9281069105834,
        "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-2-512.png"
      );
      createNewPoint(
        33.42836887317751,
        -111.97027188065627,
        "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-4-512.png"
      );
      var graphicsArr = view.graphics.toArray();
      console.log("new suspect spotted :", locationGraphic);
      alertMapPoint = graphicsArr[0];
    } else if (!isDistancePoint) {
      var locationGraphic = createGraphic("nodes", event.mapPoint);
      createPopUp(event.mapPoint);
      console.log("new   : ", event.mapPoint);
    }

    if (!isDistancePoint) {
      var duration_of_alert = 5;
      var driveTimeCutoffs = [duration_of_alert];
      var serviceAreaParams = createServiceAreaParams(
        locationGraphic,
        driveTimeCutoffs,
        view.spatialReference
      );
      console.log("duration of alert : ", duration_of_alert);
      executeServiceAreaTask(serviceAreaParams);
      setInterval(() => {
        duration_of_alert = duration_of_alert + 1;

        driveTimeCutoffs = [duration_of_alert];
        var serviceAreaParams = createServiceAreaParams(
          locationGraphic,
          driveTimeCutoffs,
          view.spatialReference
        );
        executeServiceAreaTask(serviceAreaParams);
      }, 60000);
    }
  });

  function getColor(type) {
    if (type === "start") {
      return "red";
    }
    if (type === "nodes") {
      return "white";
    }
    if (type === "distance_nodes") {
      return "green";
    }
  }

  view.popup.autoOpenEnabled = false;
  function createPopUp(point) {
    console.log("point : ", point);
    var lat = Math.round(point.latitude * 1000) / 1000;
    var lon = Math.round(point.longitude * 1000) / 1000;

    var ts = new Date();

    view.popup.open({
      // Set the popup's title to the coordinates of the clicked location
      title:
        "Suspect Last Spotted\n" +
        " " +
        ts.toLocaleDateString() +
        " " +
        ts.toLocaleTimeString(),
      location: point // Set the location of the popup to the clicked location
    });

    var params = {
      location: point
    };

    locatorTask
      .locationToAddress(params)
      .then(function(response) {
        // If an address is successfully found, show it in the popup's content
        view.popup.content = response.address;
      })
      .catch(function(error) {
        // If the promise fails and no result is found, show a generic message
        view.popup.content = "No address was found for this location";
      });
  }
  // Create the location graphic
  function createGraphic(type, point) {
    // Remove any existing graphics
    // view.graphics.removeAll();
    // Create a and add the point

    if (type === "start") {
      var graphic = new Graphic({
        geometry: point,
        symbol: {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url:
            "https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Error_warning_alert_attention_remove_dialog.png",
          width: "24px",
          height: "24px"
        }
      });
    } else {
      var graphic = new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          color: getColor(type),
          size: 8
        }
      });
    }
    // createNewPoint(-12465374.137788918, 3953047.285241759);
    view.graphics.add(graphic);
    return graphic;
  }

  function createServiceAreaParams(
    locationGraphic,
    driveTimeCutoffs,
    outSpatialReference
  ) {
    // Create one or more locations (facilities) to solve for
    var featureSet = new FeatureSet({
      features: [locationGraphic]
    });
    // Set all of the input parameters for the service
    var taskParameters = new ServiceAreaParams({
      facilities: featureSet,
      defaultBreaks: driveTimeCutoffs,
      outSpatialReference: outSpatialReference
    });
    return taskParameters;
  }

  function getRoute() {
    // Setup the route parameters
    // createNewPoint(-12465374.137788918, 3953047.285241759);

    var graphicsArr = view.graphics.toArray();
    var allRoutes = [];

    for (var i = 0; i < graphicsArr.length; i++) {
      if (true) {
        allRoutes.push([alertMapPoint, graphicsArr[i]]);
      }
    }
    for (var i = 0; i < allRoutes.length; i++) {
      var routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: allRoutes[i]
        }),
        returnDirections: true
      });
      // Get the route
      routeTask.solve(routeParams).then(function(data) {
        data.routeResults.forEach(function(result) {
          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            // color:[119, 153, 204],
            width: 2
          };
          console.log("result route : ", result.route);

          view.graphics.add(result.route);
        });
      });
    }
  }
  function executeServiceAreaTask(serviceAreaParams) {
    // for (var i = 0; i < view.graphics.toArray().length; i++) {
    //   console.log("garphics :  ", view.graphics.toArray()[i]);
    //   console.log("polygons  :", polygons_stack[i]);
    //   if (view.graphics.toArray()[i].geometry.type === "polygon") {
    //     console.log("removign polygon...");
    //     view.graphics.splice(i, 1);
    //   }
    // }
    // doFirst();
    function callb(x, y) {
      if (x != prev_x && y != prev_y) {
        prev_x = x;
        prev_y = y;

        var point = new Point(y, x);
        var locationGraphic = createGraphic("nodes", point);
        createPopUp(point);
      }
    }
    setInterval(() => userAction(callb), 5000);
    console.log("after removing :  ", view.graphics.toArray());
    //   console.log("Graphicsarr after deleting : ", view.graphics.toArray());

    return serviceAreaTask.solve(serviceAreaParams).then(
      function(result) {
        if (result.serviceAreaPolygons.length) {
          // Draw each service area polygon
          result.serviceAreaPolygons.forEach(function(graphic) {
            graphic.symbol = {
              type: "simple-fill",
              color: "rgba(255,50,50,0.25)"
            };

            console.log("area ; ", graphic);
            view.graphics.add(graphic, 0);
            polygons_stack.push(graphic);
          });
        }
      },
      function(error) {
        console.log(error);
      }
    );
  }
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

//  const fetchSuspects= async () =>{
//   const get_all_crimes_url =
//     "https://1wd89o3osa.execute-api.us-east-1.amazonaws.com/dev/get_all_alerts";
//   console.log("fetching suspects");
// const resp =   fetch(get_all_crimes_url);
//     // .then(resp => resp.json()); // Transform the data into json
//   const data = await resp.json();

//       console.log(data.alerts);
//       console.log(Object.keys(data.alerts).length);
//       let dataLength = Object.keys(data.alerts).length;
//       var allAlerts = [];
//       {
//         for (let i = 0; i < Object.entries(data.alerts).length; i++) {
//           allAlerts.push(Object.entries(data.alerts)[i]);
//         }
//         console.log(allAlerts);
//       }
//       return allAlerts;
//       // Create and append the li's to the ul
//     // });

const userAction = async callback => {
  let x = null;
  let y = null;
  const response = await fetch(
    "https://1wd89o3osa.execute-api.us-east-1.amazonaws.com/dev/get_all_alerts"
  );
  const myJson = await response.json(); //extract JSON from the http response
  var allAlerts = myJson;
  var length = Object.keys(allAlerts.alerts).length;
  console.log("length:", length);
  if (length > 0) {
    allAlerts_array = [];
    {
      for (let i = 0; i < Object.entries(allAlerts.alerts).length; i++) {
        allAlerts_array.push(Object.entries(allAlerts.alerts)[i]);
      }
    }
    allAlerts_array.sort(function(a, b) {
      return b[0].time > a[0].time ? 1 : b[0].time === a[0].time ? 0 : -1;
    });

    console.log("allAlerts array : ", allAlerts_array);

    x = allAlerts_array[allAlerts_array.length - 1][1].location_x;

    y = allAlerts_array[allAlerts_array.length - 1][1].location_y;

    console.log("x ,y ", x, y);
  }

  callback(x, y);

  // let point = new Point(y, x);
  // var locationGraphic = createGraphic("nodes", point);
  // createPopUp(point);
};

const getAlert = async callback => {
  let x = null;
  let y = null;
  const response = await fetch(
    "https://1wd89o3osa.execute-api.us-east-1.amazonaws.com/dev/get_all_crimes"
  );
  const myJson = await response.json(); //extract JSON from the http response
  var allAlerts = myJson;
  var length = Object.keys(allAlerts.alerts).length;
  console.log("length of crimes:", length);
  if (length > 0) {
    allAlerts_array = [];
    {
      for (let i = 0; i < Object.entries(allAlerts.alerts).length; i++) {
        allAlerts_array.push(Object.entries(allAlerts.alerts)[i]);
      }
    }
    allAlerts_array.sort(function(a, b) {
      return b[0].time > a[0].time ? 1 : b[0].time === a[0].time ? 0 : -1;
    });

    console.log("allAlerts array : ", allAlerts_array);

    x = allAlerts_array[allAlerts_array.length - 1][1].location_x;

    y = allAlerts_array[allAlerts_array.length - 1][1].location_y;

    console.log("x ,y ", x, y);
  }

  callback(x, y);

  // let point = new Point(y, x);
  // var locationGraphic = createGraphic("nodes", point);
  // createPopUp(point);
};
function doFirst() {
  setInterval(() => {
    fetch(
      "https://1wd89o3osa.execute-api.us-east-1.amazonaws.com/dev/get_all_alerts"
    )
      .then(response => response.json())
      .then(data => {
        var allAlerts = data;
        console.log("data : ", data);
        var length = Object.keys(allAlerts.alerts).length;
        console.log("length:", length);
        if (length > 0) {
          // console.log("identified new alert...");
          allAlerts_array = [];
          {
            for (let i = 0; i < Object.entries(allAlerts.alerts).length; i++) {
              allAlerts_array.push(Object.entries(allAlerts.alerts)[i]);
            }
          }
          let x = allAlerts_array[1][1].location_x;
          let y = allAlerts_array[1][1].location_y;
          return x, y;
        }
      })
      .then((x, y) => {
        new Promise(function(resolve, reject) {
          let point = new Point(y, x);
        });
      });
    // var d = await userAction();
    // var allAlerts = await d;
    // var length = Object.keys(allAlerts.alerts).length;
    // console.log("length:", length);
    // if (length > 0) {
    //   // console.log("identified new alert...");
    //   allAlerts_array = [];
    //   {
    //     for (let i = 0; i < Object.entries(allAlerts.alerts).length; i++) {
    //       allAlerts_array.push(Object.entries(allAlerts.alerts)[i]);
    //     }
    //   }
    //   let x = allAlerts_array[0][1].location_x;
    //   let y = allAlerts_array[0][1].location_y;
    //   let point = new Point(y, x);
    //   var locationGraphic = createGraphic("nodes", point);
    //   createPopUp(point);
    //   console.log("all alerts :", allAlerts_array[0][1]);
    // }
    // if (allAlerts.length > prev_alerts_length) {
    //   console.log("new alerts");
    // }
  }, 5000);
}
