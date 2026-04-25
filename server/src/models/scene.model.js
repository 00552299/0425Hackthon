export class SceneModel {
    constructor({ id, name, objects = [] }) {
        this.id = id;
        this.name = name;
        this.objects = objects;
    }
}
