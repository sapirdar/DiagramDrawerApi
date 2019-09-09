import { NextFunction, Request, Response } from 'express';
import { DiagramsService } from '../services/diagram';
import { IDiagram } from '../interfaces/diagram';
import { IDiagramModel } from '../schemas/diagram';

const sharp = require('sharp');
export class DiagramsController {

  diagramsService = new DiagramsService();

  // Get all diagrams
  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.diagramsService.getList().then((list: IDiagramModel[]) => {
        res.status(200).send(list);
      }).catch(
        (error) => {
          res.status(500).send(error.message);
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Get diagram by id
  getById = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.diagramsService.getById(req.params.id).then(
        (diagram: IDiagramModel | null) => {
          if (diagram) {
            res.status(200).send(diagram);
          }
          else {
            res.status(404).send('Not found');
          }
        }
      ).catch((error) => {
        res.status(404).send(error.message);
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Create new diagram
  create = async (req: any, res: Response, next: NextFunction) => {
    try {
      const diagram: IDiagram = req.body;
      diagram.updated = new Date();

      this.diagramsService.create(diagram)
        .then((diagram: IDiagramModel | null) => {
          if (diagram) {
            res.status(201).send(diagram._id)
          }
          else {
            res.status(404).send('Not found');
          }
        }).catch((error) => {
          res.status(400).send(error.message);
        });
    } catch (error) {
      next(error)
      res.status(500).send(error.message);
    }
  };

  // Update existing diagram
  update = (req: any, res: Response, next: NextFunction) => {
    console.log('modifyDiagram');
    try {
      let diagram: IDiagram = req.body;
      // Update diagram in db
      this.diagramsService.update(diagram).then((result) => {
        res.status(201).send(req.params.id)
      }).catch((error) => {
        res.status(500).send(error.message);
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

}