import React, { Component } from 'react';
import { ForceGraph3D, ForceGraph2D } from 'react-force-graph';
import { getGraphData, getStudiesLocal } from '../../../store/apiServices';
import SpriteText from 'three-spritetext';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import { group } from 'd3';

class GraphNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: null,
      SpriteText: null,
      isFullScreen: false,
      parentWidth: 400,
      parentheight: 500,
    };
    this.fgRef = React.createRef();
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }
  componentDidMount() {
    this.getGraphDataDetails();
  }
  toggleFullScreen() {
    this.setState({
      isFullScreen: this.state.isFullScreen ? false : true,
      parentWidth: this.state.isFullScreen ? 400 : window.innerWidth,
      parentheight: this.state.isFullScreen ? 500 : window.innerHeight,
    });

  }
  handleNodeHover(node) {
    // Toggle 'hovered' state for the node
    const { data } = this.state;
    const hoveredNode = data.nodes.find(n => n.id === node.id);
    if (hoveredNode) {
      hoveredNode.hovered = !hoveredNode.hovered;
      this.setState({ data });
    }
  }
  nodeColor = (node) => {
    // Highlight selected node in a different color
    if (selectedNode && node.id === selectedNode.id) {
      return 'red';
    }
    // Highlight connected nodes in a different color
    if (selectedNode && graphData.links.some((link) => link.source === selectedNode.id || link.target === selectedNode.id)) {
      if (graphData.links.some((link) => link.source === node.id || link.target === node.id)) {
        return 'green';
      }
    }
    return 'gray'; // Default color
  };
  handleLinkHover(link, prevLink) {
    // Highlight connected nodes on mouseover
    const { data } = this.state;
    if (link && link !== prevLink) {
      data.nodes.forEach(node => {
        node.hovered = link.source === node.id || link.target === node.id;
      });
      this.setState({ data });
    }
  }
  handleChildClick = (value) => {
    const jsonData = this.state.elements;
    if (jsonData != null) {
      const exists = jsonData.nodes.filter(node => node.label.includes(value));
      if (exists !== undefined && exists.length > 0) {
        exists.map(node => {
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
        });
      }
    }
  };

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
  // handleClick = node => {
  //   if (this.fgRef.current) {
  //     // Aim at node from outside it
  //     const distance = 40;
  //     const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

  //     // Call cameraPosition method on the ForceGraph3D component
  //     this.fgRef.current.cameraPosition(
  //       { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
  //       node, // lookAt ({ x, y, z })
  //       3000  // ms transition duration
  //     );
  //   }
  // };
  getGraphDataDetails = async (status) => {
    try {
      if (this.props.data) {
        const updatedItems = [];
        this.props.data.source.map(source => {
          updatedItems.push(source.source_name);
        });
        const postData = {
          id: this.props.data.id,
          doc: updatedItems
        };
        let input = JSON.stringify(postData)
        console.log(input);
        await getGraphData(postData).
          then(response => {
            this.setState({ elements: response });
          });
      }

    } catch (error) {
    }
  };
  getNodeShape = (node) => {
    const shapeMap = {
      A: 'cylinder',
      B: 'sphere',
      C: 'tetrahedron', // Example of another shape
      // Add more mappings here as needed
    };
    return shapeMap[node.id] || 'sphere'; // Default shape is sphere
  };

  nodeColor(node) {
    const { selectedNode } = this.state;
    const { graphData } = this.props.data;
    const colorMap = {};

    // Create a color map based on group numbers
    graphData.nodes.map(n => {
      colorMap[n.group] = colorMap[n.group] || `hsl(${Math.random() * 360}, 100%, 50%)`;
    });

    if (selectedNode && node.id === selectedNode.id) {
      return 'green'; // Highlight selected node
    }
    return colorMap[node.group]; // Use color map to assign color based on group
  }
  render() {
    const { isVisible, age, isFullScreen } = this.state;
    if (this.state.elements) {
      const firstNode = this.state.elements[0];
    }
    if (this.state.elements)
      return (
        <div className={` ${isFullScreen ? 'fullscreen' : 'fullscreen-container'}`} >
          <div className="flex shrink-0 items-center">
            <Button
              onClick={this.toggleFullScreen}
              style={{ background: 'none' }}
              variant="contained"
              endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrows-expand</FuseSvgIcon>}
            >
            </Button>
          </div>
          {this.state.isLoading && <FuseLoading />}

          <ForceGraph3D
            ref={this.fgRef}
            graphData={this.state.elements}
            nodeLabel={node => `${node.label}`}
            nodeAutoColorBy="id"
            // nodeAutoColorBy="group"
            // nodeColor={(node) => this.nodeColor(node)}
            cameraPosition={{ x: 0, y: 0, z: 10 }}
            // ambientLightColor={0xffffff} // Set ambient light color
            // directionalLightColor={0xff0000} // Set directional light color
            backgroundColor="#111827"
            zoomDepth={100}
            width={this.state.parentWidth}
            height={this.state.parentheight}            
            linkWidth={1}
            linkLabel="label"
            cooldownTicks={100}
            linkDirectionalParticleColor={() => 'red'}
            linkDirectionalParticleWidth={6}
            linkHoverPrecision={10}
            onLinkClick={link => this.fgRef.current.emitParticle(link)}
            linkDistance={100}
            nodeRelSize={5}
            nodeOpacity={1} // Set node opacity to 1 (fully opaque)
            onNodeClick={this.handleClick}
            nodeThreeObject={node => {
              let geometry;
              if (node.shape === 'sphere') {
                // Create tetrahedron geometry
                geometry = new THREE.SphereGeometry(0.5);
                const color = node.id === 1 ? 0xffffff : 0x2194ce; // Highlight first node
                geometry.scale(20, 20, 20);
                const material = new THREE.MeshBasicMaterial({ color });
                return new THREE.Mesh(geometry, material);
              }

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