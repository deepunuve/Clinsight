import React, { Component } from 'react';
import { ForceGraph3D, ForceGraph2D } from 'react-force-graph';
import { getGraphDocData } from '../../../store/apiServices';
import SpriteText from 'three-spritetext';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';

class DocumentGraphNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: null,
      SpriteText: null,
      sourceNames: []
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

    const { sourceNames } = this.state;
    const updatedItems = [...sourceNames];
    updatedItems.push({ id: node.id, source_name: node.label, key: 'key' });
    this.state.elements.links.forEach(link => {
      if (link.source.id === node.id) {
        let data = this.state.elements.nodes.find(node => node.id === link.target.id);
        updatedItems.push({ id: data.id, source_name: data.label, key: 'key' });
      } else if (link.target.id === node.id) {
        let data = this.state.elements.nodes.find(node => node.id === link.source.id);
        updatedItems.push({ id: data.id, source_name: data.label, key: 'key' });
      }
    });
    this.setState({ sourceNames: updatedItems });
    this.handleGraphClick(updatedItems);

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
      await getGraphDocData().
        then(response => {
          this.setState({ elements: response });
        });

    } catch (error) {
    }
  };
  handleGraphClick(newValue) {
    this.props.onClick(newValue);
  };

  findConnectedNodes = (clickedNode) => {
    const connectedNodes = [];

    // Iterate through the links to find connected nodes
    this.state.elements.links.forEach(link => {
      if (link.source === clickedNode.id) {
        connectedNodes.push(graphData.nodes.find(node => node.id === link.target));
      } else if (link.target === clickedNode.id) {
        connectedNodes.push(graphData.nodes.find(node => node.id === link.source));
      }
    });

    return connectedNodes;
  };
  render() {
    if (this.state.elements)
      return (
        <div style={{ width: "100%" }}>
          {this.state.isLoading && <FuseLoading />}
          <ForceGraph3D
            ref={this.fgRef}
            graphData={this.state.elements}
            nodeLabel={node => `${node.id}: ${node.label}`}
            nodeAutoColorBy="id"
            cameraPosition={{ x: 0, y: 0, z: 10 }}
            zoomDepth={50}
            width={1000}
            height={500}
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
          />
        </div>
      );
  }

}

export default DocumentGraphNew;