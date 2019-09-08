import { IDiagram } from '../interfaces/diagram';
import { DiagramsDal } from '../dal/diagram';

export class DiagramsService {

    diagramDal = new DiagramsDal();

    getList = async () => {
        return await this.diagramDal.getList();
    };

    getById = async (id: string) => {
        return await this.diagramDal.getById(id);
    };

    create = async (diagram: IDiagram) => {
        try {
            return await this.diagramDal.create(diagram);
        } catch (e) {
            throw new Error(e.message)
        }
    }

    update = async (diagram: IDiagram) => {
        return await this.diagramDal.update(diagram);
    };

    delete = async (id: string) => {
        return await this.diagramDal.delete(id)
    };
}

