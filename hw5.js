
const m = {
    width: 1000,
    height: 900
}

const svg = d3.select("body").append('svg')
    .attr('width', m.width)
    .attr('height', m.height)

const g = svg.append('g')

d3.json('nygeo.json').then(function(data) {

    d3.csv('data.csv').then(function(pointData) {

        // draw NY map
        const albersProj = d3.geoAlbers()
            .scale(90000)
            .rotate([73.935242, 0]) // -longitude
            .center([0, 40.730610]) // latitude
            .translate([m.width/2, m.height/2]);

        const geoPath = d3.geoPath()
        .projection(albersProj)

        g.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
            .attr('fill', '#ccc')
            .attr('d', geoPath)

        // plots circles on the NY map
        g.selectAll('.circle')
            .data(pointData)
            .enter()
            .append('circle')
                .attr('cx', function(d) { 
                    let scaledPoints = albersProj([d['longitude'], d['latitude']])
                    return scaledPoints[0]
                })
                .attr('cy', function(d) {
                    let scaledPoints = albersProj([d['longitude'], d['latitude']])
                    return scaledPoints[1]
                })
                .attr('r', 4)
                .attr('stroke', '#A40034')
                .attr('fill', '#D8275F')
                .on( "click", function(){
                    console.log(this);
                    d3.select(this)
                      .attr("opacity",1)
                      .transition()
                      .duration( 1500 )
                      .attr( "cx", m.width * Math.round( Math.random() ) )
                      .attr( "cy", m.height * Math.round( Math.random() ) )
                      .attr( "opacity", 0 )
                      .on("end",function(){
                        d3.select(this).remove();
                      })
                    });

        
    })
  
})
