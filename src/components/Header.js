import Slider from "./Slider";
import * as configs from '../models/Config.js';
import { AVLContext } from './App.js';
import { useContext } from 'react';
import React from 'react';
import * as visualizer from '../View/Visualizer.js';

const Header = React.forwardRef((props, canvasRef) => {
    let avl = useContext(AVLContext);
    const MAX_ITERATIONS = configs.getMaximumNodes() - configs.getMinimumNodes() + 20;
    const handleNodeOnChange = (value) => {
        let iterations = 0; // failsafe
        while (avl.size() < value && iterations < MAX_ITERATIONS) {
            let random = parseInt(Math.random() * 1000);
            avl.insert(random);
            iterations++;
        }
        iterations = 0;
        while (avl.size() > value && iterations < MAX_ITERATIONS) {
            avl.remove(avl.obtainRandomNodeElement());
            iterations++;
        }
        window.dispatchEvent(new Event('resize')); //useEffect refuses to work, and I don't want to write a custom one for objects, so this will do.
    }
    const handleSpeedOnChange = () => {
        alert('not implemented yet');
    }
    const nodeSliderProps = {
        min_value: configs.getMinimumNodes(),
        max_value: configs.getMaximumNodes(),
        step: 4,
        onChange: handleNodeOnChange
    }
    const speedSliderProps = {
        min_value: configs.getMinimumSpeed(),
        max_value: configs.getMaximumSpeed(),
        step: 20,
        onChange: handleSpeedOnChange
    }
    /*     var scale = 1.0;
        var scaleMultiplier = 0.8;
        var startDragOffset = {};
        var mouseDown = false;
    
        var translatePos = {
            x: 1536 / 2,
            y: 768 / 2
        };
     */
    function runAlgorithm() {
        const ctx = canvasRef.current.getContext('2d');
        //TODO: dropbox here
        if(avl.selectedNodes.length ===0) { // for now, but remember to add DFS and stuff.
            return;
        }
        visualizer.visualizeFind(avl,ctx,avl.selectedNodes[0].element);
        //reset selected
        avl.inOrderNodes().filter(node =>  node.isSelected).forEach(node => node.changeSelectStatus());
        avl.selectedNodes = [];
    }
    function zoomIn() {
 /*        const canvas = canvasRef.current;


       const draw = (scale, translatePos) => {
            const context = canvas.getContext('2d');
            avl.drawScaled(context,scale,translatePos)
        }
        scale /= scaleMultiplier;
        draw(scale, translatePos);
        console.log('hello');
 */    }
    /*     window.addEventListener("mouseup", function (evt) {
            mouseDown = false;
        });
    
        window.addEventListener("mouseover", function (evt) {
            mouseDown = false;
        });
    
        window.addEventListener("mouseout", function (evt) {
            mouseDown = false;
        });
    
        window.addEventListener("mousemove", function (evt) {
            if (mouseDown) {
                translatePos.x = evt.clientX - startDragOffset.x;
                translatePos.y = evt.clientY - startDragOffset.y;
            }
        });
     */
        const algoDisplay = {
            display:"flex",
            flexDirection: "row"

        };
    return (
        <header className="App-Header">
            <div style = {algoDisplay}>
                <h1>Shortest path</h1>
                <button className="btn" onClick={() => runAlgorithm()}>Run algorithm</button>

            </div>
            <div>
                <label>Nodes: {nodeSliderProps.min_value} </label>
                <Slider props={nodeSliderProps} />
                <label> {nodeSliderProps.max_value} </label>
            </div>
            <div>
                <label>Speed(ms): {speedSliderProps.min_value} </label>
                <Slider props={speedSliderProps} />
                <label> {speedSliderProps.max_value} </label>
            </div>

            <div>
                <button className="btn" onClick={() => zoomIn()}>+</button>
                <button className="btn" onClick={() => console.log('hello')}>-</button>
            </div>
        </header>
    )
});
export default Header;