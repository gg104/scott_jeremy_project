//binomial_revision.

//now create and manage the distribution
			//get svg object from page
			var svg = d3.select("#canvas");
			//Width and height defined by svg object on web page
			var width = svg.attr("width");
			var height = svg.attr("height");
//initial params for the beta distribution
//these give a uniform distribution

		var alpha = 1;
		var beta = 1;
		var prob = 0.4;

		var success = 0;
		var failure = 0;

		var priorAlpha = alpha;
		var priorBeta = beta;



       //display info about prior distribution
       var title = svg.append("text")
			.attr("id", "title")
			.attr("x", (width/2))
			.attr("y", 16)
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.style("fill", 'black')
			.style("font-family", "sans-serif")
			.text("Beta Prior Distribution: ");

		var title2 = svg.append("text")
			.attr("id", "title2")
			.attr("x", (width/2))
			.attr("y", 38)
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.style("fill", 'black')
			.style("font-family", "sans-serif")
			.text(" alpha = " + alpha + ",   beta = " + beta +
			    ",  mean = " + round(jStat.beta.mean(alpha,beta),2) +
			    ",  sd = " + round(Math.sqrt(jStat.beta.variance(alpha,beta)),2));

       var padding = 30;
		var distScale = d3.scaleLinear()
			.domain([0,1])
			.range([padding,width-padding]);

		var xAxis = d3.axisBottom()
                  .scale(distScale);

		  svg.append("g")
    		.attr("class", "axis")
    		.attr("transform", "translate(0," + (height - padding) + ")")
    		.call(xAxis);

    	var pdfScale = d3.scaleLinear()  //needs work!!
    		.domain([0,1.1* jStat.beta.pdf(0.5,1,1)])
    		.range([height-padding-5,padding]);


		var dist = [];


		for(var i = 0.01; i < 1; i=i+0.01) {
			dist.push([i, round(jStat.beta.pdf(i,alpha,beta),3)]);
		}

		var area = d3.area()
			.x(function(d) {return distScale(d[0])})
			.y0(pdfScale(0))
			.y1( function(d) { return pdfScale(d[1])});


		var distLine = d3.line()
			.x( function(d) { return distScale(d[0])})
			.y( function(d) { return pdfScale(d[1])});


		var distPath = svg.selectAll("path.distribution")
			.data([dist])
			.enter().append("path")
			.attr("d", area)
			.style("fill", wackerlyColors.red)
			.style("opacity", 1)
			;

		var maxText = svg.append('text')
			.attr("x", (width/2))
			.attr("y", 50)
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.style("fill", 'none')
			.style("font-family", "sans-serif")
			.text("Max Trials Reached.  Use Reset")

		function update() {
			if(alpha + beta -2 > 1000) {
				 maxText.style('fill', 'red');
			}
			//a new trial
			else {

				if(Math.random() <= prob) {
					alpha++;
					success++;
				}
				else {
					beta++;
					failure++;
				}

			distPath.remove();
			dist=[];
			for(var i = 0.01; i < 1; i=i+0.01)
				dist.push([i, round(jStat.beta.pdf(i,alpha,beta),3)]);

			title
			    .text("Beta Posterior Distribution given S = " + success + ",  F = " + failure + " (N = " + success + " + " + failure + " = " +(success+failure)+" )");

			title2
				.text(" alpha = " + alpha + ",   beta = " + beta +
			    ",  mean = " + round(jStat.beta.mean(alpha,beta),2) +
			    ",  sd = " + round(Math.sqrt(jStat.beta.variance(alpha,beta)),2));

			pdfScale.domain([0,1.1* d3.max(dist, function(d) {return d[1]})]);
			distPath = svg.selectAll("path.distribution")
			.data([dist])
			.enter().append("path")
			.attr("d", area)
			.style("fill", wackerlyColors.red)
			.style("opacity", 1)
			;
		}
	};

   //create buttons
    var oneSample = d3.select('#next')
	  	.append('button')
	  	.attr('id', 'oneTrialButton')
	  	.attr('type', 'button')
	  	.style('font-size', '16px')
	  	.style('background-color', wackerlyColors.blue)
	  	.style('color', 'white')
	  	.style('padding', '12px 16px')
	  	.text('Next Trial')
	  	 .attr('class','myButton')
	  		.on('click',update);

		var manySample = d3.select('#many')
		 .append('button')
		 .attr('id', 'manyTrialButton')
		 .attr('type', 'button')
		 .style('font-size', '16px')
		 .style('background-color', wackerlyColors.blue)
		 .style('color', 'white')
		 .style('padding', '12px 16px')
		 .text('50 Trials')
			.attr('class','myButton')
			 .on('click', function() {for(i=1; i<=50; i++) update()});

		var resetButton = d3.select('#reset')
		 .append('button')
		 .attr('id', 'reset')
		 .attr('type', 'button')
		 .style('font-size', '16px')
		 .style('background-color', wackerlyColors.blue)
		 .style('color', 'white')
		 .style('padding', '12px 16px')
		 .text('Reset')
			.attr('class','myButton')
			 .on('click',redoPrior);



		function redoPrior() {
			alpha = priorAlpha;
			beta = priorBeta;
			success = 0;
			failure = 0;
			distPath.remove();
			dist=[];
			for(var i = 0.01; i < 1; i=i+.02)
				dist.push([i, round(jStat.beta.pdf(i,alpha,beta),3)]);

			pdfScale.domain([0,1.1* d3.max(dist, function(d) {return d[1]})]);

			distPath = svg.selectAll("path.distribution")
				.data([dist])
				.enter().append("path")
				.attr("d", area)
				.style("fill", wackerlyColors.red)
				.style("opacity", 1)
				;
			title
				.text("Beta Prior Distribution: ");
			title2
				.text(" alpha = " + alpha + ",   beta = " + beta +
				",  mean = " + round(jStat.beta.mean(alpha,beta),2) +
				",  sd = " + round(Math.sqrt(jStat.beta.variance(alpha,beta)),2));

			maxText.style('fill', 'none');
		}

  //probability selection menu
