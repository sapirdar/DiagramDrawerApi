import { NextFunction, Request, Response } from 'express';
import * as uuidv4 from 'uuid/v4';
import { AuthHelper } from '../middleware/auth.helper';
import { DiagramsService } from '../services/diagram';
import { IDiagram } from '../interfaces/diagram';
import { IUserModel } from '../schemas/user';

const sharp = require('sharp');
export class DiagramsController {

  authHelper = new AuthHelper();
  diagramsService = new DiagramsService();


  // Get all diagrams
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.diagramsService.getAll().then((list) => {
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
      this.diagramsService.getOne(req.params.id).then(
        (diagram) => {
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
      const userId = this.authHelper.getLoggenOnUserId(req);

      const diagram: IDiagram = req.body;
      if (userId) {
        diagram.userId = userId;
      }
      diagram.updated = new Date();

      this.diagramsService.create(diagram)
        .then((diagram) => {
          res.status(200).send(diagram._id)
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
      const userId = this.authHelper.getLoggenOnUserId(req);

      this.diagramsService.getOne(req.params.id).then((diagram: any) => {
        // Allow owner only to edit a diagram
        if (diagram.publisherUserId == userId) {
          let diagramForUpdate: IDiagram = req.body;
          diagramForUpdate = Object.assign(diagram, diagramForUpdate);
          diagramForUpdate.updated = new Date();

          this.diagramsService.update(diagram).then((resullt) => {
            res.status(201);
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
      this.diagramsService.getOne(req.params.id).then((diagram: any) => {
        const userId = this.authHelper.getLoggenOnUserId(req);

        // Allow owner only to delete a diagram
        if (diagram.publisherUserId == userId) {
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





