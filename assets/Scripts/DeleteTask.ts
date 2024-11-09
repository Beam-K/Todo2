import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeleteTask')
export class PrefabDeletion extends Component {
    @property(Node)
    public prefabToDelete: Node | null = null;

    start() {
        const buttonComponent = this.getComponent(Button);
        if (buttonComponent) {
            buttonComponent.node.on('click', this.deletePrefab, this); // Привязываем кнопку к методу удаления префаба
        }
    }

    // Метод для удаления префаба
    private deletePrefab() {
        if (this.prefabToDelete) {
            this.prefabToDelete.destroy(); // Удаляем префаб со сцены
            console.log('Префаб удалён со сцены');
        } else {
            console.warn('Префаб для удаления не установлен');
        }
    }
}