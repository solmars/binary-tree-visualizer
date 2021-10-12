import Slider from "./Slider";
import * as configs from '../models/Config.js';
import { AVLContext } from './App.js';
import { useContext } from 'react';
import React from 'react';
import * as visualizer from '../View/Visualizer.js';
import Dropdown from "./Dropdown";

const Header = React.forwardRef((props, canvasRef) => {
    const avl = useContext(AVLContext);
    const MAX_ITERATIONS = configs.getMaximumNodes() - configs.getMinimumNodes() + 20;
    const speed = [configs.getMinimumSpeed()];
    speed.length = 1; // speed as an array, limited to 1, so we are passing by reference, allowing speed to be set in real time
    Object.defineProperty(speed, 'length', { writable: false });
    let currentAlgorithm = 'DEFAULT';


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
    const handleSpeedOnChange = (value) => {
        speed[0] = value;
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
    function runAlgorithm() {
        if (currentAlgorithm === 'DEFAULT') {
            alert('Please select an algorithm!');
            return;
        }
        const ctx = canvasRef.current.getContext('2d');
        switch (currentAlgorithm) {
            case '1':
                if (avl.selectedNodes.length === 0) {
                    alert('Select atleast one node!');
                    return;
                }
                const height = avl.height();
                const loopFind = (i) => {
                    if (i < avl.selectedNodes.length) {
                        visualizer.visualizeFind(avl, ctx, avl.selectedNodes[i].element, speed);
                        setTimeout(function () { loopFind(++i) }, speed*(height-avl.calculateHeight(avl.selectedNodes[i])) + 1000);
                    }
                    else {
                        avl.inOrderNodes().filter(node => node.isSelected).forEach(node => node.changeSelectStatus());
                        avl.selectedNodes = [];
                    }
                };
                loopFind(0);
                break;
            case '2':
                break;
            case '3':
                break;

            default:
                break;
        }
    }
    const algoDisplay = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexBasis: "23%"
    };
    const algoOnChange = (e) => {
        currentAlgorithm = e.target.value;
        window.dispatchEvent(new Event('resize')); //redraw canvas, in this case, resize works can also use useContext for canvas.getContext('2d) and avl.draw(context)
    }
    const dropDownOptions = {
        defaultText: "Choose algorithm...",
        options: [{
            value: '1',
            text: 'Find nodes'
        },
        {
            value: '2',
            text: 'Lowest common ancestor'
        }, {
            value: '3',
            text: 'Tree diameter'
        }, {
            value: '4',
            text: 'Range between nodes'
        }],
        onChange: algoOnChange
    };
    return (
        <header className="App-Header">
            <div style={algoDisplay}>
                <Dropdown props={dropDownOptions}></Dropdown>
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

            {/*             <div>
                <button className="btn" onClick={() => zoomIn()}>+</button>
                <button className="btn" onClick={() => console.log('hello')}>-</button>
            </div>
 */}        </header>
    )
});
export default Header;