import { IDiagram } from '../interfaces/diagram';
import { Diagram } from '../schemas/diagram';

export class DiagramsDal {

  // Return all public diagrams data without the graph json 
  getList = async () => {
    return Diagram.find().select("-graph")
  };

  // Return item by id
  getById = async (id: string) => {
    return Diagram.findOne({ _id: id })
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
