      function mus(){
        //console.log(); 
        if ($('#landmarks')[0].checked == true){console.log('a');
          panoramioLayer.setMap(map)
        }else{
          console.log('b');panoramioLayer.setMap(null)
        };
      }
      function inc(){
          console.log(); 
          if ($('#incomeLayer')[0].checked == true){
            console.log('income layer display');
            $('.incomeLayer').css('display','visible')
          } else {
            console.log('income layer hide');
            $('.incomeLayer').css('display','none')
          }
      }
      function sta(){
        console.log(); 
        if ($('#stations')[0].checked == true){
          console.log('a');
          $('.stations').css('display','visible')
        } else {
          console.log('b');
          $('.stations').css('display','none')
        }
      }