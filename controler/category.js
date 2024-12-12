import {pool} from '../database/database.js';
import * as categoryModel from '../model/category.js';

export const getCategory = async (req,res) => {
    try {
        const category = await categoryModel.readCategory(pool,req.val)
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
        const id = await categoryModel.createCategory(pool,req.val);
        res.status(201).json({id});
    } catch (error){
        res.sendStatus(500);
    }
}

export const deleteCategory = async (req,res) => {
    try{
        await categoryModel.deleteCategory(pool,req.val);
        res.sendStatus(204)
    } catch (error){
        res.sendStatus(500);
    }
};

export const updateCategory = async (req,res) => {
    try {
      await categoryModel.updateCategory(pool,req.val);
      res.sendStatus(204);
    }catch(error){
      res.sendStatus(500);
    }
};

export const getAllCategories = async(req, res) => {
    try {
        const categories = await categoryModel.readAllCategories(pool);
        if(categories){
            res.json(categories);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getCategories = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const categories = await categoryModel.readCategories(pool, {page,perPage});
        if(categories){
            res.json(categories);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    }
};

export const getTotalRowCategories = async (req, res) => {
    try {
        const totalRow = await categoryModel.readTotalRowCategories(pool);
        if(totalRow){
            res.json(totalRow);
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};
export const deleteCategories = async (req,res) => {
    try{
        for (const id of req.val.ids) {
            await categoryModel.deleteCategory(pool,{id});
        }
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }
}