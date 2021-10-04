import Slider from "./Slider";
import * as configs from '../models/Config.js';

function Header() {
    return (
        <header className="App-Header">
            <h1>Binary tree visualizer!</h1>
            <div>
                <label>Nodes: {configs.getMinimumNodes()} </label>
                <Slider/>
                <label> {configs.getMaximumNodes()} </label>
            </div>
        </header>
    )
}
export default Header;