const getAllConsultancies = async () => {
    try {
        let consultancies = await db.Consultancies.findAll({
            include: [{
                model: db.Users,
                as: 'user',  // ← MISMO alias que en el modelo
                attributes: ['id', 'userName', 'name', 'lastName', 'email']
            }]
        });
        return consultancies;
    } catch (error) {
        throw new Error(error.message || "Failed to get consultancies");
    }
};