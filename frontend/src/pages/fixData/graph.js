function Graph(maxValue, currentValue) {
    var graphWidth = 100;
    var graphHeight = 20;
    var graphValue = (currentValue / maxValue) * 100;
    var graphColor = 'green';
    if (graphValue < 50) {
        graphColor = 'red';
    } else if (graphValue < 80) {
        graphColor = 'yellow';
    }
    return ('<div class="graph" style="width:' + graphWidth + 'px;height:' + graphHeight + 'px;"><div class="graphValue" style="width:' + graphValue + '%;height:' + graphHeight + 'px;background-color:' + graphColor + ';"></div></div>');
    
}

export default Graph;