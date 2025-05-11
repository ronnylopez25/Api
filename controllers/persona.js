import connection from '../database.js'

export const getPersonas = (req, res) => {
  const query = 'SELECT * FROM persona';
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
};

export const deletePersona = (req, res) => {
  const { id_persona } = req.params;
  const query = 'DELETE FROM persona WHERE id_persona = ?';
  connection.query(query, [id_persona], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Persona not found' });
    } else {
      res.json({ message: 'Persona deleted successfully' });
    }
  });
};

export const updatePersona = (req, res) => {
  const { id_persona } = req.params;
  const { nombre, apellido, cedula } = req.body;
  const query = 'UPDATE persona SET nombre = ?, apellido = ?, cedula = ? WHERE id_persona = ?';
  connection.query(query, [nombre, apellido, cedula, id_persona], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Persona not found' });
    } else {
      res.json({ message: 'Persona updated successfully' });
    }
  });
};