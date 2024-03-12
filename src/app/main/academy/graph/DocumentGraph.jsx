
import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { layout, styleSheet } from './graphLayout';
import { getGraphDocData } from '../../../store/apiServices'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { any } from 'zod';
import FuseLoading from '@fuse/core/FuseLoading';
cytoscape.use(cola);

class DocumentGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: any,
      isVisible: false,
      layout: '',
      isLoading: true
    };
    this.cyRef = React.createRef();
  }
  toggleVisibility = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  }
  componentDidMount() {
    this.getGraphDataDetails();
  }
  handleChange = (event) => {
    this.setState({ layout: event.target.value });
    if (this.state.elements !== null) {
      this.initializeCytoscape(this.state.elements, event.target.value);
    }
  };

  componentDidUpdate(prevProps) {
    // Check if the node or edge props have changed
    if (
      prevProps.nodes !== this.props.nodes ||
      prevProps.edges !== this.props.edges
    ) {
      // this.updateGraph();
    }
  }
  getGraphDataDetails = async (status) => {
    try {
      await getGraphDocData().
        then(response => {
          this.setState({ elements: response });
          this.initializeCytoscape(response, 'cola');
        });

    } catch (error) {
    }
  };

  initializeCytoscape(response, layoutName) {
    layout.name = layoutName;
    this.cy = cytoscape({
      container: this.cyRef.current,
      elements: response,
      layout: layout,
      stylesheet: styleSheet,
      style: styleSheet,
      edgeLength: function (edge) { return 200; }
    });
    this.setState({ isLoading: false });
    this.cy.pan({ x: 1000, y: 1000 });
    this.cy.on('tap', 'node', (event) => {
      const node = event.target;
      this.highlightNodeAndAnimateChildrenSelect(node);

    });
  }
  highlightNodeAndAnimateChildren(nodeId) {

    const selectedNode = this.cy.getElementById(nodeId);;
    // Define animation functions for highlighting and fading

    const highlightedColor = 'red';
    const normalColor = '#0A68B7';
    const nonHighlightedOpacity = 0.2;
    const highlightedOpacity = 1;
    const highlightDuration = 2000; // Duration of each animation cycle
    // Define animation functions for highlighting and fading

    let connectedEdges = selectedNode.connectedEdges()
    let connectedNodes = selectedNode.connectedNodes();
    let nonConnectedEdges = this.cy.edges().not(connectedEdges);

    nonConnectedEdges.animate({
      style: { 'opacity': nonHighlightedOpacity, 'border-color': 'none', width: 3 },
      duration: highlightDuration
    });
    this.cy.nodes().animate({
      style: { 'opacity': nonHighlightedOpacity, 'border-color': 'none', width: '30px', height: '30px', },
      duration: highlightDuration
    });
    this.cy.nodes().not(connectedNodes).animate({
      style: { 'border-color': 'none', width: '30px', height: '30px', 'opacity': nonHighlightedOpacity },
    })


    selectedNode.animate({
      style: { 'border-color': '#AAD8FF', width: '50px', height: '50px', 'opacity': highlightedOpacity },
      duration: highlightDuration
    });
    const neighborhood = selectedNode.neighborhood();

    // Highlight connected nodes
    neighborhood.nodes().forEach(node => {
      node.animate({
        style: { 'border-color': '#AAD8FF', width: '50px', height: '50px', 'border-width': '6px', 'opacity': highlightedOpacity },
        duration: highlightDuration
      });
    });
    connectedEdges.animate({
      style: { 'border-color': '#AAD8FF', width: 5, 'opacity': highlightedOpacity },
      duration: highlightDuration
    });
  }



  highlightMultpleNodesAndEdges(nodeIds) {
    const highlightedColor = 'red';
    const normalColor = '#0A68B7';
    const nonHighlightedOpacity = 0.4;
    const highlightedOpacity = 1;
    const highlightDuration = 2000;
    // Deselect all elements first

    this.cy.edges().forEach(edge => {
      edge.animate({
        style: { 'opacity': nonHighlightedOpacity, 'border-color': 'none', width: 3 },
        duration: highlightDuration
      });
    });

    this.cy.nodes().forEach(node => {
      if (!nodeIds.includes(node.id())) {
        node.animate({
          style: { 'opacity': nonHighlightedOpacity, 'border-color': 'none', width: '30px', height: '30px', },
          duration: highlightDuration
        });
      }
    });

    // Select the nodes based on their IDs
    this.cy.nodes().filter(node => nodeIds.includes(node.id())).animate({
      style: { 'border-color': '#AAD8FF', width: '50px', height: '50px', 'border-width': '6px', 'opacity': highlightedOpacity },
      duration: highlightDuration
    });

    // Select the connected edges
    this.cy.nodes().filter(node => nodeIds.includes(node.id())).edgesWith('*').animate({
      style: { 'border-color': '#AAD8FF', width: 5, 'opacity': highlightedOpacity },
      duration: highlightDuration
    });

    // Optionally, select connected nodes as well
    this.cy.nodes().filter(node => nodeIds.includes(node.id())).neighborhood().nodes().animate({
      style: { 'border-color': '#AAD8FF', width: '50px', height: '50px', 'border-width': '6px', 'opacity': highlightedOpacity },
      duration: highlightDuration
    });


  }


  highlightNodeAndAnimateChildrenSelect(node) {

    const highlightedColor = 'red';
    const normalColor = '#0A68B7';
    const nonHighlightedOpacity = 0.4;
    const highlightedOpacity = 1;
    const highlightDuration = 2000; // Duration of each animation cycle
    const selectedNode = node;
    // Define animation functions for highlighting and fading

    let connectedEdges = selectedNode.connectedEdges()
    let connectedNodes = selectedNode.connectedNodes();
    let nonConnectedEdges = this.cy.edges().not(connectedEdges);

    nonConnectedEdges.animate({
      style: { 'opacity': nonHighlightedOpacity, 'border-color': 'none', width: 3 },
      duration: highlightDuration
    });
    this.cy.nodes().animate({
      style: { 'opacity': nonHighlightedOpacity, 'border-color': 'none', width: '30px', height: '30px', },
      duration: highlightDuration
    });
    this.cy.nodes().not(connectedNodes).animate({
      style: { 'border-color': 'none', width: '30px', height: '30px', 'opacity': nonHighlightedOpacity },
    })
    const newItems = [];
    newItems.push({ id: selectedNode.data('id'), value: selectedNode.data('label') });
    selectedNode.animate({
      style: { 'border-color': '#AAD8FF', width: '50px', height: '50px', 'opacity': highlightedOpacity },
      duration: highlightDuration
    });
    const neighborhood = selectedNode.neighborhood();

    // Highlight connected nodes
    neighborhood.nodes().forEach(node => {
      newItems.push({ id: node.id(), value: node.data('label') });

      node.animate({
        style: { 'border-color': '#AAD8FF', width: '50px', height: '50px', 'border-width': '6px', 'opacity': highlightedOpacity },
        duration: highlightDuration
      });
    });
    connectedEdges.animate({
      style: { 'border-color': '#AAD8FF', width: 5, 'opacity': highlightedOpacity },
      duration: highlightDuration
    });
    this.setState({ sourceNames: newItems });
    this.props.updateParentState(newItems);
  }
  componentWillUnmount() {
    if (this.cy) {
      this.cy.destroy();
    }
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        {this.state.isLoading && <FuseLoading />}
        <div
          ref={this.cyRef}
          style={{ width: '100%', height: '600px' }}
        />
      </div>
    );
  }
}

export default DocumentGraph;
