import { Button, Component, _decorator, Prefab, Label, Color, Node, UITransform } from "cc";

@_decorator.ccclass("TaskItem")
export class TaskItem extends Component {
    @_decorator.property(Button) public completeButton: Button;
    @_decorator.property(Button) public deleteButton: Button;
    @_decorator.property(Node) public prefabToDelete: Prefab | null = null;
    @_decorator.property(Label) public labelForTitle: Label;
    @_decorator.property(Label) public labelForDiscription: Label;
    @_decorator.property(Node) public lineForTitle: Node;
    @_decorator.property(Node) public lineForDiscription: Node;
    @_decorator.property(Color) public newTextColor: Color = new Color;

    protected start(): void {
        this.completeButton.node.on(Button.EventType.CLICK, this._onComplete.bind(this));
        this.deleteButton.node.on(Button.EventType.CLICK, this._onDelete.bind(this));
    }

    private _onComplete(): void {
        if (this.labelForTitle) {
            if (this.labelForDiscription) {
                this.labelForTitle.color = this.newTextColor;
                this.labelForDiscription.color = this.newTextColor;

                if (this.lineForTitle) {
                    this.lineForTitle.active = true;

                    let labelWidth_1: number = this.labelForTitle.node.getComponent(UITransform).width;
                    let line_1 = this.lineForTitle.getComponent(UITransform);
                    if (line_1) {
                        line_1.width = labelWidth_1;
                    }

                    let labelHeight1 = this.labelForTitle.node.getComponent(UITransform).height;
                    this.lineForTitle.setPosition(0, -10, 0);
                }
            }
        }
        if (this.lineForDiscription) {
            this.lineForDiscription.active = true;

            let labelWidth_2: number = this.labelForDiscription.node.getComponent(UITransform).width;
            let line2 = this.lineForDiscription.getComponent(UITransform);
            if (line2) {
                line2.width = labelWidth_2;
            }
            const labelHeight2 = this.labelForDiscription.node.getComponent(UITransform).height;
            this.lineForDiscription.setPosition(0, -5, 0);
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


    public setTitle(title: string): void {
        if (this.labelForTitle) {
            this.labelForTitle.string = title;
            console.log("Title set to:", title);
        } else {
            console.error("Label for title not found!");
        }
    }

    public setDescription(description: string): void {
        if (this.labelForDiscription) {
            this.labelForDiscription.string = description;
            console.log("Description set to:", description);
        } else {
            console.error("Label for description not found!");
        }
    }
}