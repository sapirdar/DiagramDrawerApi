import { IDiagram } from '../interfaces/diagram';
import { DiagramsDal } from '../dal/diagram';
import { IDiagramModel, Diagram } from '../schemas/diagram';

export class DiagramsService {

    diagramDal = new DiagramsDal();

    getList = async (userId?: string) => {
        return await this.diagramDal.getList(userId);
    };

    getOne = async (id: string, userId: string) => {
        return await this.diagramDal.getOne(id, userId);
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

