
import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { layout, styleSheet } from './graphLayout';
import { getGraphDataLocal } from '../../../store/apiServices'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { any } from 'zod';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';

// Register the Cola layout
cytoscape.use(cola);

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: any,
      isVisible: true,
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
      await getGraphDataLocal().
        then(response => {
          this.setState({ elements: response });
          this.initializeCytoscape(response, 'cola');
        });

    } catch (error) {
    }
  };

  handleChildClick = (value) => {
    const jsonData = this.state.elements;
    if (jsonData != null) {
      const exists = jsonData.nodes.filter(node => node.data.label.includes(value));
      if (exists !== undefined && exists.length > 0) {
        const allIds = exists.map(node => String(node.data.id));
        this.highlightMultpleNodesAndEdges(allIds);
      }
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
    const { isVisible, age } = this.state;
    const { course} = this.props;
    return (
      <div style={{ width: "100%" }}>

        <div className="flex shrink-0 items-center">
          <IconButton onClick={this.toggleVisibility} aria-label="toggle sidebar" >
            <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
          </IconButton>
          <Button
            to={`/apps/academy/graphView/${course.id}/${course.slug}`}
            component={Link}           
            style={{background:'none'}}
            variant="contained"
            endIcon={<FuseSvgIcon size={20}>heroicons-solid:arrows-expand</FuseSvgIcon>}
          >
          </Button>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="category-select-label">Layout</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={layout}
              label="layout"
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="cola">cola</MenuItem>
              <MenuItem value="breadthfirst">breadthfirst</MenuItem>
              <MenuItem value="grid">grid</MenuItem>
              <MenuItem value="circle">circle</MenuItem>
              <MenuItem value="random">random</MenuItem>
              <MenuItem value="concentric">concentric</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={`animated-div ${isVisible ? 'show' : 'hide'}`}>

          {this.state.isLoading && <FuseLoading />}
          <div
            ref={this.cyRef}
            style={{ width: '100%', height: '400px' }}
          />
        </div>
      </div>
    );
  }
}

export default Graph;
