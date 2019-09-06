import { IDiagram } from '../interfaces/diagram';
import { DiagramsDal } from '../dal/diagram';
import { IDiagramModel, Diagram } from '../schemas/diagram';

export class DiagramsService {

    diagramDal = new DiagramsDal();

    getAll = async () => {
        return await this.diagramDal.getAllPublic();
    };

    getOne = async (id: string) => {
        return await this.diagramDal.getOne(id);
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

