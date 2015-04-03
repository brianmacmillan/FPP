//weather.js - not used
    var weatherURL = "http://api.worldweatheronline.com/free/v2/weather.ashx?q=new%20york&format=json&num_of_days=5&key=a0738226de98af1a65b8fa95eb0a2";
      function getWeather(weather){

        $.ajax({    
          url: weatherURL,
          type:'GET',
          dataType:'jsonp',
          error: function(data){
            console.log("I got a problem");
          },
          success: function(data){

            var n = data.data.request[0].query.lastIndexOf(",");
            // console.log(data.data.request[0].query.substr(0, n));

            var weatherLocation = data.data.request[0].query.substr(0, n);
            // var weatherDate = d3.time.format("%X   %a %m/%d/%Y")(new Date(data.data.weather[0].date));
            var weatherDate = data.data.weather[0].date
            // console.log(weatherDate);
            var weatherSunrise =data.data.weather[0].astronomy[0].sunrise;
            var weatherSunset = data.data.weather[0].astronomy[0].sunset;
            var weatherTemp = data.data.current_condition[0].temp_F;
            var weatherDescription = data.data.current_condition[0].weatherDesc[0].value;

            var format = d3.time.format("%a %X  %x");
              time = new Date();
              weatherDate = format(time);
            // console.log(weatherDate);
            // console.log(time);
            // console.log(weatherTemp);
            // console.log(weatherDescription);
            
            $('#name').html("<p>" + weatherLocation + "<p>");
          $('#date').html("<p>" + weatherDate + "</p>" + "<br/>");

            $('#temp').html("<p>" + weatherTemp + " &#8457; &nbsp&nbsp" + weatherDescription + "</p>" );
          $('#sun').html('Sunrise:' + weatherSunrise + "<br/> Sunset " + weatherSunset + "<br/>");
          setTimeout(getWeather,60000);

          }
        });
    } 
    getWeather();  