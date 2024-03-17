import React, { Component } from 'react';
import { ForceGraph3D, ForceGraph2D } from 'react-force-graph';
import { getGraphDataLocalNew } from '../../../store/apiServices';
import SpriteText from 'three-spritetext';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';

class GraphNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: null,
      SpriteText: null,
      isFullScreen: false,
      parentWidth: 400,
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
      await getGraphDataLocalNew().
        then(response => {
          this.setState({ elements: response });
        });

    } catch (error) {
    }
  };

  render() {
    const { isVisible, age, isFullScreen } = this.state;
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
            nodeLabel={node => `${node.id}: ${node.label}`}
            nodeAutoColorBy="id"
            cameraPosition={{ x: 0, y: 0, z: 10 }}
            // ambientLightColor={0xffffff} // Set ambient light color
            // directionalLightColor={0xff0000} // Set directional light color
            // // backgroundColor="white"
            zoomDepth={50}
            width={this.state.parentWidth}
            height='100%'
            // Set width of the graph component
            // height={'100%'} // Set height of the graph component
            // // nodeLabel="id"
            // linkDirectionalParticleSpeed={d => d.id * 0.001}
            // linkDirectionalParticles={true}
            linkWidth={1}
            linkLabel="label"
            cooldownTicks={100}
            linkDirectionalParticleColor={() => 'red'}
            linkDirectionalParticleWidth={6}
            linkHoverPrecision={10}
            onLinkClick={link => this.fgRef.current.emitParticle(link)}            
            linkDistance={100}
            nodeRelSize={15}
            nodeOpacity={1} // Set node opacity to 1 (fully opaque)
            onNodeClick={this.handleClick}
            nodeThreeObject={node => {
              const sprite = new SpriteText(node.label);
              sprite.color = node.color;
              sprite.textHeight = 8;
              sprite.animations = true
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