import { IDiagram } from "../interfaces/diagram";
import { Schema, Model, model, Document } from 'mongoose';
import mongooseUniqueValidator = require("mongoose-unique-validator");

export interface IDiagramModel extends IDiagram, Document {
}

export var DiagramSchema: Schema = new Schema({
    user: Object,
    graph: String,
    updated: Date,
    isPublic: Boolean,
    readOnly: Boolean
});

DiagramSchema.plugin(mongooseUniqueValidator)

export const Diagram: Model<IDiagramModel> = model<IDiagramModel>("Diagram", DiagramSchema);

