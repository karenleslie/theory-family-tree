/**
 * This example shows the available edge label renderers for the canvas
 * renderer.
 */

 //bring in CSV
// $( document ).ready(function() {

 $.get("edges.csv",parseCsv);

// });
var csv ;

function parseCsv(data){

  csv = data.toString();
//  console.log ("doop"+csv.toString());

//split csv into array of triples
  var tripleArray=csv.split('\r');
  // console.log (tripleArray[0]);

      var 
  //i,
  //     s,
  //     N = nodes,
  //     E = edges,
      nodesCheck= [],     
      g = {
        nodes: [],
        edges: []
      };
// set up array for types. Will use if statement to assign nodes to types 
// and assign types to colors
     // types = [ontology, epistemology, theoretical perspective, theory, methodology, method, analytic tool]
//    
  
colorDict = {"ontology":"#FC9883","epistemology":"#FD8A80","theoretical perspective":"#81BE66",
"theory":"#72BD97","methodology":"#5F99A5","methods":"#695C9B","analytic tool":"#A36EA1"};


for (i=0; i<tripleArray.length; i++){
  //find a single node out of a triple
  var oneTriple=tripleArray[i].split(',');
  var subject = oneTriple[0];
  var verb = oneTriple[1];
  var object = oneTriple[2];
  var chosenColor = "#666";

  //var chosenColor = colorDict[object];

 if (verb == "type of"){
    var chosenColor = colorDict[object];
  };

// //teal
  if (subject == "theory"){
    var chosenColor = "#197043";
  };
  //ontology is orange
    if (subject == 'ontology'){
    var chosenColor = "#9b3925";
  };
  //epitstemology is red
    if (subject == 'epistemology'){
    var chosenColor = "#91271e";
  };
  //green
    if (subject == 'theoretical perspective'){
    var chosenColor = "#36751a";
  };
  //blue
    if (subject == 'methodology'){
    var chosenColor = "#155a68";
  };
  //purple 4A32A0
    if (subject == 'methods'){
    var chosenColor = "#2d1d63";
  };
  // //magenta
    if (subject == 'analytic tool'){
    var chosenColor = "#4c1e4a";
  };



  //check to see if that node already exists
  //if it does not, add it to the end of the array and add it as a node
    if ($.inArray(subject, nodesCheck)== -1){
      nodesCheck.push(subject);
      g.nodes.push({
        id: subject,
        label: subject,
        x: Math.random(),
        y: Math.random(),
        size: 1,
        color: chosenColor
      });
    };

// if(verb == 'type of'){
var chosenColor = '#999'
 // };

// //teal
  if (object == "theory"){
    var chosenColor = "#197043";
  };
  //ontology is orange
    if (object == 'ontology'){
    var chosenColor = "#9b3925";
  };
  //epitstemology is red
    if (object == 'epistemology'){
    var chosenColor = "#91271e";
  };
  //green
    if (object == 'theoretical perspective'){
    var chosenColor = "#36751a";
  };
  //blue
    if (object == 'methodology'){
    var chosenColor = "#155a68";
;  };
  //purple 4A32A0
    if (object == 'methods'){
    var chosenColor = "#2d1d63";
  };
  // //magenta
    if (object == 'analytic tool'){
    var chosenColor = "#4c1e4a";
  
  };


  var object = oneTriple[2];
  //check to see if that node already exists
  //if it does not, add it to the end of the array and add it as a node
    if ($.inArray(object, nodesCheck)== -1){
      nodesCheck.push(object);
      g.nodes.push({
        id: object,
        label: object,
        x: Math.random(),
        y: Math.random(),
        size: 1,
        color: chosenColor
      });
    };
  
};


  // Instantiate sigma:
  s = new sigma({
    graph: g,
    renderer: {
      container: document.getElementById('graph-container'),
      type: 'canvas'
    },
    settings: {
      edgeLabelSize: 'proportional',
      edgeLabelThreshold: 1,
      minEdgeSize: 4,
    }
  });



  for (i=0; i<tripleArray.length; i++){
    var oneTriple=tripleArray[i].split(',');
    var verb = oneTriple[1];
    var source = oneTriple[0],
        target = oneTriple[2];
    var edgeType = 'curvedArrow';
    if (verb == 'opposed to'){
     edgeType = 'arrow';
    };
    s.graph.addEdge({
        id: 'e' + i,
        label: verb,
        source: source,
        target: target,
        size: 8,
        color: '#ccc',
        type: edgeType
      });

  };
// Start the ForceLink algorithm:
var fa = sigma.layouts.startForceLink(s, {
  autoStop: true,
});
// Bind all events:
fa.bind('start stop interpolate', function(event) {
  // console.log(event.type);
});


  s.refresh();

}