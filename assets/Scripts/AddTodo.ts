import { _decorator, Component, Prefab, instantiate, Button, Node, Label, EditBox, Layout, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PrefabCreator')
export class PrefabCreator extends Component {
    @property(Prefab)
    public myPrefab: Prefab | null = null;
    @property(ScrollView)
    public scrollView: ScrollView | null = null;
    @property(Node)
    public contentContainer: Node | null = null;
    @property(Button)
    public buttonAddTask: Button | null = null;

    @property(EditBox)
    public inputText1: EditBox | null = null;

    @property(EditBox)
    public inputText2: EditBox | null = null;

    private offset: number = -150;

    private prefabCount: number = 0;

    start() {
        if (this.scrollView) {
            this.scrollView.content = this.contentContainer;
        }

        if (this.buttonAddTask) {
            this.buttonAddTask.node.on('click', this.onButtonClick, this);
            console.log("адд")
        }
    }

    private onButtonClick() {
        const text1 = this.inputText1?.string.trim();
        const text2 = this.inputText2?.string.trim();

        if (text1 && text2) {
            if (this.myPrefab && this.contentContainer) {
                const newPrefabInstance = instantiate(this.myPrefab);

                // Настройка текста для новой задачи
                const labels = newPrefabInstance.getComponentsInChildren(Label);
                let offset = this.prefabCount * -250;
                newPrefabInstance.setPosition(0, 250, 0);

                if (labels.length >= 2) {
                    labels[0].string = text1;
                    labels[1].string = text2;
                }


                // Добавляем экземпляр префаба в контейнер
                this.contentContainer.addChild(newPrefabInstance);
                this.prefabCount++;

                this.updateLayout();

                if (this.inputText1) this.inputText1.string = '';
                if (this.inputText2) this.inputText2.string = '';
            } else {
                console.error('Префаб или контейнер не установлен!');
            }
        } else {
            console.warn('Оба текстовых поля должны быть заполнены!');
        }
    }

    private deletePrefab(prefabInstance: Node) {
        if (prefabInstance) {
            prefabInstance.destroy(); // Удаляем префаб
            this.prefabCount--; // Уменьшение счетчика префабов
            this.updateLayout(); // Обновляем макет оставшихся префабов
        }
    }

    updateLayout() {
        const layout = this.contentContainer?.getComponent(Layout);
        if (layout) {
            layout.updateLayout(); // Обновляем расположение оставшихся префабов
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