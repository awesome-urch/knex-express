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

  console.log("props");

  Project.findById(projectId)
    .then(project => res.json({
      ok: true,
      message: 'Project found',
      project
    }))
    .catch(next)
}

const putProject = async (req, res, next) => {
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

  // Project.update(projectId, props)
  //   .then(project => res.json({
  //     ok: true,
  //     message: 'Project updated',
  //     project
  //   }))
  //   .catch(next)


}

const deleteProject = (req, res, next) => {
  const projectId = req.params.id

  Project.destroy(projectId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'Project deleted',
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postProjects,
  getProjects,
  getProject,
  putProject,
  deleteProject
}
