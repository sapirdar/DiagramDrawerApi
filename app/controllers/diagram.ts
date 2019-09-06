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
        res.status(200).json(list);
      }).catch(
        (error) => {
          res.status(500).json({ error: error });
        }
      );
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  // Get diagram by id
  getOne = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.diagramsService.getOne(req.params.id).then(
        (diagram) => {
          res.status(200).json(diagram);
        }
      ).catch((error) => {
        res.status(404).json({
          error: error
        });
      });
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  };

  // Create new diagram
  create = async (req: any, res: Response, next: NextFunction) => {
    try {
      var token = this.authHelper.getHeaderToken(req);
      const userId = this.authHelper.getLoggenOnUserId(token);

      const diagram: IDiagram = JSON.parse(req.body.diagrams);
      diagram.userId = userId;
      diagram.updated = new Date();

      this.diagramsService.create(diagram)
        .then((diagram) => {
          res.status(200).json(diagram);
        }).catch((error) => {
          res.status(400).json({
            error: error
          });
        });
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  };


  // Update existing diagram
  update = (req: any, res: Response, next: NextFunction) => {
    console.log('modifyDiagram');
    try {
      var token = this.authHelper.getHeaderToken(req);
      const userId = this.authHelper.getLoggenOnUserId(token);

      this.diagramsService.getOne(req.params.id).then((diagram: any) => {
        // Allow owner only to edit a diagram
        if (diagram.publisherUserId == userId) {
          let diagramForUpdate: IDiagram = req.body;
          diagramForUpdate = Object.assign(diagram, diagramForUpdate);
          diagramForUpdate.updated = new Date();

          this.diagramsService.update(diagram).then((resullt) => {
            res.status(201).json(diagram);
          }).catch((error) => {
            res.status(500).json({
              error: error
            });
          });
        }
        else {
          res.status(401).json({ error: new Error('User not allowed') });
        }
      }).catch((error) => {
        res.status(500).json({ error: error });
      }
      )
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  // Delete existing diagram
  delete = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.diagramsService.getOne(req.params.id).then((diagram: any) => {
        var token = this.authHelper.getHeaderToken(req);
        const userId = this.authHelper.getLoggenOnUserId(token);
        const user: IUserModel = this.authHelper.getLoggenOnUser(token);

        // Allow owner only to delete a diagram
        if (diagram.publisherUserId == userId) {
          this.diagramsService.delete(req.params.id).then(() => {
            res.status(200).json(req.params.id);
          });
        }
        else {
          res.status(401).json({ error: new Error('User not allowed') });
        }
      }
      ).catch((error) => {
        res.status(500).json({ error: error });
      })
    } catch (error) {
      res.status(200).json({ message: error });
    }
  };

}





