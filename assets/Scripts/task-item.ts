import {Button, Component, _decorator, Prefab, Label, Color, Node,  UITransform, Vec2} from "cc";


@_decorator.ccclass("TaskItem")
export class TaskItem extends Component {
    @_decorator.property(Button) public completeButton: Button;
    @_decorator.property(Button) public deleteButton: Button;
    @_decorator.property(Node) public prefabToDelete: Prefab | null= null;
    @_decorator.property(Label) public label1: Label;
    @_decorator.property(Label) public label2: Label;
    @_decorator.property(Node) public line1: Node;
    @_decorator.property(Node) public line2: Node;
    @_decorator.property(Color) public newTextColor: Color = new Color;


    protected start(): void {
        this.completeButton.node.on(Button.EventType.CLICK, this._onComplete.bind(this));
        this.deleteButton.node.on(Button.EventType.CLICK, this._onDelete.bind(this));
    }

    private _onComplete(): void {
        if (this.label1) {
            if (this.label2) {
                this.label1.color = this.newTextColor;
                this.label2.color = this.newTextColor;

                if (this.line1) {
                    this.line1.active = true;

                    let labelWidth_1 : any;
                    labelWidth_1 = this.label1.node.getComponent(UITransform).width;


                    const LINE_1 = this.line1.getComponent(UITransform);

                    if (LINE_1) {
                        LINE_1.width = labelWidth_1;
                    }


                    const LABEL_HEIGHT_1 = this.label1.node.getComponent(UITransform).height;
                    this.line1.setPosition(0, -10, 0);
                }
            }
        }
        if (this.line2) {
            this.line2.active = true;


            let labelWidth_2 : any;
            labelWidth_2 = this.label2.node.getComponent(UITransform).width;


            const LINE_2 = this.line2.getComponent(UITransform);

            if (LINE_2) {
                LINE_2.width = labelWidth_2;
            }
            const LABEL_HEIGHT_2 = this.label2.node.getComponent(UITransform).height;
            this.line2.setPosition(0, -5 , 0);
        }
    }




    private _onDelete(): void {

        if (this.prefabToDelete) {
            this.prefabToDelete.destroy();
            console.log('Префаб удалён со сцены');
        } else {
            console.warn('Префаб для удаления не установлен');
        }
    }

}
