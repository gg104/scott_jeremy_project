<article>
  <header>
      <h1 style="background-color:DodgerBlue;"> Paul </h1>
      <h2>The Man, The Mathematician, The Nub</h2>
      <script>
    function openCity(evt, cityName) {
      // Declare all variables
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }
    </script>
  </header>
<! testing to see if this comment appears....it did!!! >
  <div class="tab">
    <button class="tablinks" onclick="openCity(event, 'Personal')">Personal</button>
    <button class="tablinks" onclick="openCity(event, 'Academic')">Academic</button>
    <button class="tablinks" onclick="openCity(event, 'Athletic')">Athletic</button>
    <button class="tablinks" onclick="openCity(event, 'Photo Gallery')">Photo Gallery</button>
  </div>
  <!-- I am trying to add some sorta tab layout here, but I think to make them clickable//appear disappear, you need to incorporate java script which I havent been able to do yet. Edit: I got the java!!! -->
  <body style="background-color:DodgerBlue;" alt="Blue to match his beautiful eyes">
  <p>Paul you better get ready because we are actually making you a website this time &#128511;</p>
  </body>
</article>


  <script type="text/javascript"  src="./js/bstat/binomial_revision.js">
		</script>

  <div id="Personal" class="tabcontent">
    <h3>The Life of Paul</h3>
    <p>Personal information will be given out here.</p>
  </div>

  <div id="Academic" class="tabcontent">
    <h3>The Big Brain Himself</h3>
    <p>Paul is a studious individual.</p>
    <p1>Paul: <a href='https://linkedin.com/in/thisisgreat'>LinkedIn</a></p1>
  </div>

  <div id="Athletic" class="tabcontent">
    <h3>Athletic</h3>
    <p>Paul is a big runner guy.</p>
  </div>

  <div id="Photo Gallery" class="tabcontent">
    <h3>These are hot boi pics of Paul.</h3>
    <img src="https://athletics.kenyon.edu/images/2019/2/8/Neubauer_Paul_MTRK19.jpg?width=300" alt="Nubby Nub Nub">
  </div>
