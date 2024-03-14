import React, { Component } from 'react';
import { ForceGraph3D, ForceGraph2D } from 'react-force-graph';
import { getGraphDataLocalNew } from '../../../store/apiServices';
import SpriteText from 'three-spritetext';

class GraphNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: null,
      SpriteText: null
    };
    this.fgRef = React.createRef();
  }
  componentDidMount() {
    this.getGraphDataDetails();
  }
  handleClick = node => {
    if (this.fgRef.current) {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      // Call cameraPosition method on the ForceGraph3D component
      this.fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
    }
  };
  getGraphDataDetails = async (status) => {
    try {
      await getGraphDataLocalNew().
        then(response => {
          this.setState({ elements: response });
        });

    } catch (error) {
    }
  };
  render() {
    const GROUPS = 12;
    const data = {
      nodes: [
        { id: 'Node 1', color: 'red' },
        { id: 'Node 2', color: 'blue' },
        // Add more nodes as needed
      ],
      links: [
        { source: 'Node 1', target: 'Node 2' },
        // Add more links as needed
      ],
    };
    if (this.state.elements)
      return (
        <div style={{ height: '300px', width: '100%' }}>
          <ForceGraph3D
            ref={this.fgRef}
            graphData={this.state.elements}
            nodeAutoColorBy="group"
            cameraPosition={{ x: 0, y: 0, z: 10 }}
            ambientLightColor={0xffffff} // Set ambient light color
            directionalLightColor={0xff0000} // Set directional light color
            backgroundColor="#0164c9"
            zoomDepth={100}
            width={600} // Set width of the graph component
            height={'100%'} // Set height of the graph component
            nodeLabel="id"
            linkDirectionalParticles={20}
            linkDirectionalParticleSpeed={d => d.value * 0.001}
            linkWidth={2}


            nodeRelSize={8}
            nodeOpacity={1} // Set node opacity to 1 (fully opaque)
            onNodeClick={this.handleClick}
            nodeThreeObject={node => {
              const sprite = new SpriteText(node.id);
              sprite.color = node.color;
              sprite.textHeight = 8;
              return sprite;
            }}
          />
        </div>
      );
  }
}

export default GraphNew;

// import React, { Component } from 'react';
// import ForceGraph2D from 'react-force-graph-2d';

// class GraphNew extends Component {
//   render() {
//     const graphData = {
//       nodes: [
//         { id: 'node1', name: 'Node 1' },
//         { id: 'node2', name: 'Node 2' },
//         { id: 'node3', name: 'Node 3' }
//       ],
//       links: [
//         { source: 'node1', target: 'node2' },
//         { source: 'node2', target: 'node3' },
//         { source: 'node3', target: 'node1' }
//       ]
//     };

//     return (
//       <div style={{ height: '300px' }}>
//         <ForceGraph2D
//           graphData={{
//             nodes: [
//               { id: 'node1', name: 'Node 1' },
//               { id: 'node2', name: 'Node 2' },
//               { id: 'node3', name: 'Node 3' }
//             ],
//             links: [
//               { source: 'node1', target: 'node2' },
//               { source: 'node2', target: 'node3' },
//               { source: 'node3', target: 'node1' }
//             ]
//           }}
//           nodeAutoColorBy="id"
//           nodeLabel="name"
//         />
//       </div>
//     );
//   }
// }

// export default GraphNew;