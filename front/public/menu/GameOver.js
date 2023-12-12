
import {Text} from 'pixi.js';

import BaseMenu from './BaseMenu';


/**
 * Display Game Over screen
 */
export default class GameOver extends BaseMenu {
    constructor(game) {
        super(game, 'GAME\nOVER');
        
        this.scoreInfo = new Text('Last score', this.info.style);
        this.scoreInfo.anchor.set(0.5);
        this.scoreInfo.x = this.game.app.view.width * 0.5;
        this.scoreInfo.y = this.game.app.renderer.height * 0.50;
        this.addChild(this.scoreInfo);
    }
    
    enter(opts) {
        let score = this.game.scores.getNewest();
        this.scoreInfo.text = `Score: ${score.points}\nLines: ${score.lines}`;
    }
    
    update(dt) {
        super.update(dt);
        
        if (this.game.key.space.trigger()) {
            this.game.setState('play', {restart: true});
        }
    }
}
