
import React, { useState } from 'react'
import { AVLContext } from './App.js';
import { useContext } from 'react';
import * as configs from '../models/Config.js';

export default function Slider(props) {
    const [value, setValue] = useState(configs.getMinimumNodes());
    let avl = useContext(AVLContext);
    const MAX_ITERATIONS = configs.getMaximumNodes() - configs.getMinimumNodes();
    let lastMove = Date.now();
    const handleOnChange = (e) => {
        if (Date.now() - lastMove < 60) {
            return;
        }
        lastMove = Date.now();
        setValue(e.target.value);
        const resizeTree = () => {
            let iterations = 0; // failsafe
            while (avl.size() < e.target.value && iterations < MAX_ITERATIONS) {
                let random = parseInt(Math.random() * 1000);
                avl.insert(random);
                iterations++;
            }
            iterations = 0;
            while (avl.size() > e.target.value && iterations < MAX_ITERATIONS) {
                console.log(e.target.value)
                console.log(avl.size())
                avl.remove(avl.obtainRandomNodeElement());
                iterations++;
            }
            window.dispatchEvent(new Event('resize')); //useEffect refuses to work, and I don't want to write a custom one for objects, so this will do.
        }
        resizeTree();
    }
    return (
        <input type="range" min={configs.getMinimumNodes()} max={configs.getMaximumNodes()} step="4" value={value} onChange={handleOnChange}></input>
    )
}
