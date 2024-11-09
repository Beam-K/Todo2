import { _decorator, Component, Node, Label, Button, Color, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CompleteTask')
export class CompleteTask extends Component {
    @property(Label)
    public Label: Label | null = null;
    @property(Label)
    public label2: Label | null = null;
    @property(Color)
    public newColor: Color = new Color(255, 0, 0);


    start() {


    }
    private changeColorAndRemove() {
        if (this.Label) {
            this.Label.color = this.newColor;
        }

        if (this.label2) {
            this.label2.color = this.newColor;
        }
        this.node.destroy();
    }
}