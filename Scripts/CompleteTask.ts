import { _decorator, Component, Node, Label, Button, Color, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CompleteTask')
export class CompleteTask extends Component {
    @property(Label)
    public Label: Label | null = null; // Первый Label для изменения цвета

    @property(Label)
    public label2: Label | null = null; // Второй Label для изменения цвета

    @property(Color)
    public newColor: Color = new Color(255, 0, 0); // Новый цвет (например, красный)

    start() {
        const buttonComponent = this.getComponent(Button);
        if (buttonComponent) {
            buttonComponent.node.on('click', this.changeColorAndRemove, this); // Привязываем кнопку к методу
        }
    }

    private changeColorAndRemove() {
        if (this.Label) {
            this.Label.color = this.newColor; // Изменяем цвет первого Label
        }

        if (this.label2) {
            this.label2.color = this.newColor; // Изменяем цвет второго Label
        }
        // Удаляем кнопку после изменения цвета
        this.node.destroy();
    }
}