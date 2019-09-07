import { NextFunction, Request, Response } from 'express';
import * as uuidv4 from 'uuid/v4';
import { AuthHelper } from '../middleware/auth.helper';
import { DiagramsService } from '../services/diagram';
import { IDiagram } from '../interfaces/diagram';
import { IDiagramModel } from '../schemas/diagram';

const sharp = require('sharp');
export class DiagramsController {

  authHelper = new AuthHelper();
  diagramsService = new DiagramsService();


  // Get all diagrams
  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = this.authHelper.getLoggenOnUser(req);
      const uid = user!=null ? user._id : null;
      await this.diagramsService.getList(uid).then((list: IDiagramModel[]) => {
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
  getOne = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = this.authHelper.getLoggenOnUser(req);
      const uid = user!=null ? user._id : null;
      this.diagramsService.getOne(req.params.id, uid).then(
        (diagram: IDiagramModel | null) => {
          if (diagram && diagram.user._id != uid) {
            diagram.readOnly = true;
          }
          res.status(200).send(diagram);
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
      const user = this.authHelper.getLoggenOnUser(req);
      const diagram: IDiagram = req.body;
      if (user) {
        diagram.user = user;
      }
      diagram.updated = new Date();

      this.diagramsService.create(diagram)
        .then((diagram: IDiagramModel | null) => {
          if (diagram) {
            res.status(200).send(diagram._id)
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
      const user = this.authHelper.getLoggenOnUser(req);
      const uid = user!=null ? user._id : null;

      this.diagramsService.getOne(req.params.id, uid).then((diagram: IDiagram | null) => {
        // Allow owner only to edit a diagram
        if (diagram && diagram.user._id == uid) {
          let diagramForUpdate: IDiagram = req.body;
          diagramForUpdate = Object.assign(diagram, diagramForUpdate);
          diagramForUpdate.updated = new Date();

          this.diagramsService.update(diagram).then(() => {
            if (diagram) {
              res.status(201).send('success')
            }
          }).catch((error) => {
            res.status(500).send(error.message);
          });
        }
        else {
          res.status(401).send('User not allowed');
        }
      }).catch((error) => {
        res.status(500).send(error.message);
      })
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  // Delete existing diagram
  delete = (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = this.authHelper.getLoggenOnUser(req);
      const uid = user!=null ? user._id : null;

      this.diagramsService.getOne(req.params.id, uid).then((diagram: IDiagramModel | null) => {
        // Allow owner only to delete a diagram
        if (diagram && diagram.user == user) {
          this.diagramsService.delete(req.params.id).then(() => {
            res.status(200).send(req.params.id);
          });
        }
        else {
          res.status(401).send('User not allowed');
        }
      }
      ).catch((error) => {
        res.status(500).send(error.message);
      })
    } catch (error) {
      res.status(200).send(error.message);
    }
  };
}





