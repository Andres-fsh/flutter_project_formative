const roleService = require('../services/roleService');

const getAllRoles = async (req, res) => {
    const allRoles = await roleService.getAllRoles();
  
    if(allRoles)
        res.status(200).send({status: "OK", data: allRoles });
    else 
        res.status(400).send({status: "FAILED", data: allRoles})
};

const getRole = async (req, res) => {
  let id = req.params.roleId;
  const role = await roleService.getRole(id);
  if(role)
    res.status(200).send({status: "OK", data: role});
 else  
    res.status(400).send({status: "FAILED", data: role});
        
};

const createRole = async (req, res) =>{
    const {body} = req;
    const createdRole = await roleService.createRole(body.name, body.description);
if(createdRole)
    res.status(201).send({ status: "OK", data: createdRole});
else 
    res.status(400).send({status: "FAILED", data: createdRole});
}


const updateRole = async (req, res) => {
    let id = req.params.roleId; 
    let {name, description} = req.body;
    const updatedRole =await roleService.updateRole(id,name,description);
    if(updatedRole)
        res.status(200).send({ status: "Ok", data: updatedRole});
    else 
        res.status(400).send({status: "FAILED", data: updatedRole});
}

const deleteRole = async (req, res) => {
    let id = req.params.roleId;
    const deletedRole = await roleService.deleteRole(id);
    if (deletedRole)
        res.status(200).send({status: "OK", data: deletedRole});
    else
        res.status(400).send({status: "FAILED", data: deletedRole});

}
module.exports = {
    getAllRoles,
    getRole,
    createRole, 
    updateRole,
    deleteRole
};