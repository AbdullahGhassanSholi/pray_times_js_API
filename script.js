let temp = '';
function display() {
  let tempCity = document.getElementById('city').value;
  let tempCountry = document.getElementById('country').value;

  if (
    tempCountry == 'فلسطين' &&
    (tempCity == 'نابلس' || tempCity == 'جنين' || tempCity == 'الخليل')
  ) {
    getDataFromAPI(tempCity, tempCountry);
  } else if (tempCountry == 'لبنان' && tempCity == 'بيروت')
    getDataFromAPI(tempCity, tempCountry);
  else if (tempCountry == 'مصر' && tempCity == 'القاهرة')
    getDataFromAPI(tempCity, tempCountry);
  else if (tempCountry == 'الاردن' && tempCity == 'عمان')
    getDataFromAPI(tempCity, tempCountry);
  else {
    document.getElementsByClassName('flow')[0].style.display = 'block';
  }
}

function getDataFromAPI(tempCity, tempCountry) {
  let now = new Date();
  let date =
    now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
  console.log(date);
  axios
    .get(
      `http://api.aladhan.com/v1/timingsByCity/${date}?city=${tempCity}&country=${tempCountry}&method=8`
    )
    .then((response) => {
      let prays = response.data;
      console.log(response.data.data.timings.Fajr);
      let contentCityCountry = `<h1 style="font-size:100px;">${tempCountry}</h1>
        <h2 style="font-size:70px;">${tempCity}</h2>
        <h3 style="font-size:30px;">${prays.data.date.gregorian.date}<h3>`;
      document.getElementsByClassName('display-country-city')[0].innerHTML =
        contentCityCountry;
      let content = `
        <div class="box">
          <h2>الفجر</h2>
          <h3>${prays.data.timings.Fajr}</h3>
        </div>
        <div class="box">
          <h2>الشروق</h2>
          <h3>${prays.data.timings.Sunrise}</h3>
        </div>
        <div class="box">
          <h2>الظهر</h2>
          <h3>${prays.data.timings.Dhuhr}</h3>
        </div>
        <div class="box">
          <h2>العصر</h2>
          <h3>${prays.data.timings.Asr}</h3>
        </div>
        <div class="box">
          <h2>المغرب</h2>
          <h3>${prays.data.timings.Maghrib}</h3>
        </div>
        <div class="box">
          <h2>العشاء</h2>
          <h3>${prays.data.timings.Isha}</h3>
        </div>
        
        `;

      document.getElementsByClassName('prayer-times')[0].innerHTML = content;
    })
    .catch((error) => {
      //alert('error');
    });
}

function hide() {
  document.getElementsByClassName('flow')[0].style.display = 'none';
}
