import {pool} from '../database/database.js'
import * as categoryModel from '../model/category.js'

export const getCategory = async (req,res) => {
    try {
        const category = await categoryModel.readCategory(pool,req.params)
        if(category){
            res.json(category);
        } else {
            res.sendStatus(404);
        }
    }catch(error){
        res.sendStatus(500);
    }
}

export const addCategory = async (req,res) => {
    try {
        const id = await categoryModel.createCategory(pool,req.body);
        res.status(201).json({id});
    } catch (error){
        res.sendStatus(500);
    }
}

export const deleteCategory = async (req,res) => {
    try{
        await categoryModel.deleteCategory(pool,req.params);
        res.sendStatus(204)
    } catch (error){
        res.sendStatus(500);
    }
};

export const updateCategory = async (req,res) => {
  try {
      await categoryModel.updateCategory(pool,req.body);
      res.sendStatus(204);
  }catch(error){
      res.sendStatus(500);
  }
};