var probs = [];
var probValues = [];

for(i=0.05; i<= 0.95; i=i+0.05) {
	probs.push('p = ' + round(i,2));
	probValues.push(round(i,2));
}

	var selectProb = d3.select('#menu')
	  .append('select')
	    .attr('id', 'probMenu')
			.style('height', '40px')
			.style('background-color', wackerlyColors.blue)
			.style('color', wackerlyColors.white)
			.style('font-size', '18px')
			.style('border', 'none')
	    .on('change',changeProb);




	var options = selectProb
	  .selectAll('optionStat')
		.data(probs).enter()
		.append('option')
			.text(function (d) { return d;}).attr('font-size', '16px')
			.style('background-color', wackerlyColors.white)
			.style('color', wackerlyColors.black);



	selectProb.property('selectedIndex', '7');

	function changeProb() {
	      probIndex = selectProb.property('selectedIndex');

				prob = probValues[probIndex];
				redoPrior();
	}



	d3.select("#alphabox").append('input')
    .attr('type','text')
		.attr('id', 'alphaBox')
    .attr('name','alpha')
    .attr('value','1.0')
		.style('border-radius', '8px')
		.style('width', '40px')
	  .style('padding', '12px 20px')
		.style('font-size', '16px')
		.style('border', '3px solid ' + wackerlyColors.blue)
		.style('background-color', wackerlyColors.white)
		.on('input', function() {if(+this.value > 0) {priorAlpha = +this.value; redoPrior();}});

	d3.select("#betabox").append('input')
    .attr('type','text')
    .attr('name','beta')
    .attr('value','1.0')
		.style('border-radius', '8px')
		.style('width', '40px')
	  .style('padding', '12px 20px')
		.style('font-size', '16px')
		.style('border', '3px solid ' + wackerlyColors.blue)
		.style('background-color', wackerlyColors.white)
		.on('input', function() {if(+this.value > 0) {priorBeta = +this.value; redoPrior();}});
