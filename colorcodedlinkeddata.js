/* 

This file contains all code for parsing the provided csv's, then feeding
the data into linkurious for visualization.

## INPUTS:

# edges.csv
Contents: The relationship between nodes / ideas. example row:
  antipositivism,	type of,	epistemology 

# nodes.csv [currently not used]
Contents: All ideas along with a description. example row:
  post-modernism,	"An intellectual mo..."" (Martin, 2002).

# papers.csv [Currently not used.]

## OUTPUT:
The provided ideas as nodes, with lines (as defined by edges.csv) 
between nodes, thereby showing the relationship between ideas.
 
 */


// run parseCsv() on edges.csv
 $.get("edges.csv",visualizeCSV);

var edgesCSVString ;

// 
function visualizeCSV(edgesCSV){

  edgesCSVString = edgesCSV.toString();
//  console.log ("doop"+csv.toString());

// split csv into array of triples
// example: ("antipositivism",	"type of",	"epistemology")
  var tripleArray=edgesCSVString.split('\r');

  var existingNodes = [];  // this will contain all unique nodes/ideas   
  

  // this will contain the node/connection data; used by linkurious
  var linkuriousData = {
      nodes: [],
      edges: []
    };


// Set up some important parent "types" (e.g. "ontology," "Theory")
// and detect nodes that are children of each. This will allow us to 
//color code: the parent type will get a saturated color (e.g. green or purple)
//and the immediate children will get a lighter shade of that color (e.g. light green. light purple)
  
colorDict = {"ontology":"#FC9883","epistemology":"#FD8A80","theoretical perspective":"#81BE66",
"theory":"#72BD97","methodology":"#5F99A5","methods":"#695C9B","analytic tool":"#A36EA1"};

// iterate over all triples, assigning colors
for (i=0; i<tripleArray.length; i++){
  //find a single node out of a triple
  var subjectRelationshipObject=tripleArray[i].split(',');
  var subject = subjectRelationshipObject[0].trim();
  var verb = subjectRelationshipObject[1].trim();
  var object = subjectRelationshipObject[2].trim();
  var chosenColor = "#666"; // default color

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
  //purple
    if (subject == 'methods'){
    var chosenColor = "#2d1d63";
  };
  // magenta
    if (subject == 'analytic tool'){
    var chosenColor = "#4c1e4a";
  };



  // check to see if a node/idea already exists in existingNodes
  // if it does not, add it to existingNodes (to track it), and add it as a linkurious node
    if ($.inArray(subject, existingNodes)== -1){
      existingNodes.push(subject);
      linkuriousData.nodes.push({
        id: subject,
        label: subject,
        x: Math.random(),
        y: Math.random(),
        size: 1,
        color: chosenColor
      });
    };


    // Now assign colors to nodes that are the immediate "type of" 
    //children of the special types assigned above. ("ontology", "theory," "methods", etc.)
    // e.g. if "practice theory" is a "type of" "theory" and "theory" is dark green, 
    // then "practice theory" should be assigned light green. This is only for "type of" relationships

var chosenColor = '#999' // default

// teal
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


  var object = subjectRelationshipObject[2].trim();
  //check to see if that node already exists
  //if it does not, add it as a linkurious node
    if ($.inArray(object, existingNodes)== -1){
      existingNodes.push(object);
      linkuriousData.nodes.push({
        id: object,
        label: object,
        x: Math.random(),
        y: Math.random(),
        size: 1,
        color: chosenColor
      });
    };
  
};


  // setup linkurious visualization
  s = new sigma({
    graph: linkuriousData,
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


  // create all the lines / relationships
  for (i=0; i<tripleArray.length; i++){
    var subjectRelationshipObject=tripleArray[i].split(',');
    var verb = subjectRelationshipObject[1].trim();
    var source = subjectRelationshipObject[0].trim(),
        target = subjectRelationshipObject[2].trim();
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
