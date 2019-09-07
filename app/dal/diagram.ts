import { IDiagram } from '../interfaces/diagram';
import { Diagram } from '../schemas/diagram';
import { Types } from 'mongoose';

export class DiagramsDal {

  // Return all public diagrams data without the graph json 
  getAllPublic = async () => {
    return Diagram.find({ isPublic: true }).select("-graph")
  };

  // Return item by id - public or logged on user owner
  getOne = async (id: string, userId?: string) => {
    return Diagram.findOne({
      $or: [{ _id: id, isPublic: true}, { _id: id, userId: userId}]
    })
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
