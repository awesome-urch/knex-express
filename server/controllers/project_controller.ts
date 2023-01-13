'use strict'

const { Project, User } = require('../models')

const postProjects = (req, res, next) => {
  const userId = req.params.id
  // const props = req.body.project
  const props = req.body
  const name = props.name
  const description = props.description
  const body = req.body

  console.log(description);
  console.log(name);

  if(!props){
    // console.log("no props");
    res.json({
      ok: false,
      message: 'Name and description are required'
    })
    return;
  }

  Project.create({ name: name, description: description, user_id: userId })
    .then(project => {
      console.log(project[0])
       res.json({
          ok: true,
          message: 'Project created',
          project,
          userId
        })
      }
    )
    .catch(next)
}

const getProjects = (req, res, next) => {
  const userId = req.params.id

  console.log("props");

  Project.findAll()
    .then(projects => res.json({
      ok: true,
      message: 'Projects found',
      projects,
      userId
    }))
    .catch(next)
}

const getProject = (req, res, next) => {
  const projectId = req.params.id

  Project.findById(projectId)
    .then(project => res.json({
      ok: true,
      message: 'Project found',
      project
    }))
    .catch(next)
}

const putProject1 = async (req, res, next) => {
  const projectId = req.params.id
  const props = req.body
  try{
    const project = await Project.update(projectId, props)
    if(project){
      res.json({
        ok: true,
        message: 'Project updated!',
        project
      })
    }
  }catch(err){
    next
  }

}

const putProject = async (req, res, next) => {
  const projectId = req.params.id
  const props = req.body
  try{
    const project = await update(projectId, props)
    if(project){
      res.json({
        ok: true,
        message: 'Project updated!',
        project
      })
    }
  }catch(err){
    next(err);
  }
}

const update = async (projectId, props) => {
  try{
    const project = await Project.findById(projectId);
    console.log(project);
    if(!project.length){
      throw "Project does not exist";
    }

    const updateProject = await Project.update(projectId, props, ['id', 'name']);
    // const project = await Project.updateRange({col: 'id', symbol: '<', val: projectId}, props);
    console.log(updateProject);
    if(!updateProject){
      throw new Error("Couldn't update");
    }
    return updateProject;
  }catch(err){
    throw new Error(err);
  }
}

const deleteProject = async (req, res, next) => {
  const projectId = req.params.id

  try{
    const deleteCount = await Project.destroy(projectId);
    res.json({
      ok: true,
      message: 'Project deleted',
      deleteCount
    })
  }catch(err){
    next
  }

}

module.exports = {
  postProjects,
  getProjects,
  getProject,
  putProject,
  deleteProject,
  update,
}
