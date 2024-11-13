import {Button, Component, _decorator, Prefab} from "cc";


@_decorator.ccclass("TaskItem")
export class TaskItem extends Component {
    @_decorator.property(Button) public completeButton: Button;
    @_decorator.property(Button) public deleteButton: Button;
    @_decorator.property(Prefab) public prefabToDelete: Prefab;

    protected start(): void {
        this.completeButton.node.on(Button.EventType.CLICK, this._onComplete.bind(this));
        this.deleteButton.node.on(Button.EventType.CLICK, this._onDelete.bind(this));
    }

    private _onComplete(): void {


        console.log("complete");
    }

    private _onDelete(): void {


        console.log("onDelete");
    }
}