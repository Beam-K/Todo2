import { _decorator, Component, Prefab, instantiate, Button, Node, Label, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PrefabCreator')
export class PrefabCreator extends Component {
    @property(Prefab)
    public myPrefab: Prefab | null = null;

    @property(Node)
    public contentContainer: Node | null = null; // Ссылка на контейнер для префабов

    @property(Node)
    public buttonUp: Node; // Кнопка "Вверх"
    @property(Node)
    public buttonDown: Node; // Кнопка "Вниз"
    @property(Node)
    public buttonAddTask: Node; // Кнопка добавления задачи
    @property(EditBox)
    public inputText1: EditBox; // Первый текстовый ввод
    @property(EditBox)
    public inputText2: EditBox; // Второй текстовый ввод

    private prefabCount: number = 0; // Счетчик созданных префабов
    private offset: number = -150;

    @property(Label)
    public taskCountLabel: Label; // Лейбл для отображения номера задачи

    start() {
        const buttonComponentUp = this.buttonUp.getComponent(Button);
        if (buttonComponentUp) {
            buttonComponentUp.node.on('click', this.scrollUp, this);
        }

        const buttonComponentDown = this.buttonDown.getComponent(Button);
        if (buttonComponentDown) {
            buttonComponentDown.node.on('click', this.scrollDown, this);
        }

        const buttonComponentAddTask = this.buttonAddTask.getComponent(Button);
        if (buttonComponentAddTask) {
            buttonComponentAddTask.node.on('click', this.onButtonClick, this);
        }
    }

    private onButtonClick() {
        const text1 = this.inputText1.string.trim();
        const text2 = this.inputText2.string.trim();

        if (text1 && text2) {
            if (this.myPrefab && this.contentContainer) {
                // Создаем экземпляр префаба
                const newPrefabInstance = instantiate(this.myPrefab);

                // Устанавливаем позицию нового префаба
                let offset = this.prefabCount * -220; // Используем отрицательное значение для вертикального размещения
                newPrefabInstance.setPosition(0, offset, 0);

                // Добавляем новый экземпляр префаба в контейнер
                this.contentContainer.addChild(newPrefabInstance);
                this.prefabCount++;

                // Обновляем текст в Label в экземпляре префаба
                const labels = newPrefabInstance.getComponentsInChildren(Label);
                if (labels.length >= 2) {
                    labels[0].string = text1; // Записываем текст в первый Label
                    labels[1].string = text2; // Записываем текст во второй Label
                }

                // Обновляем Label для отображения номера задачи
                if (this.taskCountLabel) {
                    this.taskCountLabel.string = "Задача " + this.prefabCount; // Обновление номера задачи
                }
                // Очищаем EditBox'ы после создания префаба
                this.inputText1.string = ''; // Очищаем первый EditBox
                this.inputText2.string = ''; // Очищаем второй EditBox
            } else {
                console.error('Префаб или контейнер не установлен!');
            }
        } else {
            console.warn('Оба текстовых поля должны быть заполнены!');
        }
    }

    private scrollUp() {
        if (this.contentContainer.children.length > 0) {
            // Перебираем все дочерние элементы в контейнере
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                const task = this.contentContainer.children[i];
                const currentPosition = task.getPosition();
                // Увеличиваем Y-координату каждого элемента на значение offset
                task.setPosition(currentPosition.x, currentPosition.y + this.offset, currentPosition.z);
            }
        }
    }

    private scrollDown() {
        if (this.contentContainer.children.length > 0) {
            // Перебираем все дочерние элементы в контейнере
            for (let i = 0; i < this.contentContainer.children.length; i++) {
                const task = this.contentContainer.children[i];
                const currentPosition = task.getPosition();
                // Уменьшаем Y-координату каждого элемента на значение offset
                task.setPosition(currentPosition.x, currentPosition.y - this.offset, currentPosition.z);
            }
            console.log('Кнопка вниз нажата');
        }
    }
}