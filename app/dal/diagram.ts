import { IDiagram } from '../interfaces/diagram';
import { Diagram } from '../schemas/diagram';
import { Types } from 'mongoose';

export class DiagramsDal {

  getAllPublic = async () => {
    return Diagram.find({
      $or: [{ 'isPublic': true }]
    })
  };

  getOne = async (id: string) => {
    return Diagram.findOne({ _id: id });
  };

  create = async (diagram: IDiagram) => {
    const d = new Diagram(diagram);
    return d.save();
  };

  update = async (diagram: IDiagram) => {
    const d = new Diagram(diagram);
    return Diagram.updateOne({ _id: (<any>d)._id }, d);
  };

  delete = async (id: string) => {
    return Diagram.deleteOne({ _id: id });
  };

}
