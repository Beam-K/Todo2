import { _decorator, Component, Prefab, instantiate, Button, Node, Label, EditBox, ScrollView, Layout } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PrefabCreator')
export class PrefabCreator extends Component {

    @property(ScrollView)
    public scrollView: ScrollView | null = null; 
    @property(Prefab)
    public myPrefab: Prefab | null = null;

    @property(Node)
    public contentContainer: Node | null = null;

    @property(Button)
    public buttonAddTask: Button;
    @property(EditBox)
    public inputText1: EditBox;
    @property(EditBox)
    public inputText2: EditBox;
    private prefabCount: number = 0;
    private offset: number = -150;

    start() {
        this.buttonAddTask!.node.on('click', this.onButtonClick, this);

        if (this.scrollView) {
            this.scrollView.content = this.contentContainer;
        }
    }
    private onButtonClick() {
        const text1 = this.inputText1.string.trim();
        const text2 = this.inputText2.string.trim();
        if (text1 && text2) {
            if (this.myPrefab && this.contentContainer) {
                const newPrefabInstance = instantiate(this.myPrefab);

                let offset = this.prefabCount * -220;
                newPrefabInstance.setPosition(0, offset, 0 );

                this.contentContainer.addChild(newPrefabInstance);
                this.prefabCount++;

                const labels = newPrefabInstance.getComponentsInChildren(Label);
                if (labels.length >= 2) {
                    labels[0].string = text1;
                    labels[1].string = text2;
                }

                this.inputText1.string = '';
                this.inputText2.string = '';
            } else {
                console.error('Префаб или контейнер не установлен!');
            }
        } else {
            console.warn('Оба текстовых поля должны быть заполнены!');
        }

    }

    updateLayout() {
        const layout = this.contentContainer.getComponent(Layout);
        if (layout) {
            layout.updateLayout();
        }
    }

    scrollToTop() {
        if (this.scrollView) {
            this.scrollView.scrollToTop();
        }
    }

    scrollToBottom() {
        if (this.scrollView) {
            this.scrollView.scrollToBottom();
        }
    }
}