const { db } = require('../config/database');

class TableController {
  
 
  async createTable(req, res) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Table name is required'
        });
      }

      
      const sql = `
        CREATE TABLE \`${name}\` (
          id INT AUTO_INCREMENT PRIMARY KEY,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      await db.execute(sql);
      
      res.status(201).json({
        success: true,
        data: { tableName: name },
        message: 'Table created successfully'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

async addColumn(req, res) {
    try {
      const { tableName, columns } = req.body;



      if (!tableName || !columns || !Array.isArray(columns)) {
        return res.status(400).json({
          success: false,
          message: 'tableName, columnName, and dataType are required'
        });
      }

     
      const validTypes = ['VARCHAR(255)', 'INT', 'TEXT', 'DATE', 'BOOLEAN'];
      
      for (let column of columns) {
      if (!column.name || !column.dataType) {
        continue; 
      }
      
      if (validTypes.includes(column.dataType.toUpperCase())) {
        try {
          const sql = `ALTER TABLE \`${tableName}\` ADD COLUMN \`${column.name}\` ${column.dataType}`;
          await db.execute(sql);
          addedColumns.push(column);
        } catch (error) {
          console.error(`Failed to add column ${column.name}:`, error.message);
        }
      }
    }
      
      res.json({
        success: true,
        data: { tableName, columns},
        message: 'Column added successfully'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }


  
//   async addColumn(req, res) {
//     try {
//       const { tableName, columnName, dataType } = req.body;
      
//       if (!tableName || !columnName || !dataType) {
//         return res.status(400).json({
//           success: false,
//           message: 'tableName, columnName, and dataType are required'
//         });
//       }

     
//       const validTypes = ['VARCHAR(255)', 'INT', 'TEXT', 'DATE', 'BOOLEAN'];
//       if (!validTypes.includes(dataType.toUpperCase())) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid dataType. Use: VARCHAR(255), INT, TEXT, DATE, BOOLEAN'
//         });
//       }

//       const sql = `ALTER TABLE \`${tableName}\` ADD COLUMN \`${columnName}\` ${dataType}`;
//       await db.execute(sql);
      
//       res.json({
//         success: true,
//         data: { tableName, columnName, dataType },
//         message: 'Column added successfully'
//       });
      
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   }

 
  async insertData(req, res) {
    try {
      const { tableName, data } = req.body;
      
      if (!tableName || !data) {
        return res.status(400).json({
          success: false,
          message: 'tableName and data are required'
        });
      }

      const columns = Object.keys(data);
      const values = Object.values(data);
      const placeholders = columns.map(() => '?').join(', ');
      const columnNames = columns.map(col => `\`${col}\``).join(', ');

      const sql = `INSERT INTO \`${tableName}\` (${columnNames}) VALUES (${placeholders})`;
      const [result] = await db.execute(sql, values);
      
      res.status(201).json({
        success: true,
        data: {
          id: result.insertId,
          tableName,
          insertedData: data
        },
        message: 'Data inserted successfully'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

 

  async getDataById(req, res) {
    try {
      const { tableName, id } = req.params;

      const [rows] = await db.execute(`SELECT * FROM \`${tableName}\` WHERE id = ?`, [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Record not found'
        });
      }

      res.json({
        success: true,
        data: rows[0]
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

 
  async updateData(req, res) {
    try {
      const { tableName, id } = req.params;
      const data = req.body;

      if (Object.keys(data).length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No data provided for update'
        });
      }

      const columns = Object.keys(data);
      const values = Object.values(data);
      const setClause = columns.map(col => `\`${col}\` = ?`).join(', ');

      const sql = `UPDATE \`${tableName}\` SET ${setClause} WHERE id = ?`;
      const [result] = await db.execute(sql, [...values, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Record not found'
        });
      }

      res.json({
        success: true,
        data: {
          id,
          tableName,
          updatedData: data
        },
        message: 'Data updated successfully'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  
  async deleteData(req, res) {
    try {
      const { tableName, id } = req.params;

      const [result] = await db.execute(`DELETE FROM \`${tableName}\` WHERE id = ?`, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Record not found'
        });
      }

      res.json({
        success: true,
        data: { id, tableName },
        message: 'Data deleted successfully'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }


  async getAllTables(req, res) {
    try {
      const [rows] = await db.execute(`
        SELECT table_name as tableName 
        FROM information_schema.tables 
        WHERE table_schema = ?
      `, [process.env.DB_NAME]);

      res.json({
        success: true,
        data: rows
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TableController();
