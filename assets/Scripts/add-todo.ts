import { _decorator, Component, Prefab, instantiate, Button, Node, Label, EditBox, Layout, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PrefabCreator')
export class PrefabCreator extends Component {

    @property(Prefab)
    public MyPrefab: Prefab | null = null;
    @property(ScrollView)
    public ScrollView: ScrollView | null = null;
    @property(Node)
    public ContentContainer: Node | null = null;
    @property(Button)
    public ButtonAddTask: Button | null = null;
    @property(EditBox)
    public InputText_1: EditBox | null = null;
    @property(EditBox)
    public InputText_2: EditBox | null = null;

    private _prefabCount: number = 0;

    protected start() {
        if (this.ScrollView) {
            this.ScrollView.content = this.ContentContainer;
        }

        this.ButtonAddTask.node.on(Button.EventType.CLICK, this._onButtonClick.bind(this));
    }

    private _onButtonClick() : void {
        const TEXT_TITLE = this.InputText_1?.string.trim();
        const TEXT_DISCRIPTION = this.InputText_2?.string.trim();

        if (TEXT_TITLE && TEXT_DISCRIPTION) {
            if (this.MyPrefab && this.ContentContainer) {
                const newPrefabInstance = instantiate(this.MyPrefab);

                const LEBALS = newPrefabInstance.getComponentsInChildren(Label);
                let offset = this._prefabCount * -250;
                newPrefabInstance.setPosition(0, 250, 0);

                if (LEBALS.length >= 2) {
                    LEBALS[0].string = TEXT_TITLE;
                    LEBALS[1].string = TEXT_DISCRIPTION;
                }

                this.ContentContainer.addChild(newPrefabInstance);
                this._prefabCount++;
                this._updateLayout();

                if (this.InputText_1) this.InputText_1.string = '';
                if (this.InputText_2) this.InputText_2.string = '';
            } else {
                console.error('Префаб или контейнер не установлен!');
            }
        } else {
            console.warn('Оба текстовых поля должны быть заполнены!');
        }
    }

    private _deletePrefab(prefabInstance: Node) {
        if (prefabInstance) {
            prefabInstance.destroy();
            this._prefabCount--;
            this._updateLayout();
        }
    }

    private _updateLayout() {
        const LAYOUT = this.ContentContainer?.getComponent(Layout);
        if (LAYOUT) {
            LAYOUT.updateLayout;
        }
    }


}