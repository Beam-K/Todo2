import {Button, Component, _decorator} from "cc";

@_decorator.ccclass("TaskItem")
export class TaskItem extends Component {
    @_decorator.property(Button) public completeButton: Button;
    @_decorator.property(Button) public deleteButton: Button;

    protected start(): void {
        this.completeButton.node.on(Button.EventType.CLICK, this.onComplete.bind(this));
        this.deleteButton.node.on(Button.EventType.CLICK, this.onDelete.bind(this));
    }

    private onComplete(): void {
        console.log("complete");
    }

    private onDelete(): void {
        console.log("delete");
    }
}