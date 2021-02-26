import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private sqlite: SQLite
  ) { }

    /**
     * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
     */
    public getDB() {
      return this.sqlite.create({
          name: 'reunion.db',
          location: 'default'
      });
    }
  /**
  * Cria a estrutura inicial do banco de dados
  */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
      console.log(db);
      // Criando as tabelas
      this.createTableRoom(db);
      
      return true;
    })
    .catch(e => console.log(e));
    }

      /**
  * Criando a tabela linkHousingDiagnosis no banco de dados
  */
  private createTableRoom(db: SQLiteObject) {
    // Criando a tabela
    return db.executeSql('CREATE TABLE IF NOT EXISTS room (' +
    'id integer primary key AUTOINCREMENT NOT NULL, ' +
    'name TEXT NOT NULL, ' +
    'description TEXT NULL', [])
    .then()
    .catch(e => console.error('Erro ao criar tabela room', e));
    }
}
