import { _decorator, Component, Node, Label, Button, Color, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('StrikeThroughText')
export class StrikeThroughText extends Component {
    @property(Button)
    public Complete: Button | null = null;

    @property(Label)
    public label1: Label | null = null;

    @property(Label)
    public label2: Label | null = null;

    @property(Node)
    public strikeThroughLine1: Node | null = null;

    @property(Node)
    public strikeThroughLine2: Node | null = null;

    @property(Color)
    public newTextColor: Color = new Color(255, 0, 0);

    start() {
        if (this.Complete) {
            this.Complete.node.on('click', this.color, this);
            console.log("комплит");
        }
    }

    private color() {
        if (this.label1) {
            if (this.label2) {
                this.label1.color = this.newTextColor;
                this.label2.color = this.newTextColor;

                if (this.strikeThroughLine1) {
                    this.strikeThroughLine1.active = true;

                    let label1Width : any;
                    label1Width = this.label1.node.getComponent(UITransform).width;

                    // Устанавливаем ширину линии зачеркивания
                    const strikeLine1Transform = this.strikeThroughLine1.getComponent(UITransform);

                    if (strikeLine1Transform) {
                        strikeLine1Transform.width = label1Width;
                    }


                    const labelHeight1 = this.label1.node.getComponent(UITransform).height;
                    this.strikeThroughLine1.setPosition(0, -10, 0);
                }
            }
        }
        if (this.strikeThroughLine2) {
            this.strikeThroughLine2.active = true;


            let label2Width : any;
            label2Width = this.label2.node.getComponent(UITransform).width;


            const strikeLine2Transform = this.strikeThroughLine2.getComponent(UITransform);

            if (strikeLine2Transform) {
                strikeLine2Transform.width = label2Width;
            }

            // Смещаем линию зачеркивания в центр под лейблом
            const labelHeight2 = this.label2.node.getComponent(UITransform).height;
            this.strikeThroughLine2.setPosition(0, -5 , 0);
        }
    }
}