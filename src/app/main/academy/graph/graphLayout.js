export const layout = {
    name: 'cola',
    animate: true, // whether to show the layout as it's running
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    maxSimulationTime: 4000, // max length in ms to run the layout
    ungrabifyWhileSimulating: true, // so you can't drag nodes during layout
    fit: true, // on every layout reposition of nodes, fit the viewport
    padding: 30, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
    circle: true,
    directed: true,
    // layout event callbacks
    ready: function () {}, // on layoutready
    stop: function () {}, // on layoutstop
    // positioning options
    randomize: false, // use random node positions at beginning of layout
    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
    nodeSpacing: function (node) {
      return 0;
    }, // extra spacing around nodes
    flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    alignment: undefined, // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
    gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]
    centerGraph: true, // adjusts the node positions initially to center the graph (pass false if you want to start the layout from the current position)

    // different methods of specifying edge length
    // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: function( edge ){ return 200; }, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation

    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
    
  };

  export const styleSheet = [
    {
      selector: 'node',
      style: {
        backgroundColor: '#046684',       
        label: 'data(label)',
        "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        "text-valign": "center",
        "text-halign": "center",
        'overlay-padding': '6px',
        'z-index': '10',
        //text props
        'text-outline-color': '#4a56a6',
        'text-outline-width': '2px',
        color: 'white',
        fontSize: 20,
      },
    },
    
    {
      selector: 'node:selected',
      style: {
        'border-width': '6px',
        'border-color': '#AAD8FF',
        'border-opacity': '1',       
      },
    },
    {
      selector: "node[type='device']",
      style: {
        shape: 'round-rectangle',
        'background-color': '#1A7785',
        'width': 50,
        'height': 50,
       
      },
    },
         {
        selector: "node[type='sub']",
        style: {
          shape: 'octagon',
          'background-color': '#1A7785',
          'width': 30,
          'height': 30,
          //text props
       
        },
      },
    {
      selector: 'edge',
      style: {
        width: 3,
        label: 'data(label)', 
        'text-outline-color': '#0A68B7',
        'text-outline-width': '4px', 
        'line-color': '#09609C',
        'target-arrow-color': '#09609C',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'color': 'white',        
      },
    },
    {
        selector: 'edge:selected',
        style: {
            width: 6,
            'border-color': '#09609C',
            'border-opacity': '0',
            'curve-style': 'bezier',         
        },
      },
  ];
  
   
  // export const layout = {
  //   name: 'breadthfirst',
  //   fit: true,
  //   circle: true,
  //   directed: true,
  //   padding: 50,
  //   spacingFactor: 1.5,
  //   animate: true,
  //   animationDuration: 1000,
  //   avoidOverlap: true,
  //   nodeDimensionsIncludeLabels: false,
  // };
